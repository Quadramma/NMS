//REWORK---------------------------------------------------------********************************
var node = "Contacto";
var info = function(msg) {
    console.info("[" + node + "][" + msg + "]");
};

function ContactoItemsController($scope, $rootScope, RCM, CRM, CTS, $timeout) {
    info("ContactoItemsController");
    CRM.Contacto.query({
        pageNumber: 1,
        itemsPerPage: 100,
        empresaID: -1,
        Codigo: "",
        RazonSocial: ""
    }, function(page) {
        _.each(page.Items, function(item) {
            var milli = moment(new Date(item.Comienzo).getTime());
            var formated = milli.format("DD/MM/YYYY");
            item.FechaAgenda = formated;
            item.SubEstadoContactoDescripcion = item.SubEstadoContactoDescripcion || "Ninguno";
        });
        $scope.items = page.Items;
    });
}

function ContactoCreateController($scope, $state, $rootScope, RCM, CRM, CTS, $timeout) {
    $scope.save = function() {};
    FormValidationDefinition($scope.save, null);
    info("ContactoCreateController");
    console.log($state.params);
    $scope.item = new CRM.Contacto();
}

function ContactoEditController($scope, $state, $rootScope, RCM, CRM, CTS, $timeout) {
    FormValidationDefinition($scope.save, null);
    info("ContactoEditController");
    //console.log("Params");
    //console.log($state.params);
    //-----------------------------
    //Scope Private
    //--Initialize y  onChange bind -> RECUPERA LOS DATOS SI SE MODIFICO ALGUN VALOR DE SELECT
    function bindTemaDropdown() {
        $('.tema.dropdown')
            .dropdown({
                onChange: function(val) {
                    $scope.item.TemaID = $("#temaDropdown input").val();
                    info("tema onchange -> " + $scope.item.TemaID);
                }
            })
    }

    function bindEstadoContactoDropdown() {
        $('.estadocontacto.dropdown')
            .dropdown({
                onChange: function(val) {
                    $scope.item.EstadoContatoID = $("#estadoContactoDropdown input").val();
                    info("estadocontacto onchange -> " + $scope.item.TemaID);
                }
            })
    }

    function bindFechaAgenda(date) {
        var milli = moment(new Date(date).getTime());
        info(milli);
        var formated = milli.format("DD/MM/YYYY");
        info(formated);

        $.fn.datetimepicker.defaults = {
            pickDate: true, //en/disables the date picker
            pickTime: false, //en/disables the time picker
            useMinutes: false, //en/disables the minutes picker
            useSeconds: false, //en/disables the seconds picker
            useCurrent: true, //when true, picker will set the value to the current date/time     
            showToday: true, //shows the today indicator
            language: 'es', //sets language locale
        };

        var dtp = $('#fechaAgenda').datetimepicker();
        $('#fechaAgenda').data("DateTimePicker").setDate(formated);



    }



    //AVALIABLE DATA
    CRM.Tema.query({
        pageNumber: 1,
        itemsPerPage: 1000,
    }, function(page) {
        $scope.temas = page.Items;
        $timeout(function() {
            bindTemaDropdown();
        }, 1000)
    });
    CRM.EstadoContacto.query({
        pageNumber: 1,
        itemsPerPage: 1000,
    }, function(page) {
        $scope.estados = page.Items;
        $timeout(function() {
            bindEstadoContactoDropdown();
        }, 1000)
    });
    //-----------------------------
    $scope.onItemLoad = function(item) {
        $("#temaDropdown input").val(item.TemaID); //cbo tema
        $("#estadoContactoDropdown input").val(item.EstadoContactoID); //cbo estado contacto
        bindFechaAgenda(item.Comienzo);
        console.log(item);
        info("onItemLoad");
    }

    //-----------------------------
    //ITEM
    CRM.Contacto.get({
        id: $state.params.id
    }, function(data) {
        $scope.item = data[0];
        $scope.onItemLoad($scope.item);
    });
    //-----------------------------
    $scope.save = function() {
        $('.ui.form').form('validate form');
        info("save");
    }
    $scope.delete = function() {
        info("delete");
    }
}


//VALIDACIONES
function FormValidationDefinition(onSuccess, onFailure) {
    $('.ui.form')
        .form({
            asunto: {
                identifier: 'asunto',
                rules: [{
                    type: 'empty',
                    prompt: 'Asunto requerido'
                }]
            },
            proximaccion: {
                identifier: 'proximaccion',
                rules: [{
                    type: 'empty',
                    prompt: 'Proxima Accion requerida'
                }]
            },
            estadoContactoDropdown: {
                identifier: 'estadoContactoDropdown',
                rules: [{
                    type: 'empty',
                    prompt: 'Estado de contacto requerido'
                }]
            },
            fechaAgenda: {
                identifier: 'fechaAgenda',
                rules: [{
                    type: 'empty',
                    prompt: 'Fecha Agenda requerida'
                }]
            }
        }, {
            onSuccess: onSuccess,
            onFailure: onFailure
        });
}

 /*
    QUERY RESPONSE FORMAT>
    PETA POCO PAGE FETECHED
    Page = {
        "CurrentPage": 1,
        "TotalPages": 960,
        "TotalItems": 95903,
        "ItemsPerPage": 100,
        "Items"
    }
*/