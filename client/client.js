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
//[][][][][][][][][]]][]][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]][][][][][][[][][][][][][][]][][][][][][][][][][][][[][][][
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]]][]      Angular Routes                    ][][][][][[]][]][][][]][][][][][][][][]][][][][][][][[][][][][]


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
app.controller('HomeController', ['$scope', '$http', '$location', 'GigService', function($scope, $http, $location, GigService){
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
            if($scope.gigs[i].selected){
                $http.delete('/gigDelete' + $scope.gigs[i]._id)
                    .then(fetchGigs);
            }
        }
    };
    fetchGigs();
    $scope.viewSelectedGigs = function(){
        console.log('This is the gig id');
        var numSelected = getNumSelected();

        if(numSelected > 1){
            //show alert
            alert("select just 1");
        } else {
            for(var j = 0; j < $scope.gigs.length; j++){
                if($scope.gigs[j].selected){
                    GigService.setSelectedGig($scope.gigs[j]);
                    console.log(GigService.getSelectedGig());
                    $location.path('detailedGig');
                }
            }
        }


        function getNumSelected(){
            var numFound = 0;
            for(var j = 0; j < $scope.gigs.length; j++){
                if($scope.gigs[j].selected){
                    numFound++;
                }
            }
            return numFound;
        }

    };
    //$scope.sortDate =

}]);




//NEW GIG CONTROLLER
app.controller('newGigController', ['$scope', '$http','$location','GigService', function($scope, $http,$location,GigService){


// $scope.sendData = event listener so page won't send empty data on load of $http.post
    $scope.saveData = function(){
        console.log($scope.data);

        //form validation
        var formNotEmpty = document.forms["form"]["group"].value;
        if (formNotEmpty == null || formNotEmpty == "") {
            alert("Not so fast tiger! At least give us the Group Name.");
            return false;
        };

        GigService.postGigs($scope.data);
        // $http post that will be delivered by a route (index.js) into the DB
        // $scope.data acquires all inputs in one batch
        //$http.post('/addGig', $scope.data)
        //.then(function(response) {
        //    if(response.status === 200) {
        //        $location.path('/home');
        //    } else{
        //        console.log('error');
        //    }
        //
        //});
};


}]);


//DETAILED GIG  CONTROLLER
app.controller('detailedGigController', ['$scope', '$http', '$location', 'GigService', function($scope, $http, $location, GigService){

    $scope.data = GigService.getSelectedGig();

    console.log(GigService.getSelectedGig());

    //$scope.$watch('gig.toRemove', function(ngsDiff){
    //    $scope.id = ngsDiff;
    //});
    //view selected gig
    $scope.viewSelectedGigs = function(){
        console.log('This is the gig id');
        for(var j = 0; j < $scope.gigs.length; j++){
            if($scope.gigs[i].selected){
                GigService.setSelectedGig($scope.gig[i].selected);
            }
        }
    };


    //EDIT BUTTON

    $scope.updateData = function(){
        console.log($scope.data);

        $http.post('/updateGig', $scope.data)
            .then(function(response) {
                if(response.status === 200) {
                    $location.path('/home');
                } else{
                    console.log('error');
                }

            });
    };
    //fetchingMoreGigs();
}]);


//[][][][][][][][][]]][]][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]][][][][][][[][][][][][][][]][][][][][][][][][][][][[][][][
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]]][]      Factory              ][][][][][[]][]][][][]][][][][][][][][]][][][][][][][[][][][][]

app.factory('GigService', ['$http','$location',function($http,$location) {

    var data = {

    };

    var selectedGig = {};

    function setSelectedGig(newSelection){
        selectedGig = newSelection;
    }

    function getSelectedGig(){
        return selectedGig;
    }

    var postGigs = function(data){
        $http.post('/addGig',data)
            .then(function(response) {
                if(response.status === 200) {
                    $location.path('/home');
                } else {
                    console.log('error');
                }
            });
    };
    return {
        data: data,
        postGigs: postGigs,
        setSelectedGig: setSelectedGig,
        getSelectedGig: getSelectedGig,
        selectedGig: selectedGig
    };

}]);




//$scope.data


//trash
//console.logs
//console.log('getting users:', response.data[1].name);
//$scope.data = response.data;
//console.log('getting myGigs:', response.data);
//console.log('getting users:', response.data[1].name);
//$scope.data = response.data;
//console.log('getting users:', response.data[1].name);