var myApp = angular.module('myApp', []);
myApp.controller("myCtrl", function ($scope) {
    $scope.classeGras = "";
    $scope.count = 0;
    $scope.menus = ['fichier', 'édition', 'supprimer', 'affichage', 'quitter'];
});
