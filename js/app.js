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

    angular.module('ls', dependencies).run(["$translate", "$rootScope", "$localStorage", function($translate, $rootScope, $localStorage) {
        $rootScope.setLanguage = function (language) {
			$translate.use(language);
			$translate.refresh();
		};
		
		var lang = {
			'pt-br': 'en-us',
			'en-us': 'pt-br'
		};

		$rootScope.toggleLanguage = function () {
			var language = lang[$rootScope.actualLanguage];
			$rootScope.actualLanguage = language;
			$rootScope.otherLanguage = lang[$rootScope.actualLanguage];
			$localStorage.language = language;

			$rootScope.setLanguage(language);
		};

		var lastLanguage = $localStorage.language;

		if (lastLanguage) {
			$rootScope.actualLanguage = lastLanguage;
			$rootScope.otherLanguage = lang[$rootScope.actualLanguage];
			$localStorage.language = lastLanguage;

			$rootScope.setLanguage(lastLanguage);
		} else {
			var language = window.navigator.userLanguage || window.navigator.language || translates.default;
			$rootScope.actualLanguage = language.toLowerCase();
			$rootScope.otherLanguage = lang[$rootScope.actualLanguage];
			$rootScope.setLanguage(language.toLowerCase());
		}

		emojify.setConfig({
    		img_dir: 'img/emoji'
		});

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
	HomeController.$inject = ["$scope", "$translatePartialLoader", "$translate", "$timeout"];
    angular.module('ls.controllers').controller('HomeController', HomeController);

    function HomeController ($scope, $translatePartialLoader, $translate, $timeout) {
        var vm = this;
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

		$timeout(function () {
			emojify.run();
		}, 100);
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
    angular.module('ls.common', []);
})();
