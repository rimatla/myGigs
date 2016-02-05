/**
 * Created by acoelho on 2/2/16.
 */
var app = angular.module('myGigsApp',['ngRoute']);

//angular routes

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


//controllers

app.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location){

    //Ajax call to get data from DB and send to home.html
    $http.get('/getAllGigs')
        .then(function(response) {
            console.log('Here is the home controller getting gigs:', response);
            //console.log('getting users:', response.data[1].name);
            $scope.data = response.data;
        });

}]);

app.controller('newGigController', ['$scope', '$http', function($scope, $http){

// $scope.sendData = event listener so page won't send empty data on load
    $scope.sendData = function(){
        console.log($scope.data);

        //form validation
        var formNotEmpty = document.forms["form"]["group"].value;
        if (formNotEmpty == null || formNotEmpty == "") {
            alert("Not so fast tiger! At least give us the Group Name.");
            return false;
        }


        // $http post that will be delivered by a route (index.js) into the DB
        // $scope.data acquires all inputs in one batch
        $http.post('/addGig', $scope.data)
            .then(function(response) {

                //console.log('getting myGigs:', response.data);
                //console.log('getting users:', response.data[1].name);
                //$scope.data = response.data;
            });
    };

    // routes delivers to client which just got data all the way from DB (we circled back!)
    $scope.getData = function(){

        console.log($scope.data);
        $http.get('/getAllGigs')
            .then(function(response) {
                console.log('getting myGigs:', response.data);
                //console.log('getting users:', response.data[1].name);
                //$scope.data = response.data;
            });
    };


// not working / not a priority
    $scope.reset = function(){
        $scope.group = '';
        $scope.eventTime = '';
        $scope.endTime = '';

    };


}]);



