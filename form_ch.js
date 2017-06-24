(function($) {
    $(document).ready(function() {

        var Form_ch = function() {

            // -------------------------------
			// Приватные свойства и методы.
			// -------------------------------

            var id, objErr, submit_id;

            /**
             * Объект ошибки (куда вставляется текст ошибки).
             */
            function objectError() {
                objErr = id.parent().parent().parent().parent().next();
            }

            /**
             * Показывает ошибки.
             */
            function setError( text ) {
                objErr.removeClass( 'confirm' ).addClass( 'error' ).text( text );
            }

            /**
             * Очишает ошибки и любые надписи.
             */
            function errorOff() {
                objErr.removeClass( 'error' ).replaceWith( '<li class="label">&nbsp;</li>' );
                objectError();
            }

            /**
             * Событие - щелчок по кнопке.
             */
            function submitClick() {
                submit_id.on('click', function( eventObj ) {
                    if (! $( id ).prop( 'checked' ) ) {
                        setError( 'Необходимо принять условия пользовательского соглашения!' );
                        submit_id.trigger( 'errorform' );
                        eventObj.preventDefault();
                    }
                });
            }

            /**
             * Событие - чекбокс выбран (отмечен).
             */
            function checkboxChecked() {
                id.on('change', function( eventObj ) {
                    if ( $( this ).prop( 'checked' ) ) errorOff();
                });
            }

            /**
             * Очищает все ошибки и снимает галочку с чекбокса.
             */
            function clearch() {
                errorOff();
                id.removeAttr( 'checked' );
            }

            return {

				// -------------------------------
				// Публичные методы и свойства.
				// -------------------------------

                /**
                 * id чекбокса.
                 */
                id: function( id_name ) {
                    id = $( '#' + id_name );
                },

                /**
				 * id кнопки после нажатия которой будет произведена проверка поля на ошибки.
                 */
				submitId: function( id_submit ) {
                    submit_id = $( '#' + id_submit );
                },

                /**
                 * Инициализация.
                 */
                init: function() {
                    objectError();
                    submitClick();
                    checkboxChecked();
                },

                /**
                 * Очистка от появившихся ошибок.
                 */
                clear: function() {
                    clearch();
                },

            };
        };

        var Ch = new Form_ch();
        Ch.id( 'k' );
        Ch.submitId( 'sub' );
        Ch.init();

        // При закрытие модального окна.
        $( 'body' ).on('closemodal', function( eventObj ) {
            Ch.clear();
        });

    });
})(jQuery);
