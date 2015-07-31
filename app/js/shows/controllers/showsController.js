'use strict';

module.exports = function(app) {
  app.controller('showsController', ['$scope', '$http', '$location', 'ShowsRESTResource', 'copy', function($scope, $http, $location, resource, copy) {
    var Show = resource('new-show');
    var oneShow = resource('show-view'); //***for getting one show?
    $scope.errors = [];
    $scope.show = [];

    $scope.getAllShows = function() {
      $http.get('/show/shows').success(function(response){
        $scope.shows = response;
      });
    };

    $scope.getShow = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/show/' + id).success(function(response) {
        $scope.show = response;
      });
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

    $scope.delete = function(id) {
      console.log(id);
      $http.delete('/show/shows/'  + id).success(function(err, data){
        $scope.getAllShows(id);
        if(err) {
          console.log(err)
        }
        console.log(data);
      });
    };

//***for linking out from show cards to complete show info
    $scope.getOneShow = function(show) {
      $http.get('/:venue/shows/:show').success(function(response){
        $scope.show = response;
      });
    };

    $scope.linkOut = function(id) {
      console.log(id);
      $location.path('/show/' + id);
    };

  }]);

   
};

