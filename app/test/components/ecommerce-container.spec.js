describe('ecommerce-container', function() {
    var ecommerceContainer, compile, scope;

    beforeEach(module('ecommerce.app'));

    beforeEach(inject(function($rootScope, $compile) {
        scope   = $rootScope.$new();
        compile = $compile;
    }));

    function compileDirective() {
        var tpl = '<ecommerce-container api-path="\'http://localhost:3001\'" ng-cloak></ecommerce-container>';
        ecommerceContainer = compile(tpl)(scope);
        scope.$digest();
    }

    describe('initialization', function() {
        beforeEach(inject(function(){
           compileDirective();
        }));

        it('should if the ecommerceContainer exists', function() {
            expect( ecommerceContainer ).toBeDefined();
            expect( ecommerceContainer.html() ).toContain('ngView');
        });
    });
});
