'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope','$location', 'auth', function($scope, $location, auth) {
    if (auth.isSignedIn()) {
      $location.path('/venue');
    }
    $scope.errors = [];
    $scope.authSubmit = function(venue) {
      if (venue.password_confirmation) {
        auth.create(venue, function(err, data) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not create venue'});
          }
          $location.path('/venue/' + data.name);
        })
      } else {
        auth.signIn(venue, function(err, data) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }
          $location.path('/' + data.name); 
        });
      }
    };
  }]);
};
