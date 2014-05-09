var NMSApp = angular.module("NMSApp", [
  //COMMON
  "appRoutes",

  //NMS
  "ResourceControllerMixinService",

  //CLARITY
  "HomeCtrl",

  //CRM
  "CrmCtrl",
  "ContactoService",
  //-TEMA
  "TemaCtrl",
  "TemaService",
]);

NMSApp.config(['$httpProvider', '$sceDelegateProvider',
  function($httpProvider, $sceDelegateProvider) {
    $httpProvider.defaults.useXDomain = true;
    $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?yourdomain.com/]);
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }
]);

NMSApp.config(function($httpProvider) {
  $httpProvider.defaults.transformRequest = function(data) {
    if (data === undefined)
      return data;

    return $.param(data); //urlencoded
    /*
    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
    }
    return form_data;
    */
  }
  $httpProvider.defaults.headers.post['Content-Type'] = undefined;
});


var AppConfigService = angular.module('AppConfigService', [])
  .factory('AppConfig', [

    function() {
      return {
        apiClarityPathVS: "http://localhost:9000/api/",
        apiLocalhost1336: "http://localhost:1336/api/",
        apiLocalhostIIS: "http://192.168.11.128/WebApi/api/"
      }
    }
  ]);