/**
 * Created by acoelho on 2/2/16.
 */
var app = angular.module('myGigsApp',['ngRoute'])
.directive("formatDate", function(){
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, detailedGigController) {
            detailedGigController.$formatters.push(function(modelValue){
                return new Date(modelValue);
            })
        }
    }
});
//angular routes

app.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        .when('/newGig', {
            templateUrl: 'views/newGig.html',
            controller: 'newGigController'
        })
        .when('/detailedGig', {
            templateUrl: 'views/detailedGig.html',
            controller: 'detailedGigController'
        });
    $locationProvider.html5Mode(true);
}]);



//HOME CONTROLLER
app.controller('HomeController', ['$scope', '$http', '$location', function($scope, $http, $location){
        $scope.data = [ ];
    //Ajax call to get data from DB and send to home.html
    var fetchGigs = function() {
        $http.get('/getAllGigs')
            .then(function (response) {
                //console.log('Here is the home controller getting gigs:', response);
                $scope.gigs = response.data;
            });
    };
    $scope.deleteSelectedGigs = function(){
        //console.log('This is the gig id', gig);

        for(var i = 0; i < $scope.gigs.length; i++){
            if($scope.gigs[i].toRemove){
                $http.delete('/gigDelete' + $scope.gigs[i]._id)
                    .then(fetchGigs);
            }
        }
    };
    fetchGigs();

}]);




//NEW GIG CONTROLLER
app.controller('newGigController', ['$scope', '$http','$location', function($scope, $http,$location){

// $scope.sendData = event listener so page won't send empty data on load of $http.post
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
                if(response.status === 200) {
                    $location.path('/home');
                } else{
                    console.log('error');
                }

            });
    };


}]);


//DETAILED GIG  CONTROLLER
app.controller('detailedGigController', ['$scope', '$http', '$location', function($scope, $http, $location){

    $scope.data = [];
    var fetchingMoreGigs = function() {
        $http.get('/getAllGigs')
            .then(function (response) {
                //console.log('Here is the home controller getting gigs:', response);
                $scope.gigs = response.data;
                $scope.data.group = $scope.gigs[0].group;
                $scope.data.address = $scope.gigs[0].address;
                $scope.data.eventTime = $scope.gigs[0].eventTime;
                $scope.data.endTime = $scope.gigs[0].endTime;
                $scope.data.goneUntil = $scope.gigs[0].goneUntil;
                $scope.data.todo= $scope.gigs[0].todo;
                $scope.data.pay = $scope.gigs[0].pay;
                $scope.data.yesCharts= $scope.gigs[0].yesCharts;
                $scope.data.noCharts = $scope.gigs[0].noCharts;
                $scope.data.yesPDiem = $scope.gigs[0].yesPDiem;
                $scope.data.noPDiem = $scope.gigs[0].noPDiem;

            });
    };
    $scope.viewSelectedGigs = function(){
        //console.log('This is the gig id', gig);
        for(var j = 0; j < $scope.gigs.length; j++){
            if($scope.gigs[i].toSelect){
                $http.get('/getAllGigs' + $scope.gigs[i]._id)
                    .then(fetchingMoreGigs);
            }
        }
    };
    fetchingMoreGigs();

}]);











//trash
//console.logs
//console.log('getting users:', response.data[1].name);
//$scope.data = response.data;
//console.log('getting myGigs:', response.data);
//console.log('getting users:', response.data[1].name);
//$scope.data = response.data;
//console.log('getting users:', response.data[1].name);