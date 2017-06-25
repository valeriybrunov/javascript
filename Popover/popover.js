(function($) {
    $(document).ready(function() {

        var Popover = function() {

            // -------------------------------
			// Приватные свойства и методы.
			// -------------------------------

            var class_, text, my_template, x = [], y = [], top, left;

            var body = $( 'body' );

            // Указывает с какой стороны должен появится поповер относительно объекта.
            var point = 2;

            /**
             * Устанавливаем шаблон поповера.
             */
            function template() {
                my_template = '<div id="popover" style="position:absolute;width:100px;height:30px;top:' + top + 'px;left:' + left + 'px;z-index:3000;">' + text + '</div>';
            }

            /**
             * Определяет координаты точки соприкосновения на объекте, рядом скоторым необходимо показать поповер.
             */
            function pointer( objectPopover ) {
                var top = Math.round( $( objectPopover ).offset().top );
                var left = Math.round( $( objectPopover ).offset().left );
                var w = $( objectPopover ).width();
                var h = $( objectPopover ).height();
                var half_h = Math.round( h/2 );
                var half_w = Math.round( w/2 );
                x[1] = left + half_w;
                y[1] = top;
                x[2] = left + w;
                y[2] = top + half_h;
                x[3] = left + half_w;
                y[3] = top + h;
                x[4] = left;
                y[4] = top + half_h;
                x[5] = left + w;
                y[5] = top;
                x[6] = left + w;
                y[6] = top + h;
                x[7] = left;
                y[7] = top + h;
                x[8] = left;
                y[8] = top;
            }

            /**
             * Установка двух событий.
             */
             function eventPopover() {
                class_.hover(function() {
                    // Курсор над территорией элемента.
                    displayOn( this );
                }, function() {
                    // Курсор вышел с территории элемента.
                    displayOff( this );
                });
            }

            /**
             * Показывает поповер.
             */
            function displayOn( objectPopover ) {
                pointer( objectPopover );
                top = y[point];
                left = x[point];
                template();
                body.append( my_template );
            }

            /**
             * Скрывает поповер.
             */
            function displayOff( objectPopover ) {
                $( '#popover' ).remove();
            }

            return {

                // -------------------------------
				// Публичные методы и свойства.
				// -------------------------------

                /**
                 * class объектов рядом с которыми необходимо показать поповер.
                 */
                class: function( my_class ) {
                    class_ = $( '.' + my_class );
                },

                /**
                 * Инициализация.
                 */
                init: function( text_ ) {
                    text = text_;
                    eventPopover();
                },

            };
        };

        var Popovers = new Popover();
        Popovers.class( 'glyphicon-remove' );
        Popovers.init( 'Очистить' );

    });
})(jQuery);
