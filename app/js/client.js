'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var showlistApp = angular.module('showlistApp', ['ngRoute', 'ngCookies', 'base64']);

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
require('./shows/directives/show-card_directive')(showlistApp);
// require('./auth/directives/logout_directive')(showlistApp);

showlistApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/shows', {
      templateUrl: 'templates/directives/shows_view.html',
      controller: 'showsController'
    })
    // .when('/login', {
    //   templateUrl: 'templates/directivs/login_form.html',
    //   controller: 'authController'
    // })
    .when('/new-show', {
      templateUrl: 'templates/directives/new_show_form.html',
      controller: 'showsController'
    })
    .when('/', {
      redirectTo: '/shows'
    })
    .otherwise({
      redirectTo: '/login'
    });
}]);
