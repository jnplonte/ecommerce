describe('api-http-interceptor', function() {
    var apiHttpInterceptor;

    beforeEach(module('ecommerce.app'));

    beforeEach(inject(function($injector) {
        apiHttpInterceptor = $injector.get('apiHttpInterceptor');
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
        it('should check if apiHttpInterceptor service exists', function(){
            expect( apiHttpInterceptor ).toBeDefined();
            expect( angular.isFunction(apiHttpInterceptor.request) ).toBeTruthy();
            expect( angular.isFunction(apiHttpInterceptor.response) ).toBeTruthy();

            checkObjectCount(apiHttpInterceptor, 0, 2);
        });
    });

    describe('functionalities', function() {
      it('should check if the apiHttpInterceptor increment of values work per api call', function(){
        apiHttpInterceptor.request({});
        expect( apiHttpInterceptor.response({"config":{}}).config.responseID ).toEqual(1);
      });
    });
});
