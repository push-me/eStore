'use strict';

angular.module('cart').
    factory('cart', function() {
        var cartData = [];
        return {
            addProduct:function(id, name, price) {
                var addedToExistingItem = false;
                for(var i=0;i<cartData.length;i++) {
                    if(cartData[i].id==id) {
                        addedToExistingItem = true;
                        cartData[i].count++;
                        break
                    }
                }

                if(!addedToExistingItem) {
                    cartData.push({
                        count:1,id:id,name:name,price:price
                    })
                }
            },
            removeProduct: function(id) {
                cartData.forEach(function(item,i) {
                    if (item.id == id) {
                        cartData.splice(i,1);
                    }
                })
            },

            getProducts: function() {
                return cartData;
            }
        }
    })