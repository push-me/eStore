describe('cartWidget directive', function() {
    var $compile;
    var $rootScope;
    var cart;
   

    beforeEach(module('cart', 'allTemplates','eStore'));
    


    beforeEach(inject(function(_$compile_,_$rootScope_,_cart_,_$templateCache_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        cart = _cart_;
        $templateCache = _$templateCache_;
    

    }));

    it('replace the element with the content', function() {
        var element = $compile('<cart-widget></cart-widget>')($rootScope);
        var template =$templateCache.get('cart/cartWidgetCompiled.html');
        $rootScope.$digest();
        expect(element.html()).toEqual(template);
    })

    describe('cartWidget directive controller', function() {
        var $rootScope;
        var el;
        var cart;
        var controller;
        var scope;
        beforeEach(inject(function(_$rootScope_,_$compile_,_cart_){
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            cart = _cart_;
            el=$compile('<cart-widget></cart-widget>')($rootScope);
            $rootScope.$digest();
            controller = el.controller('cartWidget');
            scope = el.isolateScope() || el.scope();
        }));

        

        it('creates a cartData property', function() { 
                cart.addProduct('id0','vuu',1);
                expect(scope.cartData).toEqual([{count:1,id:'id0',name:'vuu',price:1}]);
                cart.addProduct('id0','vuu',1);
                expect(scope.cartData).toEqual([{count:2,id:'id0',name:'vuu',price:1}]);      
        });

        it('countTotal method' , function() {
            expect(scope.countTotal()).toEqual(0);
            cart.addProduct('id0','vuu',1);
            cart.addProduct('id0','vuu',1);
            expect(scope.countTotal()).toEqual(2);
            cart.addProduct('id1','gguu',4);
            expect(scope.countTotal()).toEqual(6);
        });

        it('itemCount method', function() {
            expect(scope.itemCount()).toEqual(0);
            cart.addProduct('id0','vuu',1);
            cart.addProduct('id0','vuu',1);
            expect(scope.itemCount()).toEqual(2);
            cart.addProduct('id1','vuu',5);
            expect(scope.itemCount()).toEqual(3);
        });
        
    });
});