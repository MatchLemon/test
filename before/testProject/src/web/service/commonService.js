define(['service/baseService','angular'], function(module, angular){
    return module.factory('commonService', ['$http',function($http){
        return {
                    getValue:function(key){
                        var value = window.sessionStorage[key]
                        return angular.fromJson(value);
                    },
                    setValue:function(key, value){
                        window.sessionStorage[key] = angular.toJson(value);;
                    }
        };
    }])

})