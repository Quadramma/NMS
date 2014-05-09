angular.module('CrmCtrl', []).controller('CrmController', function(
	$scope, $rootScope,Contacto,RCM) {

 RCM.mixin({ //INJECT METHODS: CREATE, SELECT, QUERY, DELETE
        $ctrlScope: $scope, //$scope
        $res: Contacto, //$resource
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
        debug: true, //RCM modo verbose, imprime lo que va pasando
        callQueryAfterMixin: true //llama automaticamente a query y recupera lista de items
    });

    //SAVE OR UPDATE
    $scope.save = function() {
        if ($scope.item.TemaID == null) {
            console.log("CrmCtrl Save");
            Contacto.save({}, {
                Descripcion: $scope.item.Descripcion,
                EsFijo: 1,
                GrupoID: 1
            }, function(data) {
                $scope.items = data.items;
            });
        } else {
            console.log("CrmCtrl Update");
            Contacto.update({
                id: $scope.item.TemaID
            }, $scope.item, function(data) {
                $scope.items = data.items;
            });
        }
    }

});



var ContactoService = angular.module('ContactoService', ['ngResource', 'AppConfigService'])
	.factory('Contacto', ['$resource', 'AppConfig',
		function($resource, AppConfig) {
			return $resource(AppConfig.apiClarityPathVS + 'contacto/:id', {}, {
				query: {
					method: "GET",
					isArray: true
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