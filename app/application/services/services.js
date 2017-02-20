ecommerceApp.factory('apiHttpInterceptor', [ function() {
    var id = 0;
    return {
        request: function(config) {
            id++;
            config.requestID = id;
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.config.responseID = id;
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
}]);
