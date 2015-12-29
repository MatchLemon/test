define(['service/baseService','angular','md5'], function(module, angular, md5){
    return module.factory('commonService', ['$http',function($http){
        var salt = 'qwer';
        return {
                    getValue:function(key){
                        var value = window.sessionStorage[key]
                        return angular.fromJson(value);
                    },
                    setValue:function(key, value){
                        window.sessionStorage[key] = angular.toJson(value);;
                    },
                    getUser:function(){
                        return this.getValue("user");
                    },
                    md5:function(content){
                        return md5(md5(content) + salt);
                    }
        };              
    }])

})