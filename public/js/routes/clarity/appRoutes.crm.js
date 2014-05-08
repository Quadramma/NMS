appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
        .state('clarity.crm', {
            url: '/crm',
            views: {
                '': {
                    templateUrl: 'views/nodes/crm/crm.layout.html',
                    controller: 'CrmController'
                }
            }
        })

    .state('clarity.crm.list', {
        url: '/list',
        views: {
            '': {
                templateUrl: 'views/nodes/crm/crm.list.html'
            }
        }
    })
        .state('clarity.crm.create', {
            url: '/create',
            views: {
                '': {
                    templateUrl: 'views/nodes/crm/crm.create.html'
                }
            }
        })
        .state('clarity.crm.edit', {
            url: '/edit',
            views: {
                '': {
                    templateUrl: 'views/nodes/crm/crm.edit.html'
                }
            }
        });


});