'use strict';

module.exports = function(app) {
  app.controller('venueController', ['$scope', '$http', '$location', 'VenueRESTResource', 'copy', function($scope, $http, $location, resource, copy) {
    var Venue = resource('venue-view');
    var CreateVenue = resource('new-Venue');
    $scope.errors = [];
    $scope.venue = [];

    var getVenue = function() {
      console.log('reached venue controller get venue');
      Venue.get(function(err, data) {
        console.log(data);
        if (err) return $scope.errors.push({msg: 'error retrieving venue'});
        $scope.venue = data;
      });
    };

    $scope.submitForm = function(venue) {
     console.log('venue', venue);
     var newVenue = copy(venue);
     venue.venueBody = '';
     $scope.venue.push(newVenue);
     CreateVenue.create(newVenue, function(err,data) {
      if (err) return $scope.errors.push({msg: 'could not save venue'})
        console.log('venue create data', data)
      $scope.venue.splice($scope.venue.indexOf(newVenue), 1, data);
     })
     $location.path('/shows');
    }

    getVenue();

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
