ecommerceApp.directive('filterBrand', [function(){
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: 'filter-brand/filter-brand.html',
    controller: 'filterBrandController',
    link: function($scope, $elm, $attrs) {
      $($elm).find('.brand-select').on('change', function(ev){
        var brandId = $(this).find(":selected").val();
        $scope.$broadcast('updateProducts', brandId);
      });
    }
  };
}]).controller('filterBrandController', ['$scope', '$http', 'appConfig', 'helpMe', function($scope, $http, appConfig, helpMe) {
  $scope.brandsList = [];
  $scope.params = helpMe.getParams();
  $http.get(appConfig.apiPath + '/api/brands').then(function successCallback(response) {
    if(typeof($scope.params.brandId) != 'undefined'){
      _.each(response.data, function(row, i){
        if($scope.params.brandId == row.id){
          row.selected = true;
        }
      });
    }
    $scope.brandsList = response.data;
  }, function errorCallback(response) {
    console.warn(response.data);
  });
}]);
