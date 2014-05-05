var module1 = angular.module('TemaService', ['ngResource'])
.factory('Tema', ['$resource', function ($resource) {
    return $resource('http://localhost:3000/api/tema/:id'
    	, {}
    	, {
        update: { method: 'PUT'},
        delete: { method: 'DELETE', isArray: true},
    });
}]);