(function($) {
    $(document).ready(function() {

        var Form_captha = function() {

			// -------------------------------
			// Приватные свойства и методы.
			// -------------------------------

            var id, submit_id, clear_id;

            // Указывает на потерю фокуса.
            var focus = false;

            /**
             * Показывает ошибки.
             */
            function setError( text ) {
                id.parent().next().removeClass( 'confirm' ).addClass( 'error' ).text( text );
            }

            /**
             * Очишает ошибки и любые надписи.
             */
            function errorOff() {
                id.parent().next().removeClass( 'error' ).replaceWith( '<li class="label">&nbsp;</li>' );
            }

            /**
             * Показывает утверждение.
             */
            function setConfirm( text ) {
                id.parent().next().removeClass( 'error' ).addClass( 'confirm' ).text( text );
            }

            /**
             * Событие - поле в фокусе.
             */
            function myfocus() {
				id.on('focus', function( eventObj ) {
					focus = true;
				});
			}

            /**
             * Проверка на обязательность заполнения поля.
             */
            function binding() {
                var str = $( id ).val();
                if ( str.length == 0 ) setError( 'Поле обязательно для заполнения!' );
            }

            /**
             * Событие - потеря фокуса.
             */
			function myfocusout() {
				id.on('focusout', function( eventObj ) {
					if ( focus == true ) {
						binding();
					}
				});
			}

            /**
             * Очищает форму.
             */
            function clearform() {
                id.val('');
                errorOff();
            }

            /**
             * Событие - щелчок по кнопке.
             */
            function submitClick() {
                submit_id.on('click', function( eventObj ) {
                    binding();
                    if ( id.parent().next().hasClass( 'error' ) ) {
                        submit_id.trigger( 'errorform' );
                        eventObj.preventDefault();
                    }
                });
            }

            /**
             * Событие - щелчок по объекту очистки формы.
             */
            function clearForm() {
                clear_id.on('click', function( eventObj ) {
                    eventObj.preventDefault();
                    clearform();
                });
            }

            /**
             * Событие - нажата клавиша вернулась в отжатое (нормальное) состояние.
             */
            function keyup() {
                id.on('keyup', function( eventObj ) {
                    var str = $( this ).val();
                    if ( str.length > 0 ) errorOff();
                });
            }

            return {

				// -------------------------------
				// Публичные методы и свойства.
				// -------------------------------

                /**
                 * id поля для ввода .
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
                 * id объекта по щелчку на котором очищает форму.
                 */
                clearId: function( id_clear ) {
                    clear_id = $( '#' + id_clear );
                },

                /**
                 * Инициализация.
                 */
                init: function() {
                    submitClick();
                    clearForm();
                    myfocus();
                    myfocusout();
                    keyup();
                },

                /**
                 * Очистка формы.
                 */
                clear: function() {
                    clearform();
                },

            };
        };

    });
})(jQuery);
