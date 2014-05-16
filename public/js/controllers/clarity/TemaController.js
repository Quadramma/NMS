angular.module('TemaCtrl', []).controller('TemaController', function(
    $scope, $rootScope, CRM, RCM) {
    RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: CRM.Tema, //$resource
        idField: "TemaID", //campo id del item
        itemFieldName: "item", // propeidad del $scope que contiene el item seleccionado
        itemsFieldName: "items", //propiedad de $scope que contiene la lista de items
        resourceApiIdFieldName: "id", //nombre del campo id del routeo del api(web api, wcf, nodejs, etc)
        createDefaults: { //campos defaults para cuando se crea un item nuevo
            EsFijo: 1,
            GrupoID: 1
        },
        onDeleteSuccess: function(data) {
            $scope.items = data.items;
            console.log("TemaCtrl onDeleteSuccess");
        },
        onDeleteError: function() {
            console.log("TemaCtrl Delete Error");
        },
        debug: true, //RCM modo verbose, imprime lo que va pasando
        callQueryAfterMixin: true //llama automaticamente a query y recupera lista de items
    });

    //SAVE OR UPDATE
    $scope.save = function() {
        if ($scope.item.TemaID == null) {
            console.log("TemaCtrl Save");
            Tema.save({}, {
                Descripcion: $scope.item.Descripcion,
                EsFijo: 1,
                GrupoID: 1
            }, function(data) {
                $scope.items = data.items;
            });
        } else {
            console.log("TemaCtrl Update");
            Tema.update({
                id: $scope.item.TemaID
            }, $scope.item, function(data) {
                $scope.items = data.items;
            });
        }
    }


});


//REWORK---------------------------------------------------------********************************
var Tema = new(function() {
    var node = "Tema";
    var info = function(msg) {
        console.info("[" + node + "][" + msg + "]");
    };

    this.ItemsController = function($scope, $rootScope, RCM, CRM, CTS, $timeout) {
        info("TemaItemsController");
        CRM.Tema.query({
            pageNumber: 1,
            itemsPerPage: 100
        }, function(page) {
            $scope.items = page.Items;
        });
    }

    this.CreateController = function($scope, $state, $rootScope, RCM, CRM, CTS, $timeout) {
        info("CreateController");
        $scope.trysave = function() {
            $('.ui.form').form('validate form');
            info("trysave");
        }
        $scope.save = function() {
            info("validaciones ok");
            CRM.Tema.save({}, $scope.item, function() {
                $state.go("clarity.tema.list"); //SUCCESS
                info("save success");
            }, function() {
                $state.go("clarity.tema.list"); //ERROR
                info("save failure");
            });
        }
        FormValidationDefinition($scope.save, null);
    }

    this.EditController = function($scope, $state, $rootScope, RCM, CRM, CTS, $timeout) {
        info("EditController");
        $scope.trysave = function() {
            info("trysave");
            $('.ui.form').form('validate form');
        }
        $scope.save = function() {
            info("validaciones ok");
            CRM.Tema.update({
                id: $scope.item.TemaID
            }, $scope.item, function() {
                //$state.go("clarity.tema.list"); //SUCCESS
                info("save success");
            }, function() {
                //$state.go("clarity.tema.list"); //ERROR
                info("save failure");
            });
        }
        /*
        $scope.delete = function() {
            CRM.Tema.delete({
                id: $scope.item.TemaID
            }, $scope.item, function() {
                $state.go("clarity.tema.list"); //SUCCESS
                info("delete success");
            }, function() {
                $state.go("clarity.tema.list"); //ERROR
                info("delete failure");
            });
        }
        */
        FormValidationDefinition($scope.save, null);
        //ITEM
        CRM.Tema.get({
            id: $state.params.id
        }, function(data) {
            $scope.item = data[0];
        });
    }

    //VALIDACIONES
    function FormValidationDefinition(onSuccess, onFailure) {
        $('.ui.form')
            .form({
                asunto: {
                    description: 'description',
                    rules: [{
                        type: 'empty',
                        prompt: 'Desripcion requerida'
                    }]
                }
            }, {
                onSuccess: onSuccess,
                onFailure: onFailure
            });
    }


})();