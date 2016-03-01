define(['app', 'config', './dialogController'],function(app, config){
    return app.registerController('uploadController',['$scope','$http','$modal','$upload',function($scope, $http, $modal, $upload){
        $scope.onFileSelect = function($files) {    //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
                
            }
        }

        $scope.import = function(){
          var modalInstance;
          return modalInstance = $modal.open({
          templateUrl: '/partials/dialog.html',
          controller: 'dialogController',
          windowClass: 'setting-dialog',
          backdrop:"static",
        }).result.then(function(data) {
          console.log(data);
        });
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
    /*  reader = new FileReader();
      reader.readAsDataURL($scope.files[0]);
            reader.onload = function(loadEvent) {
              
                $scope.image = loadEvent.target.result;
                $scope.$apply();
              }*/
        }

        $scope.uploadFile=function(){
            reader = new FileReader();
            reader.readAsDataURL($scope.files[0]);
            reader.onload = function(loadEvent) {
                console.log(loadEvent.target.result);
                var param={
                    "file":"",
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

        $scope.uploadFileBinary = function() {
            //reader = new FileReader();
           /* reader.readAsBinaryString($scope.files[0]);
            reader.onload = function(loadEvent) {
              console.log("reader finish");
              _submitData(loadEvent.target.result);
            }*/
            _submitData($scope.files[0]);
        }
  /*  function _submitData(file) {
        var body={
                  "file":"55",
                  "account":"heyman"
            }
        var formData = new FormData();
        formData.append("file",file);
       $http({
              url: "http://localhost:8080/api/SZ/upload",
              method: 'POST',
              headers: {
                  'Content-Type': 'application/form-data'
              },
              data: formData,
            }).success(function(data){
            alert(data);
            });
    }*/
    function _submitData(file) {
      var body={
                  "file":"55",
                  "account":"heyman"
            }

      $upload.upload({
      url:config.hostnamePort + '/api/SZ/upload',
      file:file,
      data: body
      }).progress(function(evt) { 
         console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {        // file is uploaded successfully
          console.log(data);
        });  ;
      }
   
    }])

})