describe('pagination service', function() {
    var pagination;
    beforeEach(module('eStore'));

    beforeEach(inject(function(paginationService) {
        pagination = paginationService;
    }));

    it('get items per page', function() {
        expect(pagination.getItemsPerPage()).toEqual(3);
    });
}) 