define(['app'],function(app){
   return app.registerController('tabsController',['$scope', '$location',function($scope, $location){

    $scope.tabs = [
    {
        name:"JAVA",
        value:0
    },
     {
        name:"C++",
        value:1
    },
     {
        name:"api",
        value:2
    }
    ];
    $scope.tabs1Show = true;
    $scope.tabs2Show = false;
    $scope.tabs3Show = false;
     
   
    $scope.changTab = function (){
        curTab = parseInt($location.search().active == undefined ? 0 : $location.search().active );
        curTab = (!isNaN(curTab) ? curTab : 0)
        if (curTab == 0) {
            $scope.tabs1Show = true;
            $scope.tabs2Show = false;
            $scope.tabs3Show = false;
        } else if (curTab == 1) {
            $scope.tabs1Show = false;
            $scope.tabs2Show = true;
            $scope.tabs3Show = false;

        } else {
            $scope.tabs1Show = false;
            $scope.tabs2Show = false;
            $scope.tabs3Show = true;
        }
    }

    $scope.changTab();
    }])
});