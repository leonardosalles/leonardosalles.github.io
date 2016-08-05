(function () {
    angular.module('ls.controllers', []);

    var dependencies = [
        'ui.router',
        'ngSanitize',
        'ngStorage',
        'pascalprecht.translate',
        'ls.core',
        'ls.common',
        'ls.controllers',
        'ls.home'
    ];

	var translates = {
		default: 'pt-br',
		available: ['en-us']
	};

    angular.module('ls', dependencies).run(["$translate", "$rootScope", function($translate, $rootScope) {
        $rootScope.setLanguage = function (language) {
			$translate.use(language);
			$translate.refresh();
		};

		var language = window.navigator.userLanguage || window.navigator.language || translates.default;
		$rootScope.setLanguage(language.toLowerCase());
		
		console.log('Running Enzo 1.0.0 - http://leonardosalles.com');
    }])
    .config(["$urlRouterProvider", "$translateProvider", "$translateSanitizationProvider", "$locationProvider", function($urlRouterProvider, $translateProvider, $translateSanitizationProvider, $locationProvider) {
		$translateProvider.useLoader('$translatePartialLoader', {
			urlTemplate: 'translates/{lang}/{part}.json'
		});

		$translateProvider.preferredLanguage(translates.default);
  		$translateProvider.fallbackLanguage(translates.available);

		$translateProvider.useSanitizeValueStrategy(null);

		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
    }]);

    angular.element(document).ready(function() {
        angular.bootstrap(document, ['ls']);
    });
})();
(function () {
	HomeController.$inject = ["$scope", "$translatePartialLoader", "$translate"];
    angular.module('ls.controllers').controller('HomeController', HomeController);

    function HomeController ($scope, $translatePartialLoader, $translate) {
        var vm = this;
        vm.teste = 'Teste';
		vm.getAge = getAge;

		$translatePartialLoader.addPart('home');
  		$translate.refresh();

		vm.age = function (year, month, day) {
			var d = new Date,
				actualYear = d.getFullYear(),
				actualMonth = d.getMonth() + 1,
				actualDay = d.getDate(),

				year = +year,
				month = +month,
				day = +day,

				howOld = actualYear - year;

			if (actualMonth < month || actualMonth == month && actualDay < day) {
				howOld--;
			}

			return howOld < 0 ? 0 : howOld;
		}

		function getAge () {
			var age = vm.age(1995, 03, 30);
			$scope.ageTranslation = '{age: ' + age + '}';
		}
		
		emojify.setConfig({
    		img_dir: 'img/emoji'
		});
		
		emojify.run();
	}
})();

(function () {
    HomeModule.$inject = ["$stateProvider"];
    angular.module('ls.home', []).config(HomeModule);

    function HomeModule ($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController as vm'
        });
    }
})();

(function () {
    angular.module('ls.core', []);
})();

(function () {
	'use strict';

	lsLoading.$inject = ["$http", "$filter"];
	angular.module('ls.core').directive('lsLoading', lsLoading);

	function lsLoading ($http, $filter) {
		return {
			restrict: 'A',
			replace: true,
			controller: ["$scope", function ($scope) {
				$scope.$watchCollection(function () {
					return $http.pendingRequests;
				}, function () {
					var array = $filter('filter')($http.pendingRequests, function (request) {
						return (request.headers['ls-loading'] === undefined || request.headers['ls-loading']);
					});

					if (array.length === 0) {
						window.loading_screen.finish();
					}
				}, true);
			}]
		}
	}
})();
(function () {
	'use strict';
	
	angular.module('ls.core')
		.directive('lsMenuToggler', lsMenuToggler)
		.directive('lsMenuClose', lsMenuToggler);

	function lsMenuToggler () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				$(element).click(function (e) {
					e.preventDefault();
    				$('#sidebar-wrapper').toggleClass('active');
				});
			}
		};
	}
})();
(function () {
    angular.module('ls.common', []);
})();
