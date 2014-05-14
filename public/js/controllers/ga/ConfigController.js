function GaUploadsController($scope, AppConfig) {
    console.log("GaUploadsController");
    $scope.file = null;


    //Ajax para enviar formdata
    function send(type, formData, callback) {
        $.ajax(AppConfig.apiGAProduccion + '/upload/' + type, {
            type: "POST",
            dataType: "json",
            contentType: false,
            processData: false,
            data: formData
        }).always(function(arg1, arg2, arg3) {
            callback(arg1)
        }).error(function(jqXHR, status, error) {
            log("Ajax Status -> " + (status));
            log("Ajax Error -> " + (error));
        });
    }



    $scope.tryupload = function() {
        $('.ui.form').form('validate form');
    }
    $scope.upload = function() {
        console.log("GaUploadsController.upload");
        if ($scope.file == null) {
            //console.log("GaUploadsController.upload file empty nothing happens");
            $scope.message("Warning: No se detecto ninguna imagen para subir",3000);
        } else {
            var fd = new FormData();
            fd.append("file", $scope.file);
            var resFunction = $("#destinoDropdown").find("input").val();

            send(resFunction, fd, function(res) {
                console.log("GaUploadsController upload response");
                console.log(res);
                if(res.ok){
                    $scope.message("Imagen "+res.fileName+" cargada.",2000);
                }else{
                    $scope.message("Error: "+res.saveResponse.error,10000);
                }
            })

        }
    }

    //HTML FILE DROP 
    var holder = document.getElementById('holder'),
        state = document.getElementById('status');

    if (typeof window.FileReader === 'undefined') {
        state.className = 'fail';
    } else {
        state.className = 'success';
        state.innerHTML = '';
    }

    holder.ondragover = function() {
        this.className = 'hover';
        return false;
    };
    holder.ondragend = function() {
        this.className = '';
        return false;
    };
    holder.ondrop = function(e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
            reader = new FileReader();
        reader.onload = function(event) {
            console.log(event.target);
            holder.style.background = 'url(' + event.target.result + ') no-repeat center';
        };
        console.log(file);
        reader.readAsDataURL(file);
        $scope.file = file;
        return false;
    };

    //SEMANTIC INIT
    $('.ui.form')
        .form({
            destino: {
                identifier: 'destino',
                rules: [{
                    type: 'empty',
                    prompt: 'Destino requerido'
                }]
            }
        }, {
            onSuccess: function() {
                $scope.upload();
            },
            onFailure: function() {
                $(".ui.error.message").focus();
            }
        });
    $('.ui.dropdown')
        .dropdown();

    //message
    $scope.message = function(msg, time) {
        $('.ui.error.message').fadeIn();
        $('.ui.form')
            .form("add errors", [msg]);
        setTimeout(function() {
            $('.ui.error.message').fadeOut();
        }, time);
    }

}


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