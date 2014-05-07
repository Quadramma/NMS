var NMSApp = angular.module("NMSApp", [
    "TemaService",
    "HomeCtrl",
    "TemaCtrl",
    "appRoutes"
]);

NMSApp.config(['$httpProvider', '$sceDelegateProvider',
    function($httpProvider, $sceDelegateProvider) {
        $httpProvider.defaults.useXDomain = true;
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?yourdomain.com/]);
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

/*
NMSApp.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
}]);
*/