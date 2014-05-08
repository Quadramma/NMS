var module1 = angular.module('TemaService', ['ngResource','AppConfigService'])
.factory('Tema', ['$resource','AppConfig', function ($resource,AppConfig) {
    	return $resource(AppConfig.apiClarityPathVS + 'tema/:id'
    	, {}
    	, {
        update: { method: 'PUT'},
        //query: { method: 'GET', isArray: false},
        delete: { method: 'DELETE', isArray: true},
    });
}]);