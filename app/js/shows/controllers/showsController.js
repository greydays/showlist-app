'use strict';

module.exports = function(app) {
  app.controller('showsController', ['$scope', '$http', '$location', 'ShowsRESTResource', 'copy', function($scope, $http, $location, resource, copy) {
    var Show = resource('new-show');
    var OneShow = resource('shows'); //***for getting one show?
    $scope.errors = [];
    $scope.shows = [];

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
      $scope.shows.push(newShow);
      Show.create(newShow, function(err, data) {
        if (err) return $scope.errors.push({msg: 'could not save show: ' + newShow.showBody});
        console.log('show create data', data)
        $scope.shows.splice($scope.shows.indexOf(newShow), 1, data);
        $location.path('/shows');
      });
    };

    $scope.saveShow = function(show) {
      show.editing = false;
      OneShow.save(show, function(err, data) {
        if(err) $scope.errors.push({msg: 'could not update show'});
      });
    };

    $scope.onEdit = function(show) {
      console.log(show);
      $location.path('/edit-show/' + show._id);
    };

    $scope.offEdit = function(show) {
      $location.path('/show/' + show._id);
    }

    $scope.returnHome = function() {
      $location.path('/shows');
    }

    $scope.delete = function(id) {
      console.log(id);
      $http.delete('/show/shows/'  + id).success(function(err, data){
        $scope.getAllShows(id);
        if(err) {
          console.log(err)
        }
        console.log(data);
        $location.path('/shows');
      });
    };

    $scope.linkOut = function(id) {
      console.log(id);
      $location.path('/show/' + id);
    };

  }]);

   
};

