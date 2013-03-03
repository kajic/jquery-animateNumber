/*
 * jquery.animateNumber.js - jquery number animation plugin
 * Copyright (C) 2013, Robert Kajic (robert@kajic.com)
 * http://kajic.com
 *
 * Used on elements that have a number as content (integer or float)
 * to animate the number to a new value over a short period of time.
 * 
 * Licensed under the MIT License.
 *
 * Date: 2013-01-08
 * Version: 0.1
 */

(function ($, undefined) {

var defaults = {
    duration : 5000,
    easing: "swing",
    animateOpacity: true,
    intStepDecimals: 0,
    intEndDecimals: 0,
    floatStepDecimals: 4,
    floatEndDecimals: 1,
    callback: function() {}
};
    
function round(number, decimals) {
    return Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
}

function isInt(number) {
    return /^-?[\d]+$/.test(number);
}

$.fn.animateNumber = function(value, options, callback) {
    if (typeof options === "function") {
        callback = options;
        options = {};
    }
    options = $.extend({}, defaults, options);
    
    return this.each(function () {
        var container = $(this);
        var initialValue = parseFloat($(this).text(), 10);
        if (round(value, options.floatEndDecimals) == round(initialValue, options.floatEndDecimals)) {
            return;
        }
        var type = container.data("type") || (isInt($(this).text()) ? "int" : "float"),
            stepDecimals, endDecimals, 
            defaultStepDecimals, defaultEndDecimals;
        if (type == "int") {
            defaultStepDecimals = options.intStepDecimals;
            defaultEndDecimals = options.intEndDecimals;
        } else {
            defaultStepDecimals = options.floatStepDecimals;
            defaultEndDecimals = options.floatEndDecimals;
        }
        stepDecimals = container.data("stepDecimals") || defaultStepDecimals;
        endDecimals = container.data("endDecimals") || defaultEndDecimals;
        
        // animate opacity
        if (options.animateOpacity) {
            container.animate({opacity: 0.2}, {
                duration: options.duration/2, 
                easing: options.easing, 
                complete: function() {
                    container.animate({opacity: 1}, {
                        duration: options.duration/2,
                        easing: options.easing
                    });
                }
            });
        }
        // animate number
        $({number: initialValue}).animate({number: value}, {
            duration: options.duration,
            easing: options.easing, 
            step: function() {
                container.text(round(this.number, stepDecimals));
            },
            complete: function() {
                container.text(round(this.number, endDecimals));
                if (typeof options.callback === "function") {
                    options.callback.call(container);
                }
            }
        });
    });
};

})( jQuery, window, document );
