(function() {
    'use strict';

    angular
        .module('belchApp')
        .controller('breweryController', breweryController);

    breweryController.$inject = ['$log', 'breweryFactory', 'NgMap', '$rootScope'];

    /* @ngInject */
    function breweryController($log, breweryFactory, NgMap, $rootScope) {
        var vm = this;
        vm.title = 'breweryController';

        /*DEFINITIONS*/
        /*Filter search*/
        vm.searchTerm = ''; //sets a blank string to hold a breweryname

        /* Pagination Controllers*/
        vm.pageSize = 6; //displays 6 items per page
        vm.pageIndex = 1; //indicates the index of a certain page - default start at 1
        vm.maxSize = 6; //indicates the number of indexes to display in the pagination element - triggers ellipses

        /*MAP Controllers*/
        vm.breweryInfoWindow = {}; //holds breweries for map info
        //vm.showMap = false;

        /*Add Brewery Controllers*/
        vm.showForm = false;
        vm.brewer = {};

        /*Google Places*/
        vm.showSearch = false;
        vm.place = {}; //holds places info
        vm.types = "['establishment']"; //holds types of search location

        vm.showComments = false; //shows and hides comments upon click


        /////////////////

        /*FUNCTIONS*/

        //Initializes the Google Map
        initialize();

        function initialize() {
            NgMap.getMap({ id: 'map' }).then(function(map) {
                $rootScope.map = map;

            });
        };

        //Shows info window for map markers
        vm.showBrewery = function(event, brewer) {
            vm.breweryInfoWindow = brewer;
            $rootScope.map.showInfoWindow('breweryInfo', brewer.breweryname);
         
        };

        //Initializes and searches for places
        vm.placeChanged = function() {
            vm.place = this.getPlace();
            console.log('place', vm.place);
            console.log('location', vm.place.geometry.location);
            console.log('reviews', vm.place.reviews);
            $rootScope.map.setCenter(vm.place.geometry.location);
        };

        //Grabs a list of breweries from the database
        //Passes on pageSize, pageIndex, and searchTerm into the function to display data by bits
        vm.getBreweries = function() {
            breweryFactory.brewersPage(vm.pageSize, vm.pageIndex, vm.searchTerm)
                .then(
                    function(response) {
                        vm.paginatedResponse = response;
                    },
                    function(error) {
                        $log.error('Failure getting breweries', error);
                    });
        };

        //Calls the getBreweries function
        vm.getBreweries();
        

        //Adds a new brewery
        vm.newBrewery = function() {
            //Sets an array for location grabbed from Google Places
            var newLatLng = new Array(2);
            newLatLng[1] = vm.place.geometry.location.lat();
            newLatLng[0] = vm.place.geometry.location.lng();
            vm.brewer.brewerylocation = newLatLng;
            console.log(vm.place.geometry.location.lng() + ',' + vm.place.geometry.location.lat()); //prints location in the console
            breweryFactory.addBrewer(vm.brewer)
                .then(
                    function(response) {
                        console.log('brewers are we', response.data);
                    },
                    function(err) {
                        $log.error('Failure adding a new brewery', error);
                    });
        };

    } //end of breweryController function
})(); //end of main function
