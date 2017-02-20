var ecommerceApp = angular.module('ecommerce.app', ['ngRoute', 'ngSanitize']);

ecommerceApp.value("appConfig", {});

angular.element(document).ready(function(){
    var el = $('ecommerce-container');

    if( el.length >= 1 ){
      ecommerceApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider){
          $locationProvider.html5Mode({
            enabled: false,
            requireBase: true,
            rewriteLinks: true
          }).hashPrefix('');

          $httpProvider.interceptors.push('apiHttpInterceptor');
          $httpProvider.useApplyAsync(true);

          $routeProvider.when('/product/:product_id', {
              templateUrl: 'product/product.html',
              controller: 'productController'
          }).when('/', {
              templateUrl : 'all-products/all-products.html',
              controller: 'allProductsController'
          }).otherwise({
              redirectTo: '/'
          });
      }]);

      angular.bootstrap(document, ['ecommerce.app']);
    }
});
