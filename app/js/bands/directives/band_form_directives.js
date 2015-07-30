'use strict';

module.exports = function(app) {
  app.directive('bandFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/shows/new_artist_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      },
      transclude: true
    };
  });
};