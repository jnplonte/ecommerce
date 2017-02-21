ecommerceApp.directive('allProducts', function(){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'all-products/ecommerce-products.html',
    controller: 'allProductsController'
  };
}).controller('allProductsController', ['$scope', '$http', 'appConfig', 'helpMe', function($scope, $http, appConfig, helpMe) {
  var brandId = null;
  $scope.productsList = [];
  $scope.pageType = 'all-products-page';

  $scope.params = helpMe.getParams();

  if(typeof($scope.params.brandId) != 'undefined'){
    brandId = $scope.params.brandId;
  }

  callProductsApi(brandId);

  $scope.$on('updateProducts', function (event, brandId) {
    callProductsApi(brandId);
  });

  function callProductsApi(brandId){
    var additionalParam = '';

    if(brandId){
      additionalParam = 'brandId='+encodeURI(brandId);
    }
    $http.get(appConfig.apiPath + '/api/products?' + additionalParam).then(function successCallback(response) {
      $scope.productsList = response.data;
    }, function errorCallback(response) {
      $scope.productsList = [];
    });
  }
}]);
