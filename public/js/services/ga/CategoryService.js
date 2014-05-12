var serviceMethods = {
    query: {
        method: "GET",
        isArray: true
    },
    get: {
        method: "GET",
        isArray: false
    },
    save: {
        method: 'POST',
        isArray: false
    },
    update: {
        method: 'POST',
        isArray: false
    },
    delete: {
        method: "DELETE",
        isArray: false
    }
};

var modCategoryServ = angular.module('CategoryServ', ['ngResource'])
    .factory('Category', ['$resource', "AppConfig",
        function($resource, AppConfig) {
            return $resource(AppConfig.apiGAProduccion + '/category/:id', {}, serviceMethods);
        }
    ]);

var modPrjCategoryServ = angular.module('PrjCategoryServ', ['ngResource'])
    .factory('PrjCategory', ['$resource', "AppConfig",
        function($resource, AppConfig) {
            return $resource(AppConfig.apiGAProduccion + '/prjcategory/:id', {}, serviceMethods);
        }
    ]);