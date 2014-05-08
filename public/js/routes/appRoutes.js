var appRoutes = angular.module('appRoutes', ['ui.router']);
appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $urlRouterProvider.otherwise('/clarity/home');
});

appRoutes.run(function($rootScope, $location, $urlRouter, $state, $timeout) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.logged = $rootScope.logged || true;
        if (toState.url != "/login" && !$rootScope.logged) {
            //console.log("redirect to login ");

            event.preventDefault();
            $timeout(function() {
                event.currentScope.$apply(function() {
                    $state.go("login")
                });
            }, 300)

        } else {
            //console.log("good for " + toState.url);
        }
    });

});