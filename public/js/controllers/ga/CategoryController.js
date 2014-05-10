var $currentCatScope = null;

angular.module('CategoryCtrl', []).controller('CategoryController', function(
    $scope, $rootScope, $location, Category, RCM) {
    $currentCatScope = $scope;
    RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: Category, //$resource
        idField: "_id", //campo id del item
        itemFieldName: "item", // propeidad del $scope que contiene el item seleccionado
        itemsFieldName: "items", //propiedad de $scope que contiene la lista de items
        resourceApiIdFieldName: "id", //nombre del campo id del routeo del api(web api, wcf, nodejs, etc)
        createDefaults: { //campos defaults para cuando se crea un item nuevo
        },
        onDeleteSuccess: function(data) {
            $scope.items = data.items;
            $scope.changeState("/ga/category/items", 200);
            //console.log("CategoryCtrl onDeleteSuccess");
        },
        onDeleteError: function() {
            console.log("CategoryCtrl onDeleteError");
        },
        debug: true, //RCM modo verbose, imprime lo que va pasando
        //callQueryAfterMixin: true //llama automaticamente a query y recupera lista de items
    });

    //SAVE OR UPDATE
    $scope.save = function() {
        if ($scope.item._id == null) {
            console.log("CategoryCtrl Save");
            Category.save({}, $scope.item, function(data) {
                $scope.items = data.items;
                $scope.changeState("/ga/category/items", 200);
            });
        } else {
            console.log("CategoryCtrl Update");
            Category.update({
                id: $scope.item._id
            }, $scope.item, function(data) {
                $scope.items = data.items;
                $scope.changeState("/ga/category/items", 200);
            });
        }
    }

    $scope.changeState = function(path, time) {
        setTimeout(function() {
            $scope.$apply(function() {
                $location.path(path);
            });
        }, time);
    }
    $scope.trysave = function() {
        $('.ui.form').form('validate form');
    }
    $scope.trydelete = function() {
        console.log("trydelete");
        $('.ga.category.delete.ui.modal')
            .modal('setting', {
                closable: false,
                onDeny: function() {
                    //return false;
                },
                onApprove: function() {
                    $currentCatScope.delete(); //deletes current
                }
            })
            .modal('show');
    }
});

function CategoryBindFormValidations() {
    var $catScope = $currentCatScope;
    $('.ui.form')
        .form({
            description: {
                identifier: 'description',
                rules: [{
                    type: 'empty',
                    prompt: 'Por favor complete la descripción'
                }]
            }
        }, {
            onSuccess: function() {
                $catScope.save();
            },
            onFailure: function() {
                //console.log("fail");
            }
        });
}


function CategoryItemsController() {
    $currentCatScope.query();
    setInterval(function() {
        // $currentCatScope.query();
    }, 5000);
}

function CategoryCreateController() {
    CategoryBindFormValidations();
    $currentCatScope.create();


}

function CategoryEditController() {
    CategoryBindFormValidations();
}