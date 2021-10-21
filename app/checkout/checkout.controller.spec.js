describe('checkoutController', function() {
    var scope={};
    var controller;
    var cart;
    beforeEach(module('cart'));
    beforeEach(module('eStore'));

    beforeEach(inject(function($rootScope,$controller,_cart_) {
        scope = $rootScope.$new();
        cart = _cart_;
        controller = $controller('checkoutController', {$scope:scope,cart:cart});
    }));

    it('should take data from the cart', function() {
        expect(scope.cartData).toEqual([]);
        cart.addProduct('id0','name',45);
        expect(scope.cartData).toEqual([{count:1,id:'id0',name:'name',price:45}]);
    });

    it('counts total price', function() {
        expect(scope.cartData).toEqual([]);
        cart.addProduct('id0','name',45);
        cart.addProduct('id1','name2',45);
        expect(scope.countTotal()).toEqual(90);
        cart.addProduct('id0','name',45);
        expect(scope.countTotal()).toEqual(135);

    });

    it('should remove product', function() {
        expect(scope.cartData).toEqual([]);
        cart.addProduct('id0','name',45);
        cart.addProduct('id1','name2',45);
        scope.remove('id0');
        expect(scope.cartData).toEqual([{count:1,id:'id1',name:'name2',price:45}]);
    })

    
})