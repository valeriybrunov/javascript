(function($) {
    $(document).ready(function() {

        /**
         * Проверяет форму ввода адреса эл. почты.
         *
         * Использовать:
         *  var Email = new Form_email();
         *  Email.id( 'email' );// id формы для ввода адреса эл. почты.
         *  Email.clearId( 'email-clear' );// id элемента при щелчке по которому форма очистится.
         *  Email.submitId( 'sub' );// id кнопки для отправки формы.
         *  Email.init();// Инициализация.
         *
         * Мин. использование:
         *  var Email = new Form_email();
         *  Email.id( 'email' );
         *  Email.init();
         *
         * Дополнительные возможности:
         *  - очистка формы: Email.clear();
         */
		var Form_email = function() {

			// -------------------------------
			// Приватные свойства и методы.
			// -------------------------------

			var id, clear_id, submit_id;
			
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
             * Событие - потеря фокуса.
             */
			function myfocusout() {
				id.on('focusout', function( eventObj ) {
					if ( focus == true ) {
						var str = $( this ).val();
						if ( str.length == 0 ) setError( 'Поле обязательно для заполнения!' );
                        else if ( str.search( /^[0-9A-Za-z_.]+@[0-9A-Za-z_.]+\.[a-z]+$/ ) + 1 ) {
                            setConfirm( 'Все верно' );
                        }
                        else setError( 'E-mail адрес не верный!' );
					}
				});
			}

            /**
             * Событие - нажата клавиша вернулась в отжатое (нормальное) состояние.
             */
            function keyup() {
				id.on('keyup', function( eventObj ) {
					var str = $( this ).val();
					if ( str.length > 0 ) {
						// Проверка на символы пунктуации.
						if ( str.search( /[А-Яа-я]+/ ) + 1 ) {
                            setError( 'Рус. символы не допускаются!' );
                        }
                        else errorOff();
					}
                    else errorOff();
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
                    if ( id.parent().next().hasClass( 'error' ) ) {
                        eventObj.preventDefault();
                        submit_id.trigger( 'errorform' );
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

			return {

				// -------------------------------
				// Публичные методы и свойства.
				// -------------------------------

                /**
                 * Инициализация.
                 */
				init: function() {
					keyup();
					myfocus();
					myfocusout();
                    clearForm();
                    submitClick();
				},

                /**
                 * id поля для ввода имени.
                 */
                id: function( id_name ) {
                    id = $( '#' + id_name );
                },

                /**
                 * id объекта по щелчку на котором очищает форму.
                 */
                clearId: function( id_clear ) {
                    clear_id = $( '#' + id_clear );
                },

                /**
				 * id кнопки после нажатия которой будет произведена проверка поля на ошибки.
                 */
				submitId: function( id_submit ) {
                    submit_id = $( '#' + id_submit );
                },

                /**
                 * Очистка формы.
                 */
                clear: function() {
                    clearform();
                },

			};
		};
		
		var Email = new Form_email();
        Email.id( 'email' );
        Email.clearId( 'email-clear' );
        Email.submitId( 'sub' );
        Email.init();

        // При закрытие модального окна.
        $( 'a.closeModal' ).on('click', function(eventObj) {
            Email.clear();
        });
	
	});
})(jQuery);
