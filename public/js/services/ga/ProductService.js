var serviceMethods = {
    query: {
        method: "GET",
        isArray: true
    },
    get: {
        method: "GET",
        isArray: true
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

var modProductServ = angular.module('ProductServ', ['ngResource'])
    .factory('Product', ['$resource', "AppConfig",

        function($resource, AppConfig) {
            var actionRes = $resource(AppConfig.apiGAProduccion + '/product/:action', {}, {
                getForCombo: {
                    method: "GET",
                    isArray: false,
                    params: {
                        action: "getForCombo"
                    }
                }
            });

            var res = $resource(AppConfig.apiGAProduccion + '/product/:id', {}, serviceMethods);
            res.getForCombo = actionRes.getForCombo;
            return res;
        }
    ]);