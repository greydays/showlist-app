'use strict'

module.exports = function(app) {
  app.controller('bandController', ['$scope', 'RESTResource', 'copy', function($scope, resource, copy) {
    var Band = resource('band');
    $scope.errors = [];
    $scope.band = [];

    $scope.getAll = function() {
      Band.getAll(function(err, data) {
        if (err) return $scope.errors.push({msg: 'error retrieving band'});
        $scope.band = data;
      });
    };

    $scope.createnewBand = function(band) {
      var newBand = copy(band);
      band.bandBody = '';
      $scope.band.push(newBand);
      Band.create(newBand, function(err, data) {
        if(err) return $scope.errors.push({msg: 'could not save band: ' + newBand.bandBody});
        $scope.band.splice($scope.band.indexOf(newBand), 1, data);
      });
    };

    $scope.removeBand = function(band) {
      $scope.band.splice($scope.band.indexOf(band), 1);
      Band.remove(band, function(err) {
        if(err) {
          $scope.errors.push({msg: 'could not remove band: ' + band.bandBody});
        }
      });
    };

    $scope.saveBand = function(band) {
      band.editing = false;
      Band.save(band, function(err, data) {
          if(err) $scope.errors.push({msg: 'could not update band'});
      });
    };

    $scope.toggleEdit = function(band) {
      if(band.editing) {
        band.bandBody = band.bandBodyBackup;
        band.bandBodyBackup = undefined;
        band.editing = false;
      } else {
        band.bandBodyBackup = band.bandBody;
        band.editing = true;
      }
    };

    $scope.clearErrors = function() {
      $scope.errors = [];
      $scope.getAll();
    };
  }]);
};
