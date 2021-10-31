'use strict';

angular.module('eStore').
    factory('database',[function() {
        return {
            read:function(reference) {
                return firebase.auth().signInAnonymously().then(function() {
                    return firebase.database().ref(reference).once('value');
                }).then(function(snapshot) { //success
                    return snapshot.val();            
                }).catch(function(error) {
                    console.log('errorCode: '+ error.code);
                    console.log('error message: ' + error.message);
                })
            },
            create: function(reference, body, callback) {
                firebase.database().ref(reference).set(body, callback);
            },

            update:function(reference, body) {
                firebase.database().ref(reference).update(body, function(error) {
                    if(error) {
                        $scope.data.orderError = error;
                    } else { //success
                        $scope.orderKey = orderKey;
                        $scope.cartData = [];
                        changePath('/complete',$scope.cartData);
                    }
                })
            },
            //convert JSON to array
            parse: function() {
                return '';
            },

            keyGen: function() {
                return firebase.database().ref().push().key
            }
        }
    }])