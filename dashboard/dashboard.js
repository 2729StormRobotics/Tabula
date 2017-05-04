'use strict';

angular.module('dashboard').controller('DashboardController', function($scope){
    console.log('hello');
}).directive('boolean', function($interpolate, $compile){
    return {
        restrict: 'E',
        scope: {
            ntKey: '@',
        },
        templateUrl: 'dashboard/templates/boolean.html',
        link: function($scope, $element, $attrs) {

            NetworkTables.addKeyListener($attrs.ntKey, function(key, value, isNew){
                console.log("received change");
                if (value) {
                    $element.addClass('booleanOn');
                    $element.removeClass('booleanOff');
                } else {
                    $element.removeClass('booleanOn');
                    $element.addClass('booleanOff');
                }
                $compile($element.contents())($scope);
            }, true);
        }
    }
}).directive('motorSpeed', function(){
    return{
        restrict: 'E',
        scope: {ntKey: '@', name: '@'},
        templateUrl: 'dashboard/templates/motor.html',
        link: function($scope, $element, $attrs){
            NetworkTables.addKeyListener($attrs.ntKey, function(key, value, isNew){
                $scope.speed = value;
                $scope.$apply();
            }, true);
        }
    }
}).directive('compass', function() {
  return {
    restrict: 'E',
    scope: {
      ntKey: '@',
      width: '@',
      height: '@'
    },
    templateUrl: 'dashboard/templates/compass.html',
    link: function(scope, element, attrs) {
      scope.canvas = element.find('canvas')[0];
      scope.ctx = scope.canvas.getContext('2d');

      var ctx = scope.ctx;
      scope.canvas.width = scope.width;
      scope.canvas.height = scope.height;

      var width = scope.canvas.offsetWidth;
      var height = scope.canvas.offsetHeight;
      var centerX = width / 2;
      var centerY = height / 2;

      var size = 0;
      var textRadius = 0;

      if (width > height) {
        size = centerX * 0.7;
        textRadius = centerX * 0.85;
      } else {
        size = centerY * 0.7;
        textRadius = centerY * 0.85;
      }

      var tickColor = '#FFFFFF';

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '15px sans-serif';
      var current = 0;
      drawCompass(0, current);

      function drawTicks() {
        ctx.beginPath();
        ctx.strokeStyle = tickColor;
        ctx.fillStyle = tickColor;
        ctx.lineWidth = 2;

        for (var i = 0; i < 16; i++) {
          var angle = (i / 16) * (2 * Math.PI);
          ctx.moveTo(centerX + size * Math.cos(angle), centerY + size * Math.sin(angle));
          ctx.lineTo(centerX + size * 0.8 * Math.cos(angle), centerY + size * 0.8 * Math.sin(angle));
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.lineWidth = 3;

        for (var i = 0; i < 4; i++) {
          var angle = (i / 4) * (2 * Math.PI);
          ctx.moveTo(centerX + size * Math.cos(angle), centerY + size * Math.sin(angle));
          ctx.lineTo(centerX + size * 0.7 * Math.cos(angle), centerY + size * 0.7 * Math.sin(angle));
          ctx.stroke();
        }

        ctx.fillText('0°', centerX, centerY - textRadius);
        ctx.fillText('90°', centerX + textRadius, centerY);
        ctx.fillText('180°', centerX, centerY + textRadius);
        ctx.fillText('270°', centerX - textRadius, centerY);
        ctx.stroke();

        ctx.fillText('45°', centerX + textRadius * Math.cos(Math.PI / 4), centerY - textRadius * Math.sin(Math.PI / 4));
        ctx.fillText('135°', centerX + textRadius * Math.cos(Math.PI / 4), centerY + textRadius * Math.sin(Math.PI / 4));
        ctx.fillText('225°', centerX - textRadius * Math.cos(Math.PI / 4), centerY + textRadius * Math.sin(Math.PI / 4));
        ctx.fillText('315°', centerX - textRadius * Math.cos(Math.PI / 4), centerY - textRadius * Math.sin(Math.PI / 4));
        ctx.stroke();
      }

      function drawArrow(angle, current) {
        var arrowWidth = size * 0.2;
        var start = new Date().getTime();
        var duration = 400;
        var end = start + duration;
        var distance = angle - current;
        if(isNaN(distance)) distance = 0;
        var step = function(){
            ctx.clearRect(0, 0, width, height);
            drawTicks();
            var timestamp = new Date().getTime();
            var progress = Math.min((duration - (end - timestamp)) / duration, 1);

            ctx.translate(centerX, centerY);

            ctx.rotate(current + (distance * progress));

            ctx.strokeWidth = 1;
            ctx.strokeStyle = '#F78022';
            ctx.fillStyle = '#F78022';

            ctx.beginPath();
            ctx.moveTo(arrowWidth / 2, 0);
            ctx.lineTo(arrowWidth / 2, -size * 0.7);
            ctx.lineTo(0, -size * 0.9);
            ctx.lineTo(-arrowWidth / 2, -size * 0.7);
            ctx.lineTo(-arrowWidth / 2, 0);
            ctx.lineTo(arrowWidth / 2, 0);

            ctx.stroke();
            ctx.fill();

            ctx.strokeStyle = '#000000';
            ctx.fillStyle = '#000000';

            ctx.beginPath();
            ctx.arc(0, 0, arrowWidth / 2 + 0.1, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            // If the animation hasn't finished, repeat the step.
            if (progress < 1) requestAnimationFrame(step);

        }
        return step();

      }

      function drawCompass(angle, current){
      	ctx.clearRect(0, 0, width, height);
        drawArrow(angle, current);
      }
      NetworkTables.addKeyListener(attrs.ntKey, function(key, value, isNew){
          drawCompass(value * Math.PI / 180, current);
          current = value * Math.PI / 180;
      }, true);
    }
  };
});
