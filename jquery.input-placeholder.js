(function (jQuery) {

    jQuery.fn.inputDefault = function(options) {

        var defaults = {
            /**
             * default text on input
             */
            defaultText: '',
            /**
             * if default text text is not specified in defaultText option, it is found in the defined input attribute
             */
            defaultTextAttr: "placeholder",

            /**
             * prefix for all classNames
             */
            classPrefix: "jquery-input-default-"
        };

        defaults = jQuery.extend(defaults, options);

        jQuery(this).each(function() {

            var field = jQuery(this),
                defaultText = '';

            if (defaults.defaultText === ''){
                var placeholder = field.attr(defaults.defaultTextAttr);
                if (placeholder !== ''){
                    defaultText = placeholder;
                } else {
                    return;
                }
            } else {
                defaultText = defaults.defaultText;
            }

            field.removeAttr('placeholder');

            var wrapper = jQuery('<div>');
            wrapper.addClass(createClassName('wrapper'))
                   .addClass(field.is('textarea') ? createClassName('textarea') : createClassName('input'));

            var label = jQuery('<div>');
            label.addClass(createClassName('placeholder'))
                 .html(defaultText);

            field.before(wrapper);
            wrapper.append(label).append(field);

            field.data('wrapper.inputDefault', wrapper);
            field.data('label.inputDefault', label);

            field.on('focus.inputDefault blur.inputDefault', function(){
                focusHandler($(this));
            })
            .on('input.inputDefault propertychange.inputDefault', function(e, updateOthers){
                inputHandler($(this), updateOthers);
            });

            focusHandler(field);
            inputHandler(field, false);
        });

        function focusHandler(field) {
            var wrapper = field.data('wrapper.inputDefault');
            var classes = ['focused', 'blured'];

            if (field.get(0) === document.activeElement){
                classes.reverse();
            }

            wrapper.removeClass(createClassName(classes[0])).addClass(createClassName(classes[1]));
        }

        function inputHandler(field, updateOthers) {
            var wrapper = field.data('wrapper.inputDefault');
            var label = field.data('label.inputDefault');

            if (field.val() === ''){
                wrapper.removeClass(createClassName('filled'));
            } else {
                wrapper.addClass(createClassName('filled'));
            }

            //for ie7
            label.width(field.width());
            label.css('width', 'auto');

            if (updateOthers !== false){
                setTimeout(function(){
                    field.closest('form').find('.' + createClassName('wrapper')).find(':input').not(field).trigger('input.inputDefault', [false]);
                }, 10);
            }
        }

        function createClassName($className){
            return defaults.classPrefix + $className;
        }

        return this;
    };
})(jQuery);
