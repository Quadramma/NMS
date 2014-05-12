var $currentCatScope = null;



angular.module('ProjectCtrl', [])

.controller('ProjectController', function(
    $scope, $rootScope, $location, $state,
    Project, Category, RCM, AppConfig, GAFile) {

    $currentCatScope = $scope;
    var picturePlaceHolder = "default/imageplaceholder.jpg";
    $scope.fullpicturePath = AppConfig.apiGAProduccion + "/uploads/projects/";
    $scope.fullslidesPath = AppConfig.apiGAProduccion + "/uploads/projects_slides/";
    Category.query(function(data) {
        $scope.categoriesFiltered = _.filter(data, function(item) {
            return item._category_type_id == "2"; //Projects
        });
    });



    RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: Project, //$resource
        idField: "_id", //campo id del item
        itemFieldName: "item", // propeidad del $scope que contiene el item seleccionado
        itemsFieldName: "items", //propiedad de $scope que contiene la lista de items
        resourceApiIdFieldName: "id", //nombre del campo id del routeo del api(web api, wcf, nodejs, etc)
        createDefaults: { //campos defaults para cuando se crea un item nuevo
        },
        onDeleteSuccess: function(data) {
            $state.go("ga.project.items");
        },
        onDeleteError: function() {
            console.log("ProjectCtrl onDeleteError");
        },
        onSelectHandler: function(item) {
            var slideCuts = $scope.item.slider_urls.toString().split("$$");
            $scope.item.slide1 = slideCuts.length > 0 ? slideCuts[0] : picturePlaceHolder;
            $scope.item.slide2 = slideCuts.length > 1 ? slideCuts[1] : picturePlaceHolder;
            $scope.item.slide3 = slideCuts.length > 1 ? slideCuts[2] : picturePlaceHolder;
        },
        onCreateHandler: function() {
            $scope.item.url = picturePlaceHolder;
            $scope.item.slide1 = picturePlaceHolder;
            $scope.item.slide2 = picturePlaceHolder;
            $scope.item.slide3 = picturePlaceHolder;
        },
        debug: true, //RCM modo verbose, imprime lo que va pasando
        //callQueryAfterMixin: true //llama automaticamente a query y recupera lista de items
    });

    //SAVE OR UPDATE
    $scope.save = function() {
        if ($scope.item._id == null) {
            console.log("ProjectCtrl Save");
            $scope.buildUrl();
            Project.save({}, $scope.item, function(data) {
                $state.go("ga.project.items");
                $scope.query();
            });
        } else {
            console.log("ProjectCtrl Update");
            $scope.buildUrl();
            Project.update({
                id: $scope.item._id
            }, $scope.item, function(data) {
                $state.go("ga.project.items");
                $scope.query();
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
        $('.ga.project.delete.ui.modal')
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

    $scope.buildUrl = function() {
        var urls = "";
        if ($scope.item.slide1 != picturePlaceHolder) {
            urls += $scope.item.slide1;
            if ($scope.item.slide2 != picturePlaceHolder) {
                urls += "$$" + $scope.item.slide2;
                if ($scope.item.slide3 != picturePlaceHolder) {
                    urls += "$$" + $scope.item.slide3;
                }
            }
        }
        $scope.item.slider_urls = urls;
    }
    /*
    ///
    $scope.fileImagen = function($file) {
        console.log("fileImagen!!");

        var fd = new FormData();
        fd.append('file', file);
        GAFile.upload({}, fd, function(data) {
            console.log("FILE RTA");
            console.log(data);
        });

        console.log($file);
    }
    $scope.filesSlider = function($files) {
        console.log("filesSlider!!");
        console.log($files);
    }
*/
    //


    $scope.queryFiles = function() {
        GAFile.getAvailableProjectPictures(function(data) {
            $scope.availablesPictures = data.files;
            $('.ui.dropdown')
                .dropdown()
        });
        GAFile.getAvailableProjectSlides(function(data) {
            $scope.availablesSlides = data.files;
            $('.ui.dropdown')
                .dropdown()
        });
    }

    $scope.categoryClick = function() {
        $scope.item._category_id = $('#categoryDropdown').find("input").val();
    }
    $scope.pictureClick = function() {
        $scope.item.url = $('#pictureDropdown').find("input").val();
    }
    $scope.slide1Click = function() {
        $scope.item.slide1 = $('#slide1Dropdown').find("input").val();
    }
    $scope.slide2Click = function() {
        $scope.item.slide2 = $('#slide2Dropdown').find("input").val();
    }
    $scope.slide3Click = function() {
        $scope.item.slide3 = $('#slide3Dropdown').find("input").val();
    }



});

function ProjectBindFormValidations() {
    var $catScope = $currentCatScope;
    $('.ui.form')
        .form({
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: 'Nombre requerido'
                }]
            },
            description: {
                identifier: 'description',
                rules: [{
                    type: 'empty',
                    prompt: 'Description requerido'
                }]
            },
            category: {
                identifier: 'category',
                rules: [{
                    type: 'empty',
                    prompt: 'Categoria requerido'
                }]
            },
            picture: {
                identifier: 'picture',
                rules: [{
                    type: 'empty',
                    prompt: 'Imagen principal requerida'
                }]
            }
        }, {
            onSuccess: function() {
                $catScope.save();
            },
            onFailure: function() {
                $(".ui.error.message").focus();
            }
        });


}




function ProjectItemsController() {
    $currentCatScope.query();
    $('table').tablesort();
}

function ProjectCreateController() {
    $('.ui.dropdown')
        .dropdown();
    ProjectBindFormValidations();
    $currentCatScope.create();
    $currentCatScope.queryFiles();
}

function ProjectEditController($scope) {

    ProjectBindFormValidations();
    $currentCatScope.queryFiles();

    var dropdownInterval = setInterval(function() {
        if (!_.isUndefined($currentCatScope.item)) {
            $('#slide1Dropdown').find("input").val($currentCatScope.item.slide1);
            $('#slide2Dropdown').find("input").val($currentCatScope.item.slide2);
            $('#slide3Dropdown').find("input").val($currentCatScope.item.slide3);
            $('#categoryDropdown').find("input").val($currentCatScope.item._category_id);
            $('#pictureDropdown').find("input").val($currentCatScope.item.url);
            $('.ui.dropdown')
                .dropdown();
            clearInterval(dropdownInterval);
        }
    }, 200);
}