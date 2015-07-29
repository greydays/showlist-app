'use strict';

module.exports = function(app) {
  app.directive('venueFormDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '/templates/directives/venue_form.html',
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
