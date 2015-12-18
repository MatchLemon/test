define(['app'],function(app){
   return app.registerController('demoController',['$scope',function($scope){
        $scope.demoValue = 11;
    }])
});