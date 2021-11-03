'use strict';

angular.module('database').
    factory('database',[function() {
        return {
            signIn:function(provider, data) {
                if(provider === 'email') {
                    return firebase.auth().signInWithEmailAndPassword(data.email, data.password);
                } else {//anonymous
                    return firebase.auth().signInAnonymously();
                }
                
            },
            read:function(reference) {
                    //return this.signIn.then(function() {
                    return firebase.database().ref(reference).once('value').then(function(snapshot) { //success
                        return snapshot.val();            
                    }).catch(function(error) {
                        console.log('errorCode: '+ error.code);
                        console.log('error message: ' + error.message);
                    })
            },
            create: function(reference, body, callback) {
                firebase.database().ref(reference).set(body, callback);
            },

            delete:function(reference) {
                return firebase.database().ref(reference).remove();      
            },

            update:function(reference, body,callback) {
                firebase.database().ref(reference).update(body, callback);
            },
            //wraps object values into array
            parse: function(data) {
                var arr=[];
                arr = Object.keys(data).map(function(key){return data[key]});
                return arr;
            },

            keyGen: function() {
                return firebase.database().ref().push().key;
            }
        }
    }])