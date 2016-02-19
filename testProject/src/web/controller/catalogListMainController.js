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
     $scope._simpleConfig = {
            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars:[['FullScreen', 'Source', 'Undo', 'Redo','Bold','test']],
            //focus时自动清空初始化时的内容
            autoClearinitialContent:true,
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false
      }
    }]);
});