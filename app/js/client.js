'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var settingsApp = angular.module('showlistApp', ['ngRoute', 'ngCookies', 'base64']);

//services
// require('./services/copy')(showlistApp);
// require('./services/rest_resource')(showlistApp);
// require('./auth/services/auth')(showlistApp);

//controllers
require('./shows/controllers/showsController')(showlistApp);
// require('./auth/controllers/auth_controller')(showlistApp);

//directives
// require('./directives/simple_directive')(showlistApp);
require('./shows/directives/show_form_directive')(showlistApp);
// require('./auth/directives/logout_directive')(showlistApp);

showlistApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/shows', {
      templateUrl: 'templates/views/shows_view.html',
      controller: 'showsController'
    })
    .when('/login', {
      templateUrl: 'templates/views/loginForm.html',
      controller: 'authController'
    })
    .when('/newShow', {
      templateUrl: 'templates/views/newShow.html',
      controller: 'authController'
    })
    .when('/', {
      redirectTo: '/shows'
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);
