angular.module('CrmCtrl', []).controller('CrmController', function(
    $scope, $rootScope, RCM, CRM, CTS, $timeout) {

    var name = "[CrmController]";

    function info(msg) {
        console.info(name + "[" + msg + "]");
    }

    RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: CRM.Contacto, //$resource
        idField: "ContactoID", //campo id del item
        itemFieldName: "item", // propeidad del $scope que contiene el item seleccionado
        itemsFieldName: "items", //propiedad de $scope que contiene la lista de items
        resourceApiIdFieldName: "id", //nombre del campo id del routeo del api(web api, wcf, nodejs, etc)
        createDefaults: { //campos defaults para cuando se crea un item nuevo
            EsFijo: 1,
            GrupoID: 1
        },
        onDeleteSuccess: function(data) {
            $scope.items = data.items;
            console.log("CrmCtrl onDeleteSuccess");
        },
        onDeleteError: function() {
            console.log("CrmCtrl Delete Error");
        },
        onSelectHandler: function(item) {
            console.log(item);
        },
        debug: true, //RCM modo verbose, imprime lo que va pasando
        callQueryAfterMixin: false //llama automaticamente a query y recupera lista de items
    });

    //SAVE OR UPDATE
    $scope.save = function() {
        if ($scope.item.TemaID == null) {
            console.log("CrmCtrl Save");
            CRM.Contacto.save({}, {
                Descripcion: $scope.item.Descripcion,
                EsFijo: 1,
                GrupoID: 1
            }, function(data) {
                $scope.items = data.items;
            });
        } else {
            console.log("CrmCtrl Update");
            CRM.Contacto.update({
                id: $scope.item.TemaID
            }, $scope.item, function(data) {
                $scope.items = data.items;
            });
        }
    }


   

    //NODO: CRM

    //FILTROS
    $scope.filtro = {};
    $scope.filtro.empresaID = -1;
    $scope.filtro.Codigo = "";
    $scope.filtro.RazonSocial = "";


    //LISTVIEW REFRESH
    $scope.refresh = function() {
        //FILTROS
        //$scope.empresaID
        info("filtro empresaID " + $scope.filtro.empresaID);
        //REFRESH
        lvwContacto.refresh($scope.filtro.empresaID);
        info("refresh");
    }


    //NODO EVENTS
    $scope.onFiltroChange = function() {
        // console.log($scope.empresaID);
    }

    //ON STATE ENTER

    //SELECTKEY EMPRESA
    CTS.Empresa.query({
        pageNumber: 1,
        itemsPerPage: 100
    }, function(page) {
        $scope.empresas = page.Items;
        $timeout(function() {

            /*
            $('.empresa.dropdown.ui.dropdown')
                .dropdown({
                    onChange: function(val) {
                        //$scope.empresaID = val;
                        //$scope.onFiltroChange();
                    }
                })
        */

        }, 500);
    });


    //LISTVIEW Contacto
    var lvwContacto = {};
    lvwContacto.refresh = function(empID, codigo, razonSocial) {
        CRM.Contacto.query({
            pageNumber: 1,
            itemsPerPage: 100,
            empresaID: empID,
            Codigo: codigo,
            RazonSocial: razonSocial
        }, function(page) {
            $scope.items = page.Items;
        });
        info("lvwContacto.refresh");
    }
    lvwContacto.refresh(
        $scope.filtro.empresaID, $scope.filtro.Codigo, $scope.filtro.RazonSocial
    );

    /*
    CRM.EstadoContacto.query({}, function(data) {
        console.log("CRM.Contacto.EstadoContacto");
        console.log(data);
    });
*/


    _nms.page.on("enterPress", function(args) {
        $scope.refresh();
    });

    /*
    $("#selectkeyModal")
        .modal();
        
    $scope.showSlk = function() {
        $("#selectkeyModal")
            .modal("show");

        sharedScopes.SelectKeyScope.items = $scope.empresas;
    }
    */


});