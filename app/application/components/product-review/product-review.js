ecommerceApp.directive('productReview', function(){
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      productId: '=?'
    },
    templateUrl: 'product-review/product-review.html',
    controller: 'productReviewController'
  };
}).controller('productReviewController', ['appConfig', '$scope', '$http', function(appConfig, $scope, $http) {
  $scope.userReviewFinal = {};
  $scope.errorEmail = false;
  $scope.errorReviewPost = false;

  $scope.submitReview = function(userReview) {
    if ($scope.reviewForm.$valid) {
      $scope.userReviewFinal = angular.copy(userReview);
      checkUserEmail();
    }
  };

  function checkUserEmail(){
    if(typeof($scope.userReviewFinal.email) != 'undefined'){
      $http.get(appConfig.apiPath + '/api/user/' + encodeURI($scope.userReviewFinal.email.trim())).then(function successCallback(response) {
        if(response.data.length == 1 && response.data[0].type == '0'){
          $scope.userReviewFinal.user_id = response.data[0].id;
          addReview();
        }else{
          $scope.errorEmail = true;
        }
      }, function errorCallback(response) {
        $scope.errorEmail = true;
      });
    }else{
      $scope.errorEmail = true;
    }
  }

  function addReview(){
    $http.post(appConfig.apiPath + '/api/review/' + encodeURI($scope.productId), $scope.userReviewFinal, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: function(data){ return $.param(data); }
    }).then(function(){
      $scope.errorReviewPost = false;
      $scope.$emit('updateProduct', $scope.productId);
    }, function(){
      clearForm();
    });
  }

  function clearForm(){
    $scope.reviewForm.$setPristine();
    $scope.reviewForm.$setUntouched();
    $scope.userReview = {};
    $scope.errorEmail = false;
    $scope.errorReviewPost = true;
  }
}]);
