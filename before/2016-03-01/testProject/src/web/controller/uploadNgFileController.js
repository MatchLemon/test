
define(['app','config'],function(app,config){

return app.registerController('ngFileUploadController',['$scope','commonService','Upload', '$timeout',function($scope, commonService, Upload, $timeout){
        $scope.path=config.catalogPath;
      $scope.uploadFiles = function(files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
       /* angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: 'http://localhost:8080/api/SZ/upload',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });*/
    };

     $scope.uploadAll = function() {

        angular.forEach($scope.files, function(file) {
            file.upload = Upload.upload({
                url: config.hostnameProt + '/api/SZ/upload?path=' + $scope.path,
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * 
                                         evt.loaded / evt.total));
            });
        });
    };
      $scope.uploadFile = function(file, errFiles) {
        $scope.errFiles = errFiles;
        file.upload = Upload.upload({
            url: config.hostnameProt + '/api/CLZ/video/saveVideo?path=' + $scope.path,
            file: file
        });

        file.upload.then(function (response) {
            $timeout(function () {
                file.result = response.data;
            });
        }, function (response) {
            if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * 
                                     evt.loaded / evt.total));
        });
       
    };
}]);
});