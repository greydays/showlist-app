'use strict';

module.exports = function(app) {
  app.directive('venueFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/venues/new_show_form.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      },
      transclude: true
    };
  });

  app.directive('venueCardDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/venues/venue-card.html',
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

