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

    $scope.getShow = function() {
      console.log('reached get show')
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/show/' + id).success(function(response) {
        $scope.show = response;
        console.log(response);
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
      if(show.editing) {
        console.log('true edit');
        show.showBody = show.showBodyBackup;
        show.showBodyBackup = undefined;
        show.editing = false;
      } else {
        console.log(show);
        show.showBodyBackup = show.showBody;
        show.editing = true;
        $location.path('/edit-show/' + show._id);
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
      $location.path('/show/' + id);
    };

  }]);
};

