appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('ga', {
            url: '/ga',
            views: {
                '': {
                    templateUrl: 'views/layouts/ga/ga.layout.html',
                    controller: 'GAppController'
                },
                'header@ga': {
                    templateUrl: 'views/layouts/ga/ga.header.html',

                }
            }
        })
        .state('ga.home', {
            url: '/home',
            views: {
                '': {
                    templateUrl: 'views/layouts/ga/ga.home.html',
                }
            }
        })

    .state('ga.login', {
        url: '/login',
        views: {
            '': {
                templateUrl: 'views/layouts/ga/ga.login.html',
                controller: 'GaLoginController'
            }
        }
    })

});



appRoutes.run(function($rootScope, $location, $urlRouter, $state, $timeout) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log("toState");
        console.log(toState);
    });

});