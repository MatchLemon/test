define(['directives/baseDirective','jqueryUI'],function(mod){
  return mod.directive('toolTip', [
    '$rootScope', '$interval', '$sanitize', '$timeout', function($rootScope, $interval, $sanitize, $timeout) {
      return {
        link: function(scope, elem, attrs) {
          var addTooltip, isAddTooltip, newTip, oldTip, updateTooltip;
          isAddTooltip = true;
          oldTip = '';
          newTip = '';
          $(elem).mouseenter(function() {
            return updateTooltip();
          });
          addTooltip = function() {
            var position;
            oldTip = attrs.wmTooltip;
            if (!attrs.tipChecked && oldTip) {
              isAddTooltip = false;
              position = attrs.position || 'bottom';
              $(elem).tooltipster({
                content: $sanitize(oldTip),
                position: position,
                theme: 'tooltipster-wm',
                contentAsHTML: true,
                maxWidth: attrs.tooltipMaxWidth
              });
            }
          };
          updateTooltip = function() {
            var timer;
            newTip = attrs.wmTooltip;
            if (newTip && newTip !== oldTip) {
              oldTip = newTip;
              timer = $interval(function() {
                $interval.cancel(timer);
                if (!$(elem).attr('tip-checked') && oldTip) {
                  if (isAddTooltip) {
                    return addTooltip();
                  } else if ($(elem).data('tooltipster-ns')) {
                    $(elem).tooltipster('content', oldTip);
                    return $(elem).tooltipster('enable');
                  }
                } else if ($(elem).data('tooltipster-ns')) {
                  return $(elem).tooltipster('disable');
                }
              }, 80);
            }
          };
          addTooltip();

          /*
          scope.$on 'updateTooltip', (event, data) ->
            updateTooltip()
            return
           */
          $rootScope.$on('$translateChangeSuccess', function() {
            updateTooltip();
          });
        }
      };
    }
  ]);
});