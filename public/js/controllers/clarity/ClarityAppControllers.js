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

	function initSidebar() {
		$('.menu.sidebar')
			.sidebar({
				overlay: ($(window).width() < 1200)
			});
	}
	initSidebar();

	$(window).on("resize", function() {

		if($('.menu.sidebar').sidebar("is open")){
			$('.menu.sidebar').sidebar("hide");
		}


		initSidebar();
	})

	$scope.clickMenuButton = function() {
		$('.menu.sidebar')
			.sidebar('toggle');
	}

	if ($(window).width() > 1200) {
		//setTimeout(function() {
		$('.menu.sidebar')
			.sidebar('toggle');
		//}, 3000);
	}

})



.controller('ClarityHomeController', function($scope) {
	console.info("[ClarityHomeController]");



});