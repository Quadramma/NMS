angular.module('TemaCtrl', []).controller('TemaController', function(
    $scope, $rootScope, Tema, RCM) {
    RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: Tema, //$resource
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



/*


        //ALL
        $('.ui.sidebar')
            .sidebar("setting", {
                overlay: true,
                exclusive: true,
                //debug: true,
                //verbose: true
            });


//LEFT BIND BTN
        $('.nms.left.ui.sidebar')
            .sidebar('attach events', '.nms.btn-node-sidebar.toggle.button')
            .sidebar("onChange", function() {
                console.log("onChange");
            });
        $(".nms.page").on("click", function(evt) {
            var btnIgnoreId = $('.nms.btn-node-sidebar.toggle.button').first().attr("id");
            if (evt.target.id == btnIgnoreId) {} else {
                $('.nms.left.ui.sidebar')
                    .sidebar("hide");

            }
        });

*/