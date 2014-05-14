appRoutes.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

    .state('ga.category', {
        url: '/category',
        views: {
            '': {
                templateUrl: 'views/nodes/category/category.layout.html',
                controller: 'CategoryController'
            }
        }
    })

    .state('ga.category.items', {
        url: '/items/:type',
        views: {
            '': {
                templateUrl: 'views/nodes/category/category.items.html',
                controller: "CategoryItemsController"
            }
        }
    })

    .state('ga.category.create', {
        url: '/create',
        views: {
            '': {
                templateUrl: 'views/nodes/category/category.create.html',
                controller: "CategoryCreateController"
            }
        }
    })
        .state('ga.category.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: 'views/nodes/category/category.edit.html',
                    controller: "CategoryEditController"
                }
            }
        })


});