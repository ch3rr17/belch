(function() {
    'use strict';

    angular
        .module('belchApp')
        .factory('breweryFactory', breweryFactory);

    breweryFactory.$inject = ['$http', '$q', '$rootScope'];

    /* @ngInject */
    function breweryFactory($http, $q, $rootScope) {
        var service = {
            brewersPage: brewersPage,
            addBrewer: addBrewer
        };


        return service;

        ////////////////

        //Grabs a list of breweries and paginates item by index
        function brewersPage(pageSize, pageIndex, term) {
            var defer = $q.defer();

            $http.get('/brewers/' + pageSize + '/' + pageIndex + '/' + (term || ''))
                .then(
                    function(response) {
                        defer.resolve(response.data);
                        console.log(response);
                    },
                    function(err) {
                        defer.reject(err.data.message);
                    }
                );
            return defer.promise;
        }

        //Adds a brewery to the database
        function addBrewer(brewer){
            var defer = $q.defer();

            $http.post('/brewers', brewer)
                    .then(
                         function(response){
                            defer.resolve(response);
                            console.log(response);
                         },
                         function(err){
                            defer.reject(err.data.message);
                         }   
                    );
            return defer.promise;
        }


    }
})();
