appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('clarity.crm', {
            url: '/crm',
            views: {
                '': {
                    templateUrl: 'views/nodes/crm/crm.layout.html',
                   // controller: ''
                }
            }
        })

    .state('clarity.crm.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/nodes/crm/crm.list.html',
                controller:"ContactoItemsController"
            }
        }
    })
        .state('clarity.crm.create', {
            url: '/create',
            views: {
                '': {
                    templateUrl: 'views/nodes/crm/crm.create.html',
                    controller:"ContactoCreateController"
                }
            }
        })
        .state('clarity.crm.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/crm/crm.edit.html',
                    controller:"ContactoEditController"
                }
            }
        });


});