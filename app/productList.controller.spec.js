describe('productListControllerTest', function(){
    
    var scope={};
    var controller;
    var cart;
    var productListActiveClass;

    
    beforeEach(module('cart'));
    beforeEach(module('eStore'));
   
    beforeEach(inject(function($rootScope,$controller,_cart_,_productListActiveClass_) {
        scope = $rootScope.$new();
        cart=_cart_;
        controller = $controller('productListController', { $scope : scope, cart:cart});
        productListActiveClass = _productListActiveClass_;

    }));

  
     it('creates a variable', function() {
         expect(scope.totalPages).toEqual(3);
         expect(scope.selectedPage).toEqual(1);
     });

     it('should select a category', function() {
        var data=[
            {category:'product one'},
            {category:'product two'}
        ];

        expect(scope.categoryFilterFn(data[0])).toBeTruthy();
        scope.selectCategory('product two');
        expect(scope.categoryFilterFn(data[0])).toBeFalsy();
         
     });

     it('select page', function() {
        scope.selectedPage=1;
        expect(scope.selectedPage).toEqual(1);
        scope.selectPage(2);
        expect(scope.selectedPage).toEqual(2);
     });

     it('it should set class', function() {
         //when argument is number
        scope.selectedPage=2;
        expect(scope.setSelectedClass(2)).toEqual('btn btn-block btn-sm '+ productListActiveClass);
        expect(scope.setSelectedClass(1)).toEqual('btn btn-light btn-sm');
        //when argument is a string
        scope.selectCategory('football');
        expect(scope.setSelectedClass('football')).toEqual('btn btn-block btn-lg '+ productListActiveClass);
        expect(scope.setSelectedClass('diving')).toEqual('btn btn-block btn-light btn-lg');
     });

     it('add to cart', function() {
        var product = {
            count:1,
            id:1,
            name:'ball',
            price:'45$'
           
        };

        scope.addToCart(product);
        expect(cart.getProducts()[0]).toEqual(product);
     });

})