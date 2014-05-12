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

var modProjectServ = angular.module('ProjectServ', ['ngResource'])
    .factory('Project', ['$resource', "AppConfig",

        function($resource, AppConfig) {
            return $resource(AppConfig.apiGAProduccion + '/project/:id', {}, serviceMethods);
        }
    ]);