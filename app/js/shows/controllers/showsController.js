'use strict';

module.exports = function(app) {
  app.controller('showsController', ['$scope', '$http', function($scope, $http) {

    //set up get request to backend
    var getAll = function() {
      $http.get('/shows').success(function(){
        console.log('I got data');
        console.log(response);
      });
    };

    getAll();

    $scope.submitForm = function(show){
      console.log(setting);
      $http.post('/shows', show).success(function(){
        getAll();
      });
    };

    $scope.destroy = function(id) {
      console.log(id)
      $http.delete('/shows/'  + id).success(function(){
        getAll();
      });
    };

  }]);
};
