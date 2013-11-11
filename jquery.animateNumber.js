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

(function($, undefined) {

	var defaults = {
		duration : 5000,
		easing: "swing",
		animateOpacity: true,
		intStepDecimals: 0,
		intEndDecimals: 0,
		floatStepDecimals: 4,
		floatEndDecimals: 1,
		format: "default",
		currencyIndicator: "$",
		currencyGroupSeparator: (1000).toLocaleString().charAt(1),
		currencyDecimalSeparator: (1.5).toLocaleString().charAt(1),
		callback: function() {}
	};

	function formatNumber(number, options, decimals) {
		if (options.format == "currency") {
			return formatCurrency(number, options);
		} else {
			return round(number, decimals);
		}
	}

	function round(number, decimals) {
		return Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
	}

	function formatCurrency(number, options) {
		if (isNaN(number)) { return; }

		var integer     = Math.floor(number);
		var decimal     = (number - integer).toFixed(options.floatEndDecimals).split('.')[1];
		var integerPart = integer.toLocaleString();
		var decimalPart = '';

		if (parseInt(options.floatEndDecimals) > 0) {
  			decimalPart += options.currencyDecimalSeparator + decimal;
		}

		// This check is necessary because IE renders (25).toLocaleString() as 25.00
		// while Chrome, Firefox and others return it as 25
		if (integerPart.indexOf(options.currencyDecimalSeparator) >= 0) {
  			integerPart = integerPart.split('.')[0];
		}

		return options.currencyIndicator + integerPart + decimalPart;
	}

	function isInt(number) {
		return /^-?[\d]+$/.test(number);
	}

	$.fn.animateNumber = function (value, options, callback) {
		if (typeof options === "function") {
			callback = options;
			options = {};
		}
		options = $.extend({}, defaults, options);

		return this.each(function () {
			var container = $(this);
			var initialValue;

			if (options.format === "currency") {
				if (container.data("numeric-value")) {
					initialValue = container.data("numeric-value");
				} else {
					initialValue = container.text().replace(options.currencyIndicator, "").replace(options.currencyGroupSeparator, "");
				}
			} else {
				initialValue = parseFloat(container.text(), 10);
			}
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
					container.text(formatNumber(this.number, options, stepDecimals));
				},
				complete: function() {
					container.data("numeric-value", this.number);
					container.text(formatNumber(this.number, options, endDecimals));
					if (typeof options.callback === "function") {
						options.callback.call(container);
					}
				}
			});
		});
	};

})(jQuery);
