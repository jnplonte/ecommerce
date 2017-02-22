ecommerceApp.factory('apiHttpInterceptor', [ function() {
    var id = 0;
    return {
        request: function(config) {
            id++;
            config.isReady = true;
            config.requestID = id;
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            response.isReady = false;
            response.config.responseID = id;
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
}]);
