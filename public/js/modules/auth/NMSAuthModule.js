angular.module('NMSAuthModule', [
	"NMSConfigModule"
])

.factory('$NMSAuth', ["$rootScope", "$NMSConfig", "$http",
	function($rootScope, $NMSConfig, $http) {
		var getToken = function() {
			return store.get("nms_" + $NMSConfig.AppIdentifier + "_token") || {};
		};
		setToken = function(token) {
			store.set("nms_" + $NMSConfig.AppIdentifier + "_token", token);
		};
		return {
			getToken: getToken,
			setToken: setToken,
			setLogged: function(val, token) {
				//Todos los http calls envian el token
				setToken(token);
				$http.defaults.headers.common['Authorization'] = getToken();
				$rootScope.logged = true; //flag que se checkea en el route 
			}
		}
	}
])

.factory('$NMSLocalSession', ["$NMSConfig",
	function($NMSConfig) {
		return {

			getData: function() {
				return store.get("nmssessiondata") || {};
			},
			setData: function(data) {
				store.set("nmssessiondata", data);
			}
		}
	}
]);