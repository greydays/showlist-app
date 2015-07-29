'use strict';

module.exports = function(app) {
  app.controller('venueController', ['$scope', '$http', 'RESTResource', 'copy', function($scope, $http, resource, copy) {
    var Venue = resource('venue');
    $scope.errors = [];
    $scope.venue = [];

    $scope.getVenue = function(venue) {
      // Venue.get(venue, function(err, data) {
      //   if (err) return $scope.errors.push({msg: 'error retrieving venue'});
      //   $scope.venue = data;
      // });
      console.log('reached venue controller get venue');
      console.log(venue);
      $http.get('/venue/' + venue.name).success(function(response){
        console.log('I got data');
        console.log(response);
        $scope.venue = response;
      });
    };

    $scope.createnewVenue = function(venue) {
      var newVenue = copy(venue);
      venue.venueBody = '';
      $scope.venue.push(newVenue);
      Venue.create(newVenue, function(err, data) {
        if(err) return $scope.errors.push({msg: 'could not save venue: ' + newVenue.venueBody});
        $scope.venue.splice($scope.venue.indexOf(newVenue), 1, data);
      });
    };

    $scope.removeVenue = function(venue) {
      $scope.venue.splice($scope.venue.indexOf(venue), 1);
      Venue.remove(venue, function(err) {
        if(err) {
          $scope.errors.push({msg: 'could not remove venue: ' + venue.venueBody});
        }
      });
    };

    $scope.saveVenue = function(venue) {
      venue.editing = false;
      Venue.save(venue, function(err, data) {
          if(err) $scope.errors.push({msg: 'could not update venue'});
      });
    };

    $scope.toggleEdit = function(venue) {
      if(venue.editing) {
        venue.venueBody = venue.venueBodyBackup;
        venue.venueBodyBackup = undefined;
        venue.editing = false;
      } else {
        venue.venueBodyBackup = venue.venueBody;
        venue.editing = true;
      }
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
}
