/// <reference path='../_all.ts' />
var app;
(function (app) {
	'use strict';

	var HomeCtrl = (function () {
		function HomeCtrl($scope, $timeout) {
			var _this = this;
			this.timerRunning = false;
			this.bg = "normal";
			this.scope = $scope;
			this.scope.ctrl = this;
			this.timeout = $timeout;
			this.alarmSound = new Audio("/alarm.mp3");
			this.alarmSound.addEventListener('ended', function () {
				console.log("Alarm ended")
				this.currentTime = 0;
				this.play();
			}, false);

			this.scope.$on('timer-tick', function (event, args) {
				if (args.millis <= 1000) {
					console.log("ALERT");
					_this.timeout(function () {
						_this.alarmSound.play();
						return _this.bg = "alert";
					});
				}
				else if (args.millis <= 10000) {
					console.log("WARN");
					_this.timeout(function () {
						return _this.bg = "warn";
					});
				}
			});
		}

		HomeCtrl.prototype.startTimer = function (time) {
			this.time = time;
			this.bg = "normal";
			this.timerRunning = true;
			this.scope.$broadcast('timer-start');
		};

		HomeCtrl.prototype.pauseTimer = function () {
			this.timerRunning = true;
			this.scope.$broadcast('timer-resume');
		};

		HomeCtrl.prototype.stopTimer = function () {
			var _this = this;
			this.timerRunning = false;
			_this.alarmSound.pause();
			this.timeout(function () {
				return _this.bg = "normal";
			});
			this.scope.$broadcast('timer-stop');
		};
		HomeCtrl.$inject = ['$scope', '$timeout'];
		return HomeCtrl;
	})();
	app.HomeCtrl = HomeCtrl;
})(app || (app = {}));
/// <reference path='_all.ts' />
var app;
(function (app) {
	'use strict';

	var jstimer = angular.module('jstimer', ['timer']);

	jstimer.controller('homeCtrl', app.HomeCtrl);

	jstimer.config([
		'$routeProvider',
		function ($routeProvider) {
			$routeProvider.when('/', { templateUrl: 'partials/home.html' }).otherwise({ redirectTo: '/' });
		}
	]);
})(app || (app = {}));
