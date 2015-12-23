define(['app'],function(app){
    return app.registerController('uploadController',['$scope','$http',function($scope, $http){
        $scope.onFileSelect = function($files) {    //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                
            }
        }

        $scope.upload=function(files){
            console.log(files);
            $scope.files = files;
            if (!$scope.files.length) {
              return;
            }
        /*var file, _i, _len;*/
       /* vm.file = '';
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          fileName = file + file.name + ';';
        }*/
       reader = new FileReader();
        reader.readAsDataURL($scope.files[0]);
            reader.onload = function(loadEvent) {
              
                $scope.image = loadEvent.target.result;
                $scope.$apply();
              }
        }

        $scope.uploadFile=function(){
            reader = new FileReader();
            reader.readAsDataURL($scope.files[0]);
            reader.onload = function(loadEvent) {
                console.log(loadEvent.target.result);
                var param={
                    "file":loadEvent.target.result,
                    "account":"heyman"
                }
                //x-www-form-urlencoded
                $http({
                  url: "http://localhost:8080/api/Test/upload",
                  method: 'POST',
                  headers: {
                    
                      'Content-Type': 'x-www-form-urlencoded'
                  },
                  data: param,
                }).success(function(data){
                alert(data);
                });
            };


          
        }
    }])

})