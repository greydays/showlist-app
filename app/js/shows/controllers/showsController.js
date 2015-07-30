'use strict';

module.exports = function(app) {
  app.controller('showsController', ['$scope', '$http', 'ShowsRESTResource', 'copy', function($scope, $http, resource, copy) {
    var Show = resource('new-show');
    $scope.errors = [];
    $scope.show = [];
    //set up get request to backend
    // $scope.getShow = function(show) {
    //   console.log('reached show controller get show');
    //   console.log(show);
    //   Show.get(show, function(err, data) {
    //     if (err) return $scope.errors.push({msg: 'error retrieving show'});
    //     $scope.show = data;
    //   });
    // };
    var getShow = function() {
      $http.get('/show/shows').success(function(response){
        $scope.shows = response;
      });
    };

    getShow();

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
        getShow();
      });
    };

  }]);
};

