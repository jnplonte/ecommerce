ecommerceApp.filter("getRating", ['$sce', function ($sce) {
    return function (rating) {
        var ratingVal = '';
        for (var i = 0; i < rating; i++) {
          ratingVal = ratingVal + ' * ';
        }
        return $sce.trustAsHtml(ratingVal);
    };
}]);
