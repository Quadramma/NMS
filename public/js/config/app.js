var NMSApp = angular.module("NMSApp", [
  //COMMON
  "appRoutes",
  //CLARITY
  "TemaService",
  "HomeCtrl",
  "TemaCtrl",
  "CrmCtrl"
]);

NMSApp.config(['$httpProvider', '$sceDelegateProvider',
  function($httpProvider, $sceDelegateProvider) {
    $httpProvider.defaults.useXDomain = true;
    $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?yourdomain.com/]);
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

NMSApp.config(function ($httpProvider) {
  $httpProvider.defaults.transformRequest = function(data) {
    if (data === undefined)
      return data;

  console.log(data);
   return data;
  }
  $httpProvider.defaults.headers.post['Content-Type'] = undefined;
});


var AppConfigService = angular.module('AppConfigService', [])
.factory('AppConfig', [function () {
    return {
      apiClarityPathVS : "http://localhost:9000/api/",
      apiLocalhost1336 : "http://localhost:1336/api/",
      apiLocalhostIIS  : "http://localhost/WebApi/api/"
    }
}]);