/// <reference path='_all.ts' />

module app {
    'use strict';

    var jstimer = angular.module('jstimer', ['timer'])

    jstimer.controller('homeCtrl', HomeCtrl)

    jstimer.config(['$routeProvider', function($routeProvider) {
		    $routeProvider.when('/', {templateUrl: 'partials/home.html'}).
		    otherwise({redirectTo: '/'})
  		}])  
}