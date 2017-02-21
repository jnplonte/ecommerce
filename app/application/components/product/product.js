ecommerceApp.directive('product', function(){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'product/product.html',
    controller: 'productController'
  };
}).controller('productController', ['appConfig', '$scope', '$routeParams', '$window', '$http', function(appConfig, $scope, $routeParams, $window, $http) {
  $scope.goBack = function(){
    $window.history.back();
  };

  callProductApi($routeParams.product_id);

  $scope.$on('updateProduct', function (event, productId) {
    callProductApi(productId);
  });

  $scope.productList = [];
  $scope.pageType = 'product-page';

  function callProductApi(productId){
    if(typeof(productId) != 'undefined'){
      $http.get(appConfig.apiPath + '/api/product/' + encodeURI(productId)).then(function successCallback(response) {
        $scope.productList = response.data;
      }, function errorCallback(response) {
        $scope.productsList = [];
      });
    }
  }
}]);
