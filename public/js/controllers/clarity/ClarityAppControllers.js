angular.module('ClarityApp', [

])

.controller('ClarityMenuController', function($scope) {
	console.info("[ClarityMenuController]");

	$scope.closeMenu = function() {
		$('.menu.sidebar')
			.sidebar('toggle');
	}

})

.controller('ClarityHeaderController', function($scope) {
	console.info("[ClarityHeaderController]");

	$('.menu.sidebar')
		.sidebar({
			overlay: true
		});

	$scope.clickMenuButton = function() {
		$('.menu.sidebar')
			.sidebar('toggle');
	}

	if ($(window).width() > 640) {
		setTimeout(function() {
			$('.menu.sidebar')
				.sidebar('toggle');
		}, 3000);
	}

});