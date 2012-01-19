(function (jQuery) {

    jQuery.fn.inputDefault = function(options) {

    	/**
		 * Default values, currently its only a string to display
		 */
		var defaults = {
			/**
			 * default text on input
			 */	
    		defaultText: '',
    		/**
    		 * if default text text is not specified in defaultText option, it is found in the defined input attribute
    		 */
    		defaultTextAttr: "placeholder"
    	};

		defaults = jQuery.extend(defaults, options);		
		
		jQuery(this).each(function() {
	    	/**
	    	 * The current textfield or textarea
	    	 */
			var field = jQuery(this);
			var wrapper = null;
			
			init();
			
			function init() {
	
				var defaultText = '';
				
				if (defaults.defaultText === ''){
					var placeholder = field.attr(defaults.defaultTextAttr);
					if (placeholder !== ''){
						defaultText = placeholder;
					} else {
						return false;
					}		
				} else {
					defaultText = defaults.defaultText;
				}
	
				field.removeAttr('placeholder');
	
				wrapper = jQuery('<div class="jquery-input-default-placeholder-wrapper jquery-input-default-focused">');
				var container = jQuery('<div class="jquery-input-default-border">');
				container.addClass(field.is('textarea') ? 'jquery-input-default-textarea' : 'jquery-input-default-input');
				var innerContainer = jQuery('<div class="jquery-input-default-inner">');
				container.append(innerContainer);
				wrapper.append(container);
				
				var label = jQuery('<div class="jquery-input-default-placeholder">');
				label.html(defaultText);
				
				field.before(wrapper);
				innerContainer.append(label).append(field);
	
				field.bind('focus.inputDefault blur.inputDefault input.inputDefault propertychange.inputDefault', eventHandler)
					.trigger('input.inputDefault');
				
				return true;
			}
	
			function eventHandler() {
				if (field.val() === ''){
					wrapper.removeClass('jquery-input-default-filled');
				} else {
					wrapper.addClass('jquery-input-default-filled');	
				}	
	
				if (field.get(0) === document.activeElement){
					wrapper.removeClass('jquery-input-default-blured').addClass('jquery-input-default-focused');
				} else {
					wrapper.removeClass('jquery-input-default-focused').addClass('jquery-input-default-blured');
				}			
				
				return true;
			}
			
		});	

		// return the dom node
		return this;
	}
})(jQuery);