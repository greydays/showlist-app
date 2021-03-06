'use strict';

module.exports = function(app) {
  var handleError = function(callback) {
    return function(data) {
      console.log(data);
      callback(data);
    };
  };

  var handleSuccess = function(callback) {
    return function(data) {
      callback(null, data);
    };
  };

  app.factory('ShowsRESTResource', ['$http', '$cookies', function($http, $cookies) {
    return function(resourceName) {
      var eat = $cookies.get('eat');
      $http.defaults.headers.common['eat'] = eat;
      return {
        get: function(callback) {
          $http.get('/venue/' + resourceName)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        create: function(resourceData, callback) {
          $http.post('/venue/' + resourceName, resourceData) 
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        save: function(resourceData, callback) {
          $http.put('/venue/' + resourceName + '/' + resourceData._id, resourceData)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        },

        remove: function(resourceData, callback) {
          $http.delete('/venue/' + resourceName + '/' + resourceData._id)
            .success(handleSuccess(callback))
            .error(handleError(callback));
        }
      };
    };
  }]);
};
