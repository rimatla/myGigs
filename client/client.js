/**
 * Created by acoelho on 2/2/16.
 */
var app = angular.module('myGigsApp',['ngRoute','ngCookies'])
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


//[][][][][][][][][]]][]][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]][][][][][][[][][][][][][][]][][][][][][][][][][][][[][][][
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]]][]      Home Controller          ][][][][][[]][]][][][]][][][][][][][][]][][][][][][][[][][][][]

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

    //Delete Gig
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
        //show alert ask Nicky about it!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(numSelected == 0){
            alert('Please select one gig to view its details.' );
        }
        else if(numSelected > 1){
            alert('Please select one gig at a time to view its details.' );
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
}]);




//[][][][][][][][][]]][]][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]][][][][][][[][][][][][][][]][][][][][][][][][][][][[][][][
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]]][]      New Gig Controller          ][][][][][[]][]][][][]][][][][][][][][]][][][][][][][[][][][][]

app.controller('newGigController', ['$scope', '$http','$location','GigService', function($scope, $http,$location,GigService){

// $scope.sendData = event listener so page won't send empty data on load of $http.post
    $scope.saveData = function(){
        console.log($scope.data);

        //Form Validation
        var formNotEmpty = document.forms["form"]["group"].value;
        if (formNotEmpty == null || formNotEmpty == "") {
            alert("Not so fast tiger! At least give us the Group Name.");
            return false;
        };

        //Triggering POST call from Factory
        GigService.postGigs($scope.data);
};

}]);


//[][][][][][][][][]]][]][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]][][][][][][[][][][][][][][]][][][][][][][][][][][][[][][][][][][][][][]
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]]][]      Detailed Gig Controller          ][][][][][[]][]][][][]][][][][][][][][]][][][][][][][[][][][][]

app.controller('detailedGigController', ['$scope', '$http', '$location', 'GigService','$cookies', function($scope, $http, $location, GigService,$cookies){

    $scope.data = GigService.getSelectedGig();



    //View Selected Gig
    $scope.viewSelectedGigs = function(){
        console.log('This is the gig id');
        for(var j = 0; j < $scope.gigs.length; j++){
            if($scope.gigs[i].selected){
                GigService.setSelectedGig($scope.gig[i].selected);
            }
        }
    };




    //Update Gig
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
}]);





//[][][][][][][][][]]][]][][][][][][][][][][][][][][][][][][][][][][][]][][][][][][][][][]][][][][][][[][][][][][][][]][][][][][][][][][][][][[][][][
//[][][][][][][][][][][][][][][][][][][][][][][][][][][]]][]      Factory              ][][][][][[]][]][][][]][][][][][][][][]][][][][][][][[][][][][]

app.factory('GigService', ['$http','$location','$cookies',function($http,$location,$cookies) {

    var data = { };

    var selectedGig = {};

    function setSelectedGig(newSelection){
        selectedGig = newSelection;

        //$cookies stringify to keep data on reload
        //console.log(newSelection);
        $cookies.put('selection',JSON.stringify(newSelection));
    }


    function getSelectedGig(){
        //return selectedGig;

        //$cookies parse to keep data on reload
        //console.log("Getting:", JSON.stringify($cookies.get('selection')));
        return JSON.parse($cookies.get('selection'));
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