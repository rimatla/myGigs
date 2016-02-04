/**
 * Created by acoelho on 2/2/16.
 */
var app = angular.module('myGigsApp',['ngRoute']);


app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/newGig', {
            templateUrl: 'views/newGig.html',
            controller: 'newGigController'
        });
    $locationProvider.html5Mode(true);
}]);




app.controller('homeController', ['$scope', '$http', '$location', function($scope, $http, $location){


}]);

app.controller('newGigController', ['$scope', '$http', function($scope, $http){

    $scope.reset = function(){
        $scope.group = ' ',
        $scope.eventTime = ' ',
        $scope.endTime = ' '

    };


}]);



