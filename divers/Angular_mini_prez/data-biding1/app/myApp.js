var myApp = angular.module('myApp', []);
myApp.controller("myCtrl", function ($scope) {
    $scope.age = "0";
    $scope.majorite = function () {
        if ($scope.age >= 18) {
            return "majeur";
        } else {
            return "mineur";
        }
    }
});
