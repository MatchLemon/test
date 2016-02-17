define(['app'],function(app){
   return app.registerController('catalogListMainController',['$scope', '$location', function($scope, $location){
    $scope.tabs = [
    {
        name:"章节",
        value:0
    },
     {
        name:"评论",
        value:1
    },
     {
        name:"问答",
        value:2
    }];

    $scope.catalogListPart = true;
    $scope.commentPart = false;
    $scope.answerPart = false;
    $scope.changTab = function (){
        curTab = parseInt($location.search().active == undefined ? 0 : $location.search().active );
        curTab = (!isNaN(curTab) ? curTab : 0)
        if (curTab == 0) {
            $scope.catalogListPart = true;
            $scope.commentPart = false;
            $scope.answerPart = false;
        } else if (curTab == 1) {
            $scope.catalogListPart = false;
            $scope.commentPart = true;
            $scope.answerPart = false;

        } else {
            $scope.catalogListPart = false;
            $scope.commentPart = false;
            $scope.answerPart = true;
        }
    }

    $scope.changTab();

    }]);
});