/// <reference path='../_all.ts' />

module app {
    'use strict';

    export interface IHomeScope extends ng.IScope {
    	ctrl: HomeCtrl
    }

    export class HomeCtrl {

        static $inject: Array<string> = ['$scope', '$timeout'];
        private scope: app.IHomeScope
        private timerRunning: boolean = false
        private bg: string = "normal"
        private time: number
        private timeout: ng.ITimeoutService
        private sound = new Audio("/alarm.mp3")

        constructor($scope: app.IHomeScope, $timeout: ng.ITimeoutService) {
        	this.scope = $scope
        	this.scope.ctrl = this
            this.timeout = $timeout

            this.timerRunning = false;

            this.scope.$on('timer-tick', (event, args) => {
                if((args.millis/1000)/this.time < 0.1) {
                    this.timeout(() => this.bg = "alert")
                    this.sound.play()
                }
                else if((args.millis/1000)/this.time < 0.2) {
                    this.timeout(() => this.bg = "warn")
                }
            });
        }

        public startTimer(time: number) {
            this.time = time
            this.bg = "normal"
            this.timerRunning = true
            this.scope.$broadcast('timer-start')
        }

        public pauseTimer() {
            this.timerRunning = true
            this.scope.$broadcast('timer-resume')
        }

        public stopTimer() {
            this.timerRunning = false;
            this.timeout(() => this.bg = "normal")
            this.scope.$broadcast('timer-stop')
        }
    }

}
