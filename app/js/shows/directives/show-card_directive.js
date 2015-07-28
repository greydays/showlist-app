'use strict';

module.exports = function(app) {
  app.directive('showCardDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: '/templates/directives/shows_view.html',
      scope: {
        save: '&',
        buttonText: '=',
        labelText: '@',
        note: '='
      },
      transclude: true
    };
  });


//http://jsfiddle.net/jaimem/aSjwk/1/
  app.controller('ctrl', function($scope){
  });

  app.directive('backImg', function(){
      return function(scope, element){
          element.css({
              'background-image': 'url(' + shows.image +')',
              'background-size' : 'cover'
          });
      };
  });


};
