appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
        .state('clarity', {
            url: '/clarity',
            views: {
                '': {
                    templateUrl: 'views/layouts/clarity/clarity.layout.html',
                    controller: 'ClarityAppController'
                },
                'header@clarity': {
                    templateUrl: 'views/layouts/clarity/clarity.header.html',

                },
                'tree@clarity': {
                    templateUrl: 'views/layouts/clarity/clarity.tree.html',

                }
            }
        })
    .state('clarity.home', {
        url: '/home',
        views: {
            '': {
                templateUrl: 'views/layouts/clarity/clarity.home.html',
            }
        }
    })

     .state('clarity.login', {
        url: '/login',
        views: {
            '': {
                templateUrl: 'views/layouts/nms/login.html',
                // controller: 'LoginController'
            }
        }
    })

});