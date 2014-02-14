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

            if (field.data('initialized.inputDefault')) return;
            field.data('initialized.inputDefault', true);

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
                   .addClass(field.is('textarea') ? createClassName('textarea') : createClassName('input'))
                   .css({
                        'margin-top': field.css('margin-top'),
                        'margin-right': field.css('margin-right'),
                        'margin-bottom': field.css('margin-bottom'),
                        'margin-left': field.css('margin-left'),
                        'background-color': field.css('background-color'),
                        'background-repeat': field.css('background-repeat'),
                        'background-image': field.css('background-image'),
                        'background-position': field.css('background-position'),
                        'background-attachment': field.css('background-attachment'),
                        'border-top-left-radius': field.css('border-top-left-radius'),
                        'border-top-right-radius': field.css('border-top-right-radius'),
                        'border-bottom-left-radius': field.css('border-bottom-left-radius'),
                        'border-bottom-right-radius': field.css('border-bottom-right-radius')
                   });

            var label = jQuery('<div>');
            label.addClass(createClassName('placeholder'))
                 .html(defaultText)
                 .css({
                    'padding-top': parseInt(field.css('padding-top')) + parseInt(field.css('border-top-width')) + 'px',
                    'padding-right': parseInt(field.css('padding-right')) + parseInt(field.css('border-right-width')) + 'px',
                    'padding-bottom': parseInt(field.css('padding-bottom')) + parseInt(field.css('border-bottom-width')) + 'px',
                    'padding-left': parseInt(field.css('padding-left')) + parseInt(field.css('border-left-width')) + 'px',
                    'line-height': field.css('line-height'),
                    'font-size': field.css('font-size'),
                    'font-family': field.css('font-family'),
                    'font-style': field.css('font-style'),
                    'font-weight': field.css('font-weight'),
                    'color': field.css('color')
                 });

            field.before(wrapper);
            wrapper.append(label).append(field);

            field.data('wrapper.inputDefault', wrapper);
            field.data('label.inputDefault', label);
            field.css('margin', '0');

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
