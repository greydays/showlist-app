'use strict'

module.exports = function(app) {
  app.controller('authController', ['$scope','$location', 'auth', function($scope, $location, auth) {

    if (auth.isSignedIn()) $location.path('/bands');
    $scope.errors = [];
    $scope.authSubmit = function(venue) {
      if (venue.password_confirmation) {
        auth.create(venue, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }

          $location.path('/venue');
        })
      } else {
        auth.signIn(venue, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not create venue'});
          }

          $location.path('/venue');
        });
      }
    };
  }]);
};