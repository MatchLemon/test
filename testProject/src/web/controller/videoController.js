define(['app','./video'],function(app,video){

    return app.registerController('videoController',['$scope','commonService',function($scope, commonService){

        $scope.currentTime1 = function (sd){
            console.log(sd);
        }

    }]);
});