'use strict';

module.exports = function(app) {
  app.controller('showsController', ['$scope', '$http', function($scope, $http) {

    //set up get request to backend
    var getAll = function() {
      $http.get('/show/shows').success(function(response){
        $scope.shows = response;
      });
    };

    getAll();

    $scope.submitForm = function(show){
      console.log(show);
      $http.post('/show/shows', show).success(function(response){
        getAll();
      });
    };

    $scope.destroy = function(id) {
      console.log(id)
      $http.delete('/show/shows/'  + id).success(function(){
        getAll();
      });
    };

  }]);
};

