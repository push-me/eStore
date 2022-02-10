describe('category service', function() {
    var category;
    beforeEach(module('eStore'));

    beforeEach(inject(function(_category_) {
        category = _category_;
    }));

    it('changes category', function() {
        expect(category.getCategory()).toBe(null);
        category.setCategory('Chess');
        expect(category.getCategory()).toEqual('Chess');

    });
}) 