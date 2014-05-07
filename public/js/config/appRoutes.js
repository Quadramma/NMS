var appRoutes = angular.module('appRoutes', ['ui.router']);
appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //
    $urlRouterProvider.otherwise('/clarity/home');
    //
    $stateProvider

    .state('login', {
        url: '/login',
        views: {
            '': {
                templateUrl: 'views/login.html',
                // controller: 'LoginController'
            }
        }
    })

    .state('clarity', {
        url: '/clarity',
        views: {
            '': {
                templateUrl: 'views/layouts/clarity/clarity.layout.html',
                controller: 'HomeController'
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

    .state('clarity.tema', {
        url: '/tema',
        views: {
            '': {
                templateUrl: 'views/tema/tema.layout.html',
                controller: 'TemaController'
            }
        }
    })

    .state('clarity.tema.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/tema/tema.list.html'
            }
        }
    })
        .state('clarity.tema.create', {
            url: '/create',
            views: {
                '': {
                    templateUrl: 'views/tema/tema.create.html'
                }
            }
        })
        .state('clarity.tema.edit', {
            url: '/edit',
            views: {
                '': {
                    templateUrl: 'views/tema/tema.edit.html'
                }
            }
        })

    .state('client', {
        url: '/client',
        views: {
            '': {
                templateUrl: 'views/client/clientLayout.html',
                //controller: 'ClientController'
            }
        }
    })

    .state('client.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/client/clientList.html'
            }
        }
    })

    .state('client.edit', {
        url: '/edit',
        views: {
            '': {
                templateUrl: 'views/client/clientEdit.html'
            },
            'clientForm@client.edit': {
                templateUrl: 'views/client/clientForm.html'
            }
        }
    })

    .state('client.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/client/clientCreate.html'
            },
            'clientForm@client.create': {
                templateUrl: 'views/client/clientForm.html'
            }
        }
    })

    .state('supplier', {
        url: '/supplier',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierLayout.html',
                //controller: 'SupplierController'
            }
        }
    })

    .state('supplier.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierList.html'
            }
        }
    })

    .state('supplier.edit', {
        url: '/edit',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierEdit.html'
            },
            'clientForm@client.edit': {
                templateUrl: 'views/supplier/supplierForm.html'
            }
        }
    })

    .state('supplier.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/supplier/supplierCreate.html'
            },
            'supplierForm@client.create': {
                templateUrl: 'views/supplier/supplierForm.html'
            }
        }
    })

    .state('workitems', {
        url: '/workitems',
        views: {
            '': {
                templateUrl: 'views/workitems.html',
                //controller: 'WorkItemController'
            }
        }
    })

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