describe('returnUniqueFilter' , function(){
    var $filter;
    beforeEach(module('returnUnique'));
    beforeEach(inject(function(_$filter_){
        $filter=_$filter_;
    }));

    it('should create a unique collection', function(){
        var returnUnique = $filter('returnUnique');
        var mockData=[
            {category:'soccer'},
            {category:'basketball'},
            {category:'chess'},
            {category:'soccer'},
            {category:'tennis'},
            {category:'tennis'},
            {category:'soccer'},
        ];

        expect(returnUnique(mockData,'category')).toEqual(['soccer','basketball','chess','tennis']);
        
    });
})