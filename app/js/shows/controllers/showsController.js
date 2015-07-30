'use strict';

module.exports = function(app) {
  app.controller('showsController', ['$scope', '$http', '$location', 'ShowsRESTResource', 'copy', function($scope, $http, $location, resource, copy) {
    var Show = resource('new-show');
    $scope.errors = [];
    $scope.show = [];
    
    $scope.getAllShows = function() {
      $http.get('/show/shows').success(function(response){
        $scope.shows = response;
      });
    };

    $scope.getShow = function() {
      console.log($scope.show);
      // console.log(show);
      // $http.get('/show/' + show._id).success(function(response) {
      //   $scope.show = response;
      // });
      // $location.path('/show/' + show._id);
    };

    $scope.storeShow = function(show) {
      $http.get('/show/' + show._id).success(function(response) {
        $scope.show = response;
      });
    }

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

    $scope.destroy = function(id) {
      console.log(id)
      $http.delete('/show/shows/'  + id).success(function(){
        $scope.getAllShows();
      });
    };

  }]);
};

