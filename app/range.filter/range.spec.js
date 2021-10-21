describe('rangeFilter', function() {
    var $filter;
    
    beforeEach(module('eStore'));
    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    it('limit the input array, selected page is 1', function() {
        var input = ['one','two','three','four'];
        var range = $filter('range');  
        expect(range(input,1,3)).toEqual(['one','two','three']);
        
    });

    it('limit the input array, selected page is 2', function() {
        var input = ['one','two','three','four'];
        var range = $filter('range');
        expect(range(input,2,3)).toEqual(['four']);
    });
})