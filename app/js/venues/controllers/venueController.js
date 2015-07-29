'use strict';

module.exports = function(app) {
  app.controller('venueController', ['$scope', '$http', function($scope, $http) {

    //set up get request to backend
    // var getAll = function() {
    //   $http.get('/show/shows').success(function(response){
    //     console.log(response);
    //     $scope.venues = response;
    //   });
    // };

    // getAll();

    $scope.submitForm = function(venue){
      console.log(show);
      $http.post('/show/shows', show).success(function(response){
        getAll();
      });
    };

//     $scope.destroy = function(id) {
//       console.log(id)
//       $http.delete('/show/shows/'  + id).success(function(){
//         getAll();
//       });
//     };

    //venue-card edit view
    $scope.edit = function(venue) {
      venue.editing = true;
    };

    $scope.update = function(venue) {
      console.log(venue);
      $http.put('/venues/' + venue._id, venue)
        .error(function (error) {
          console.log(error);
      });
      venue.editing = false;
    };


  }]);
};

