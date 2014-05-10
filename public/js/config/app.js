var NMSApp = angular.module("NMSApp", [
    //COMMON
    "appRoutes",

    //NMS
    "ResourceControllerMixinService",

    //CLARITY ================================================
    "HomeCtrl",

    //CRM
    "CrmCtrl",
    "ContactoService",
    //-TEMA
    "TemaCtrl",
    "TemaService",

    //GA ============================================
    "CategoryServ",
    "CategoryCtrl",
    "ProductServ",
    "ProductCtrl"
]);

NMSApp.config(['$httpProvider', '$sceDelegateProvider',
    function($httpProvider, $sceDelegateProvider) {
        $httpProvider.defaults.useXDomain = true;
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?yourdomain.com/]);
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

//GLOBAL CONFIG.
var settings = {
    transformRequest: false //TRUE FOR CLARITY !!!
};

NMSApp.config(function($httpProvider) {
    console.log("NMSApp Config OK");
    if (settings.transformRequest) {
        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined)
                return data;
            return $.param(data); //urlencoded
        }
        $httpProvider.defaults.headers.post['Content-Type'] = undefined;
    }

});


var AppConfigService = angular.module('AppConfigService', [])
    .factory('AppConfig', [

        function() {
            var settings = {
                apiClarityPathVS: "http://localhost:9000/api/",
                apiLocalhost1336: "http://localhost:1336/api/",
                apiLocalhostIIS: "http://192.168.11.128/WebApi/api/",
                apiPathQuadramma: "http://www.quadramma.com/pruebas/ga_remake/backend/api",
                apiLocal: "backend/api"
            }

            settings.apiGAProduccion = settings.apiPathQuadramma; //GA

            return settings;
        }
    ]);