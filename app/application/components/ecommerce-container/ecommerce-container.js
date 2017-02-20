ecommerceApp.directive('ecommerceContainer', function(){
  return {
    restrict: 'AE',
    replace: true,
    scope:{
      apiPath: '=?'
    },
    templateUrl: 'ecommerce-container/ecommerce-container.html',
    controller: "ecommerceController"
  };
}).controller('ecommerceController', ['$scope', 'appConfig', function($scope, appConfig) {
  appConfig.apiPath = $scope.apiPath;
}]);
