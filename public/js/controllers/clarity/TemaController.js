/*
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
*/

angular.module('TemaNode', [
    "TemaItemsModule",
    "TemaEditModule",
    "TemaCreateModule",
    "TemaService",
    "TemaHelperModule"
]);

angular.module('TemaItemsModule', []).
controller('TemaItemsController', function($scope, $rootScope, Tema, $timeout) {
    console.info("[TemaItemsController]");
    Tema.query({
        pageNumber: 1,
        itemsPerPage: 100
    }, function(res) { //res -> data (page)
        $scope.items = res.data.Items;
    });
});


angular.module('TemaCreateModule', ["TemaService"]).
controller('TemaCreateController', function($scope, $state, $rootScope, Tema, TemaHelper, $timeout) {
    console.info("[TemaCreateController]");
    $scope.trysave = function() {
        console.info("[TemaCreateController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {
        console.info("[TemaCreateController][" + "validaciones ok" + "]");

        //CABLEADO: POR AHORA
        $scope.item.GrupoID = 1;

        Tema.save({}, $scope.item, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaCreateController][" + "save success" + "]");
        }, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaCreateController][" + "save failure" + "]");
        });

    }
    //
    TemaHelper.FormValidationDefinition($scope.save, null);
});

angular.module('TemaEditModule', ["TemaService"]).
controller('TemaEditController', function($scope, $state, $rootScope, Tema, TemaHelper, $timeout) {
    console.info("[TemaEditController]");
    $scope.trysave = function() {
        console.info("[TemaEditController][" + "trysave" + "]");
        $('.ui.form').form('validate form');
    }
    $scope.save = function() {
        console.info("[TemaEditController][" + "validaciones ok" + "]");
        Tema.save({}, $scope.item, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaEditController][" + "save success" + "]");
        }, function(data) {
            $state.go("clarity.tema.list");
            console.info("[TemaEditController][" + "save failure" + "]");
        });
    }
    $scope.delete = function() {
        console.info("[TemaEditController][" + "delete?" + "]");
        if (confirm("Borrar?")) {
            Tema.delete({
                id: $scope.item.TemaID
            }, {}, function() {
                console.info("[TemaEditController][" + "delete success" + "]");
                $state.go("clarity.tema.list");
            }, function() {
                console.info("[TemaEditController][" + "delete failure" + "]");
                $state.go("clarity.tema.list");
            });
        }
    }
    //
    TemaHelper.FormValidationDefinition($scope.save, null);
    Tema.get({
        id: $state.params.id
    }, function(res) {
        console.log(res);
        $scope.item = res.data;
    });
});

angular.module("TemaHelperModule", []).factory("TemaHelper", [

    function() {
        return {
            FormValidationDefinition: function(onSuccess, onFailure) {
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
        }
    }
]);

angular.module('TemaService', ['ngResource']).
factory('Tema', ['$resource', 'AppConfig',
    function($resource, AppConfig) {
        return $resource(AppConfig.apiClarity + 'tema/:id', {}, {
            query: {
                method: "GET",
                isArray: false
            },
            get: {
                method: "GET",
                isArray: false
            },
            update: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            delete: {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            save: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });
    }
]);


/*
//REWORK---------------------------------------------------------********************************
var Tema = new(function() {
    var node = "Tema";
    var info = function(msg) {
        console.info("[" + node + "][" + msg + "]");
    };

    this.ItemsController = function($scope, $rootScope, Tema, RCM, CRM, CTS, $timeout) {
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
            Tema.update({}, function() {
                info("save success");
            }, function() {
                info("save failure");
            });
    
        }
       
       
       
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