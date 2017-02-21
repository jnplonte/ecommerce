ecommerceApp.directive('productInfo', function(){
  return {
    restrict: 'EA',
    replace: true,
    scope:{
      products: '=?',
      type: '=?'
    },
    templateUrl: 'product-info/product-info.html',
    controller: 'productInfoController'
  };
}).controller('productInfoController', ['$scope', 'helpMe', function($scope, helpMe) {
  $scope.link = '';

  if($scope.products.status == 1){
    $scope.link = '#/product/'+$scope.products.id;
    $scope.active = true;
  }
}]);
