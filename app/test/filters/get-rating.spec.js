describe('get-rating', function() {
    var getRating;

    beforeEach(module('ecommerce.app'));

    beforeEach(inject(function($filter) {
        getRating = $filter('getRating');
    }));

    describe('functionalities', function() {
      it('should check the correct rating stars', function() {
          expect(getRating(3).toString()).toEqual(' *  *  * ');
      });
    });
});
