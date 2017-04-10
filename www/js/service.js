(function(){
    'use strict';

    angular
        .module('starter.controllers')
        .service('HttpRequest', HttpRequest)

    /** @ngInject */
    HttpRequest.$inject = ['$http', '$q'];
    function HttpRequest($http, $q){

        this.GetHttpRequest = getHttpRequest;
        this.PostHttpRequest = postHttpRequest;
        this.DeleteHttpRequest = deleteHttpRequest;
        this.PutHttpRequest = putHttpRequest;

        function getHttpRequest(url){
            var defer = $q.defer();

            $http.get(url).then(function(success){
                defer.resolve(success);
            }, function(error){
                defer.reject(error);
            });

            return defer.promise;
        }

        function postHttpRequest(url, data){
            var defer = $q.defer();

            var req = {
                method: 'POST',
                url: url,
                headers: {
                'Content-Type': "application/json"
                },
                data: data
            }

            $http(req).then(function(success){
                defer.resolve(success);
            }, function(error){
                defer.reject(error);
            });

            return defer.promise;
        }

        function deleteHttpRequest(){
            alert('yep! its login service');
        }

        function putHttpRequest(){
            alert('yep! its login service');
        }
    }

}());