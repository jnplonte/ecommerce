ecommerceApp.factory('helpMe', [function() {
  var helpMe = {
    getParams : function(){
      var param = {};
      location.search.replace( new RegExp("([^?=&]+)(=([^&]*))?", "g"), function($0, $1, $2, $3) { param[$1] = $3; } );

      return param;
    },

    appendParamsToURL : function(key, value){
      var params = helpMe.getParams(), getStr = '?', url = '/';
      params[key] = value;

      for (var prm in params) {
          if (params.hasOwnProperty(prm)) {
              getStr += prm + '=' + params[prm] + '&';
          }
      }
      url = '/' + getStr.slice(0,-1) + window.location.hash;
      window.history.replaceState('', '', url);
    }
  };

  return helpMe;
}]);
