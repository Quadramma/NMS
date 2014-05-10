function NMSAppController($scope, $rootScope) {

    // $("title").html("Clarity | Flow/Health");

}


function GAppController($scope, $rootScope) {

    $("title").html("GA | Backend");

}

function GaLoginController($scope, $rootScope) {

    var Login = angular.module('GaLoginService', ['ngResource'])
        .factory('Login', ['$resource', "AppConfig",

            function($resource, AppConfig) {
                return $resource(AppConfig.apiPathQuadramma + '/login/:id', {}, {
                    check: {
                        method: 'POST',
                        isArray: false
                    }
                });
            }
        ]);

    Login.check({}, data, function() {
        console.log("SUCCESS");
    }, function() {
        console.log("FAIL");
    });

    $('.ui.form')
        .form({
            username: {
                identifier: 'username',
                rules: [{
                    type: 'empty',
                    prompt: 'Usuario requerido'
                }]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: 'Password requerida'
                }]
            }
        }, {
            onSuccess: function() {
                $catScope.save();
            },
            onFailure: function() {
                //console.log("fail");
            }
        });
}