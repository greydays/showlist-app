'use strict';

module.exports = function(app) {
  app.directive('editShowFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/shows/edit_show_form.html',
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
