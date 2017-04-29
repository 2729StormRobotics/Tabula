'use strict';

angular.module('dashboard').controller('DashboardController', function($scope){
    console.log('hello');
}).directive('motorSpeed', function(){
    return{
        restrict: 'E',
        scope: {ntKey: '@', name: '@'},
        templateUrl: 'dashboard/templates/motor.html',
        link: function($scope, $element, $attrs){
            NetworkTables.addKeyListener($attrs.ntKey, function(key, value, isNew){
                $scope.$apply(function(){
                    $scope.textCont = value;
                });
            }, true);
        }
    }
});
