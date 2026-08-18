/**
 * jQuery Polyfill for jQuery 4.0+ compatibility with legacy plugins (waypoints, counterUp, etc.)
 */
if (typeof jQuery !== 'undefined') {
  if (typeof jQuery.isFunction === 'undefined') {
    jQuery.isFunction = function (obj) {
      return typeof obj === 'function';
    };
  }

  // Safe wrapper for counterUp to prevent TypeError shift on non-numeric elements
  jQuery(document).ready(function ($) {
    if (typeof $.fn.counterUp === 'function') {
      var _origCounterUp = $.fn.counterUp;
      $.fn.counterUp = function (options) {
        return _origCounterUp.call(this.filter(function () {
          var text = $(this).text().replace(/[\s\(\),.]/g, '');
          return text.length > 0 && !isNaN(text);
        }), options);
      };
    }
  });
}
