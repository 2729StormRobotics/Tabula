'use strict';

angular.module("dashboard").controller('DashboardController', function($scope){
    console.log("hello");
}).directive("motorSpeed", function(){
    return{
        restrict: "E",
        scope: {ntKey: "@", name: "@"},
        template: "<p>{{ name }}: {{ textCont }}</p>",
        link: function($scope, $element, $attrs){
            NetworkTables.addKeyListener($attrs.ntKey, function(key, value, isNew){
                $scope.$apply(function(){
                    $scope.textCont = value;
                });
            }, true);
        }
    }
});
