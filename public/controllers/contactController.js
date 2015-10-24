var contactsApp = angular.module('contactsApp', []);
contactsApp.controller('contactsApp', ['$scope', '$http', function($scope, $http) {

    $http.get('/contactList').success(function(response){
        $scope.contactList= response;
    });

    $scope.addContact = function(){
        console.log($scope.contact);
        $http.post('/contactList', $scope.contact).success(function(response){
            console.log(response);
            $scope.contactList.push($scope.contact);
        });
    }

    $scope.remove = function(contact){
        console.log(contact._id);
        $http.delete('/contactList/' +contact._id);
        removeObjectFromContactList(contact);
    }

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/contactList/' +id).success(function(response){
            $scope.contact = response;
        });
    }

    $scope.update = function(contact){
        $http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(res){
            contact = res;
            console.log('dosao do successa', res);
        });
    }


    function removeObjectFromContactList(obj){
        var index = $scope.contactList.indexOf(obj);
        $scope.contactList.splice(index, 1);
    }
}]);