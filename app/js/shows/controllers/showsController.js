'use strict';

module.exports = function(app) {
  app.controller('showsController', ['$scope', '$http', '$location', 'ShowsRESTResource', 'copy', function($scope, $http, $location, resource, copy) {
    var Show = resource('new-show');
    var OneShow = resource('shows'); //***for getting one show?
    $scope.errors = [];
    $scope.show = [];
    
    $scope.getAllShows = function() {
      $http.get('/show/shows').success(function(response){
        $scope.shows = response;
      });
    };

//***for linking out from show cards to complete show info
    $scope.getOneShow = function(show) {
      $http.get('/:venue/shows/:show').success(function(response){
        $scope.show = response;
      });
    };

    $scope.getShow = function() {
      $http.get('/show/' + show._id).success(function(response) {
        $scope.show = response;
      });
    };

    $scope.submitForm = function(show){
      console.log('show', show);
      var newShow = copy(show);
      show.showBody = '';
      $scope.show.push(newShow);
      Show.create(newShow, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not save show: ' + newShow.showBody});
        console.log('show create data', data)
        $scope.show.splice($scope.show.indexOf(newShow), 1, data);
      });
    };

    $scope.saveShow = function(show) {
      show.editing = false;
      OneShow.save(show, function(err, data) {
        if(err) $scope.errors.push({msg: 'could not update show'});
      });
    };

    $scope.toggleEdit = function(show) {
      console.log('toggle edit');
      if(show.editing) {
        show.showBody = show.showBodyBackup;
        show.showBodyBackup = undefined;
        show.editing = false;
      } else {
        console.log(show.showBody);
        console.log(show.showBodyBackup);
        show.showBodyBackup = show.showBody;
        show.editing = true;
      }
    };

    $scope.destroy = function(id) {
      console.log(id)
      $http.delete('/show/shows/'  + id).success(function(){
        $scope.getAllShows();
      });
    };

    $scope.linkOut = function(id) {
      console.log(id);
      $location.path('/show/show-view');
    };

  }]);
};

