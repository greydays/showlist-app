'use strict';

module.exports = function(app) {
  app.factory('auth' , ['$http','$base64', '$cookies', function($http, $base64, $cookies) {
    return {
      signIn: function(venue, callback) {
        var encoded = $base64.encode(venue.name + ':' + venue.password);
        $http.get('/venue/sign_in', {
          headers: {'Authorization': 'Basic ' + encoded}
        })
        .success(function(data) {
          $cookies.put('eat', data.token);
          callback(null);
        })
        .error(function(data) {
          callback(data);
        });
      },

      create: function(venue, callback) {
        $http.post('/venue/create_venue', venue)
          .success(function(data) {
            console.log(data);
            $cookies.put('eat', data.token)
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      logout: function() {
        $cookies.put('eat', '');
      },

      isSignedIn: function() {
        return !!($cookies.get('eat') && $cookies.get('eat').length);
      }
    };
  }]);
};
