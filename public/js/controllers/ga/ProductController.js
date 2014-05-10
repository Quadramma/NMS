var $currentCatScope = null;

angular.module('ProductCtrl', []).controller('ProductController', function(
    $scope, $rootScope, $location, Product, RCM, AppConfig) {

    $currentCatScope = $scope;

    $scope.uploadsPath = AppConfig.apiGAProduccion + "/routes/uploads";

    RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: Product, //$resource
        idField: "_id", //campo id del item
        itemFieldName: "item", // propeidad del $scope que contiene el item seleccionado
        itemsFieldName: "items", //propiedad de $scope que contiene la lista de items
        resourceApiIdFieldName: "id", //nombre del campo id del routeo del api(web api, wcf, nodejs, etc)
        createDefaults: { //campos defaults para cuando se crea un item nuevo
        },
        onDeleteSuccess: function(data) {
            $scope.items = data.items;
            $scope.changeState("/ga/product/items", 200);
            //console.log("ProductCtrl onDeleteSuccess");
        },
        onDeleteError: function() {
            console.log("ProductCtrl onDeleteError");
        },
        debug: true, //RCM modo verbose, imprime lo que va pasando
        //callQueryAfterMixin: true //llama automaticamente a query y recupera lista de items
    });

    //SAVE OR UPDATE
    $scope.save = function() {
        if ($scope.item._id == null) {
            console.log("ProductCtrl Save");
            Product.save({}, $scope.item, function(data) {
                $scope.items = data.items;
                $scope.changeState("/ga/product/items", 200);
            });
        } else {
            console.log("ProductCtrl Update");
            Product.update({
                id: $scope.item._id
            }, $scope.item, function(data) {
                $scope.items = data.items;
                $scope.changeState("/ga/product/items", 200);
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
        $('.ga.product.delete.ui.modal')
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

function ProductBindFormValidations() {
    var $catScope = $currentCatScope;
    $('.ui.form')
        .form({
            description: {
                identifier: 'code',
                rules: [{
                    type: 'empty',
                    prompt: 'Codigo requerido'
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


function ProductItemsController() {
    $currentCatScope.query();
    setInterval(function() {
        // $currentCatScope.query();
    }, 5000);
}

function ProductCreateController() {
    ProductBindFormValidations();
    $currentCatScope.create();


}

function ProductEditController() {
    ProductBindFormValidations();
}