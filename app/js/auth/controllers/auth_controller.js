'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope','$location', 'auth', function($scope, $location, auth) {
    $scope.errors = [];
    
    $scope.signedIn = function() {
      if (auth.isSignedIn()) {
        venue.signedIn = true;
      }
    };

    $scope.authSubmit = function(venue) {
      if (venue.password_confirmation) {
        auth.create(venue, function(err, data) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not create venue'});
          }
          $location.path('/venue/venue-view');
        })
      } else {
        auth.signIn(venue, function(err, data) {
          if(err) {
            console.log(err);
            return $scope.errors.push({msg: 'could not sign in'});
          }
          $location.path('/venue/venue-view');
        });
      }
    };
    $scope.signOut = function(venue) {
      auth.logout();
      $location.path('/shows');
    };
  }]);
};
