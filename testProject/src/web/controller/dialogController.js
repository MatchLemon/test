define(['app'],function(app){
    return app.registerController('dialogController',['$scope','$modalInstance',function($scope, $modalInstance){

        $scope.close = function(){
            $modalInstance.close("Success Close");
        }

        }]);
});