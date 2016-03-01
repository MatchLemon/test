define(['directives/baseDirective'],function(module){

   return module.directive('required', [ function() {
        return function(scope, elem, attr) {
            var $form, $elem;
            $elem = $(elem);
            console.log($elem);
            $form = $elem.closest('form');
            if (!$form.attr('binded')) {
              $form.attr('binded', true).on('submit', function(e) {
                console.log($elem);
                   /* for (var property in $elem[0]) {
                        if (property.charAt(0) !== "$") {
                            $scope.orderForm[property].$setTouched();
                        }
                     }*/
              });
            }
        };
    }]);
})