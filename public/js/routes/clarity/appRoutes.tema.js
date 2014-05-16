appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('clarity.tema', {
            url: '/tema',
            views: {
                '': {
                    templateUrl: 'views/nodes/tema/tema.layout.html',
                    //controller: 'TemaController'
                }
            }
        })

    .state('clarity.tema.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/nodes/tema/tema.list.html',
                controller: 'Tema.ItemsController'
            }
        }
    })
        .state('clarity.tema.create', {
            url: '/create',
            views: {
                '': {
                    templateUrl: 'views/nodes/tema/tema.create.html',
                    controller: 'Tema.CreateController'
                }
            }
        })
        .state('clarity.tema.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/tema/tema.edit.html',
                    controller: 'Tema.EditController'
                }
            }
        });


});