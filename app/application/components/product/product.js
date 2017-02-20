ecommerceApp.directive('product', function(){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'product/product.html',
    controller: 'productController'
  };
}).controller('productController', ['$scope', function($scope) {
  console.log('RUNNING PRODUCTS ...');
}]);
