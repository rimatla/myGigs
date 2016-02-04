/**
 * Created by acoelho on 2/2/16.
 */
var app = angular.module('myGigsApp',['ngRoute']);


app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        .when('/newGig', {
            templateUrl: 'views/newGig.html',
            controller: 'newGigController'
        });
    $locationProvider.html5Mode(true);
}]);




app.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $http.get('/getAllGigs')
        .then(function(response) {
            console.log('Here is the home controller getting users:', response);
            //console.log('getting users:', response.data[1].name);
            $scope.data = response.data;
        });

}]);

app.controller('newGigController', ['$scope', '$http', function($scope, $http){


    $scope.sendData = function(){
        console.log($scope.data);
        $http.post('/addGig', $scope.data)
            .then(function(response) {
                //console.log('getting myGigs:', response.data);
                //console.log('getting users:', response.data[1].name);
                //$scope.data = response.data;
            });
    };

    $scope.getData = function(){
        console.log($scope.data);
        $http.get('/getAllGigs')
            .then(function(response) {
                console.log('getting myGigs:', response.data);
                //console.log('getting users:', response.data[1].name);
                //$scope.data = response.data;
            });
    };



    $scope.reset = function(){
        $scope.group = '';
        $scope.eventTime = '';
        $scope.endTime = '';

    };


}]);



//We set up DB!