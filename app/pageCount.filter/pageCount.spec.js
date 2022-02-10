describe('pageCount', function() {
    var $filter;
    
    beforeEach(module('eStore'));
    beforeEach(inject(function(_$filter_) {
        $filter = _$filter_;
    }));

    it('count pages', function() {
        var input = [1,2,3,4];
        var pageCount = $filter('pageCount');  
        expect(pageCount(input,3)).toEqual([1,2]);
        
    });

})