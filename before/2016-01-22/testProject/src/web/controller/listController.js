define(['app'],function(app){

return app.registerController('listController',['$scope','commonService',function($scope, commonService){
    console.log("lazy Load");
    $scope.inputValue = commonService.getValue('vale')==undefined ? 1 : commonService.getValue('vale');
    
    $scope.click = function() {
        $scope.inputValue = $scope.inputValue + 1 ;
        commonService.setValue('vale',$scope.inputValue);

    }

    $scope.ngfun = {
        setValues:function(item){
            alert(item);
            console.log(item);
        }
    }

}]);

})