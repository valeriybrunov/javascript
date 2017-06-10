(function($) {
    $(document).ready(function() {
		
		var Form_name = function() {

			// -------------------------------
			// Приватные свойства и методы.
			// -------------------------------

            // Ищем элемент с id = name.
            var name = $( '#name' );

            /**
             * Показывает ошибки.
             */
            function setError( text ) {
                name.parent().next().removeClass( 'confirm' ).addClass( 'error' ).text( text );
            }

            /**
             * Очишает ошибки и любые надписи.
             */
            function errorOff() {
                name.parent().next().removeClass( 'error' ).replaceWith( '<li class="label">&nbsp;</li>' );
            }

            /**
             * Показывает утверждение.
             */
            function setConfirm( text ) {
                name.parent().next().removeClass( 'error' ).addClass( 'confirm' ).text( text );
            }

			return {

				// -------------------------------
				// Публичные методы и свойства.
				// -------------------------------

                init: function() {

                    /**
                     * Событие - нажата клавиша вернулась в отжатое (нормальное) состояние.
                     */
                    $( '#name' ).on('keyup', function( eventObj ) {
                        var str = $( this ).val();
                        if ( str.length > 0 ) {
                            // Проверка на символы пунктуации.
                            if ( str.search( /[!@#$%^&*()<>~'"`:;]/ ) + 1 ) {
                                var arr_simbol = str.match( /[!@#$%^&*()<>~'"`:;]$/ );
                                setError( 'Символ ' + arr_simbol[0] + ' недопустим!' );
                            }
                            else if ( str.search( /^[\S]{1,2}$/i ) + 1 ) {
                                setError( 'Имя слишком короткое!' );
                            }
                            else setConfirm( 'Все верно' );
                        }
                        else errorOff();
                    });

                },

			};
		};

		var Name = new Form_name();
        Name.init();
		

	});
})(jQuery);
