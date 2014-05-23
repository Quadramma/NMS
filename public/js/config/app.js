//GLOBAL
sharedScopes = {};

var _nms = {};
smokesignals.convert(_nms);

//------------------------------

var NMSApp = angular.module("NMSApp", [

    //ANGULAR LIBS
    "infinite-scroll",

    //COMMON
    "appRoutes",
    "AppConfigService",

    //NMS
    "SemanticUIDirectives",
    "NMSHelperService",
    "ResourceControllerMixinService",



    //CLARITY ================================================
    "ClarityApp",

    
    "TemaNode",
    "ContactoNode",
    "NovedadNode",
    //CRM
    //"CRMServices",
    //"CoreTablesServices",
    //-TEMA
    //"TemaCtrl",
    //"TemaService",


    //GA ============================================
    /*
    "GaLoginService",
    "GAFileService",
    "CategoryServ",
    "CategoryCtrl",
    "ProductServ",
    "ProductCtrl",
    "ProjectServ",
    "ProjectCtrl"
    */
]);

NMSApp.config(['$httpProvider', '$sceDelegateProvider',
    function($httpProvider, $sceDelegateProvider) {
        $httpProvider.defaults.useXDomain = true;
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?yourdomain.com/]);
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


//GLOBAL CONFIG.
var GlobalSettings = {
    transformRequest: true //TRUE FOR CLARITY !!!
    ,
    productionMode: false
};

NMSApp.config(function($httpProvider) {
    //console.log("NMSApp Config OK");
    if (GlobalSettings.transformRequest) {
        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined)
                return data;
            return $.param(data); //urlencoded
        }
        $httpProvider.defaults.headers.post['Content-Type'] = undefined;
    }

});



NMSApp.run(['$rootScope', function($rootScope) {
    $http.defaults.headers.common['auth-token'] = 'C3PO R2D2';
});


var AppConfigService = angular.module('AppConfigService', [])
    .factory('AppConfig', [

        function() {
            var settings = {
                apiClarityPathVS: "http://localhost:9000/api/",
                apiLocalhost1336: "http://localhost:1336/api/",
                apiLocalhostIISIP: "http://192.168.11.128/WebApi/api/",
                apiLocalhostIIS: "http://localhost/WebApi/api/",
                apiPathQuadramma: "http://www.quadramma.com/pruebas/ga_remake/backend/api",
                apiLocal: "backend/api"
            }

            settings.apiClarityProduction = settings.apiLocalhostIIS; //CLARITY
            settings.apiClarityDev = settings.apiClarityPathVS; //CLARITY
            settings.apiGAProduction = settings.apiPathQuadramma; //GA
            settings.apiGADev = settings.apiPathQuadramma; //GA

            settings.apiClarity = GlobalSettings.productionMode ?
                settings.apiClarityProduction : settings.apiClarityDev;

            settings.apiGa = GlobalSettings.productionMode ?
                settings.apiGAProduction : settings.apiGADev;

            return settings;
        }
    ]);