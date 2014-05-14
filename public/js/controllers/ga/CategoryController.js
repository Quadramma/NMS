CategoryDefinitions = {
    BindFormValidations: function() {
        console.log("BindFormValidations: this is empty, are you sure ?");
    }
}

var $currentCatScope = null;
var _moduleName = "CategoryCtrl";
var _controllerName = "CategoryController";
var _modelTableIdFieldName = "_id";
var _scopeItemFieldName = "item";
var _scopeItemsFieldName = "items";
var _resourceApiIdFieldName = "id";
//delete,update,save returns -> {ok,dbResult}
//query, get retuns [] of items

angular.module(_moduleName, []).controller(_controllerName, function(
    $scope, $rootScope, $location, Category, RCM, $state) {
    $currentCatScope = $scope;

    var stateParams = $state.params;
    console.log(stateParams);

    //defaults
    $scope.stateRedirectAfterSaveRoute = "ga.category.items";
    $scope.stateRedirectAfterDeleteRoute = "ga.category.items";
    $scope.defaultFields = {
        _category_type_id: 1
    }

    RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: Category, //$resource
        idField: _modelTableIdFieldName, //campo id del item
        itemFieldName: _scopeItemFieldName, // propeidad del $scope que contiene el item seleccionado
        itemsFieldName: _scopeItemsFieldName, //propiedad de $scope que contiene la lista de items
        resourceApiIdFieldName: _resourceApiIdFieldName, //nombre del campo id del routeo del api(web api, wcf, nodejs, etc)
        createDefaults: $scope.defaultFields,
        onQuerySuccess: function(data) {
            $scope.items = _.filter(data, function(item) {
                return item._category_type_id == stateParams.type; //Projects
            });
        },
        onDeleteSuccess: function(data) {
            $state.go($scope.stateRedirectAfterDeleteRoute);
        },
        onDeleteError: function() {
            console.log("CategoryCtrl onDeleteError");
        },
        debug: true, //RCM modo verbose, imprime lo que va pasando
        //callQueryAfterMixin: true //llama automaticamente a query y recupera lista de items
    });

    $scope.precreate = function(defaultFields) {
        RCM.setDefaultFields(defaultFields || $scope.defaultFields);
        $scope.create();
    };

    //SAVE OR UPDATE
    $scope.save = function() {
        if ($scope.item._id == null) {
            console.log("CategoryCtrl Save");
            Category.save({}, $scope.item, function(data) {
                $state.go($scope.stateRedirectAfterSaveRoute);
            });
        } else {
            console.log("CategoryCtrl Update");
            Category.update({
                id: $scope.item._id
            }, $scope.item, function(data) {
                $state.go($scope.stateRedirectAfterSaveRoute);
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
    $scope.validateAndSave = function(settings) {
        if (!_.isUndefined(settings)) {
            $scope.stateRedirectAfterSaveRoute =
                settings["stateRedirectAfterSaveRoute"] || "ga.category.items";
        }
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

    CategoryDefinitions.BindFormValidations = function(onSuccess, onFailure) {
        var $catScope = $currentCatScope;
        $('.ui.form')
            .form({
                description: {
                    identifier: 'description',
                    rules: [{
                        type: 'empty',
                        prompt: 'Descripción requerida'
                    }]
                }
            }, {
                onSuccess: onSuccess,
                onFailure: onFailure
            });
    }
});


function CategoryItemsController() {
    $currentCatScope.query();
    $('table').tablesort();
}

function CategoryCreateController() {
    CategoryDefinitions.BindFormValidations(function() {
        $currentCatScope.save();
    });
    $currentCatScope.precreate({
        _category_type_id: 1
    });
}

function CategoryEditController() {
    $currentCatScope.stateRedirectAfterSaveRoute = "ga.category.items";
    CategoryDefinitions.BindFormValidations(function() {
        $currentCatScope.save();
    });
}

function PrjCategoryCreateController() {
    $currentCatScope.stateRedirectAfterSaveRoute = "ga.prjcategory.items";
    $currentCatScope.stateRedirectAfterDeleteRoute = "ga.prjcategory.items";
    CategoryDefinitions.BindFormValidations(function() {
        $currentCatScope.save();
    });
    $currentCatScope.precreate({
        _category_type_id: 2
    });
}

function PrjCategoryEditController() {
    $currentCatScope.stateRedirectAfterSaveRoute = "ga.prjcategory.items";
    $currentCatScope.stateRedirectAfterDeleteRoute = "ga.prjcategory.items";
    CategoryDefinitions.BindFormValidations(function() {
        $currentCatScope.save();
    });
}