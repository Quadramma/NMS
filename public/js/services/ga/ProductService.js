var modProductServ = angular.module('ProductServ', ['ngResource'])
    .factory('Product', ['$resource', "AppConfig",

        function($resource, AppConfig) {
            return $resource(AppConfig.apiPathQuadramma + '/product/:id', {}, {
                save: {
                    method: 'POST',
                    isArray: false
                },
                update: {
                    method: 'PUT',
                    isArray: false
                },
                delete: {
                    method: "DELETE",
                    isArray: true //RETURN ALL LIKE GET
                }
            });
        }
    ]);