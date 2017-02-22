describe('help-me', function() {
    var helpMe;

    beforeEach(module('ecommerce.app'));

    beforeEach(inject(function($injector) {
        helpMe = $injector.get('helpMe');
    }));

    function checkObjectCount(mainObject, stringVal, funcVal){
      var string = 0, func = 0;
      _.each(mainObject, function(row){
        if(angular.isFunction(row)){ func++; }else{ string++; }
      });

      expect( Object.keys(mainObject).length ).toEqual(stringVal + funcVal);
      expect( string ).toEqual(stringVal);
      expect( func ).toEqual(funcVal);
    }

    describe('initialization', function() {
        it('should check if helpMe service exists', function(){
            expect( helpMe ).toBeDefined();
            expect( angular.isFunction(helpMe.getParams) ).toBeTruthy();

            checkObjectCount(helpMe, 0, 1);
        });
    });

    describe('functionalities', function() {
      it('should check if the getParams service works', function(){
        expect( helpMe.getParams() ).toEqual({});
      });
    });
});
