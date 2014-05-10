var modCategoryServ = angular.module('CategoryServ', ['ngResource'])
    .factory('Category', ['$resource', "AppConfig",

        function($resource, AppConfig) {
            return $resource(AppConfig.apiPathQuadramma + '/category/:id', {}, {
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