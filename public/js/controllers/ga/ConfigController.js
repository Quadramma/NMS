function ConfigController() {

}

function ConfigSliderController($scope, $state, GAFile, AppConfig) {

    console.log("ConfigSliderController");

    $scope.fullslidesPath = AppConfig.apiGAProduccion + "/uploads/home_slides/";

    $scope.slide1Click = function() {
        $scope.slide1 = $('#slide1Dropdown').find("input").val();
    }
    $scope.slide2Click = function() {
        $scope.slide2 = $('#slide2Dropdown').find("input").val();
    }
    $scope.slide3Click = function() {
        $scope.slide3 = $('#slide3Dropdown').find("input").val();
    }

    GAFile.getHomeSlides({}, {
        slide1: $scope.slide1 || "",
        slide2: $scope.slide2 || "",
        slide3: $scope.slide3 || ""
    }, function(data) {
        $scope.slide1 = data.files.slide1;
        $scope.slide2 = data.files.slide2;
        $scope.slide3 = data.files.slide3;
        $('#slide1Dropdown').find("input").val($scope.slide1);
        $('#slide2Dropdown').find("input").val($scope.slide2);
        $('#slide3Dropdown').find("input").val($scope.slide3);
    });

    GAFile.getAvailableHomeSlides(function(data) {

        console.log("ConfigSliderController.getAvailableHomeSlides");

        $scope.availablesSlides = data.files;

        setTimeout(function() {
            $scope.$apply(function(scope) {
                setTimeout(function() {
                    $('.ui.dropdown')
                        .dropdown();
                }, 1000)
            }, 1000)

        });

    });

    $scope.save = function() {
        console.log("ConfigSliderController.save");
        GAFile.saveHomeSlides({}, {
            slide1: $scope.slide1 || "",
            slide2: $scope.slide2 || "",
            slide3: $scope.slide3 || ""
        }, function(data) {

            console.log("ConfigSliderController.save.success");

            //SUCCESS
            $('.ui.error.message').fadeIn();
            $('.ui.form')
                .form("add errors", ["Cambios guardados"]);
            setTimeout(function() {
                $('.ui.error.message').fadeOut();
            }, 2000);

        });
    }



}




function ConfigDestacadosController($scope, GAFile, AppConfig, Product) {

    console.log("ConfigDestacadosController");

    $scope.fulldestacadosPath = AppConfig.apiGAProduccion + "/uploads/products/";

    $scope.getById = function($_id) {
        var rta = _.find($scope.items, function(item) {
            return item._id.toString() == $_id.toString();
        });
        console.log(rta);
        return rta;
    }

    $scope.destacado1Click = function() {
        var rta = $scope.getById($('#destacado1Dropdown').find("input").val());
        $scope.destacado1 = rta.url;
        $scope.item1id = rta._id;
    }
    $scope.destacado2Click = function() {
        var rta = $scope.getById($('#destacado2Dropdown').find("input").val());
        $scope.destacado2 = rta.url;
        $scope.item2id = rta._id;
    }
    $scope.destacado3Click = function() {
        var rta = $scope.getById($('#destacado3Dropdown').find("input").val());
        $scope.destacado3 = rta.url;
        $scope.item3id = rta._id;
    }


    //1. items
    Product.getForCombo(function(data) {

        console.log("ConfigDestacadosController.getForCombo");

        $scope.items = data.items;

        //2. destacados
        GAFile.getDestacados({}, {
            destacado1: $scope.destacado1 || "",
            destacado2: $scope.destacado2 || "",
            destacado3: $scope.destacado3 || ""
        }, function(data) {
            if (_.isNull(data.files)) return;
            $scope.destacado1 = ($scope.getById(data.files.destacado1)).url;
            $scope.destacado2 = ($scope.getById(data.files.destacado2)).url;
            $scope.destacado3 = ($scope.getById(data.files.destacado3)).url;

            $('#destacado1Dropdown').find("input").val(data.files.destacado1);
            $('#destacado2Dropdown').find("input").val(data.files.destacado2);
            $('#destacado3Dropdown').find("input").val(data.files.destacado3);
            $scope.item1id = data.files.destacado1;
            $scope.item2id = data.files.destacado2;
            $scope.item3id = data.files.destacado3;
        });



        setTimeout(function() {
            $scope.$apply(function(scope) {
                setTimeout(function() {
                    $('.ui.dropdown')
                        .dropdown();
                }, 1000)
            }, 1000)

        });

    });

    $scope.save = function() {
        console.log("ConfigDestacadosController.save");
        GAFile.saveDestacados({}, {
            destacado1: $scope.item1id || "",
            destacado2: $scope.item2id || "",
            destacado3: $scope.item3id || ""
        }, function(data) {

            console.log("ConfigDestacadosController.save.success");

            //SUCCESS
            $('.ui.error.message').fadeIn();
            $('.ui.form')
                .form("add errors", ["Cambios guardados"]);
            setTimeout(function() {
                $('.ui.error.message').fadeOut();
            }, 2000);

        });
    }



}