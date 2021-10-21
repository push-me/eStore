describe('cart service', function() {
    var cart;

    beforeEach(module('cart'));

    beforeEach(inject(function(_cart_) {
        cart = _cart_;
    }));

    it('adds a product and retrieve it from the collection', function() {
        cart.addProduct('id0','name',45);
        expect(cart.getProducts()).toEqual([{count:1,id:'id0',name:'name',price:45}]);
        cart.addProduct('id0','name',45);
        expect(cart.getProducts()).toEqual([{count:2,id:'id0',name:'name',price:45}]);

    });

    it('removes product', function() {
        cart.addProduct('id0','name',45);
        expect(cart.getProducts()).toEqual([{count:1,id:'id0',name:'name',price:45}]);
        cart.removeProduct('id0');
        expect(cart.getProducts()).toEqual([]);
    })
})