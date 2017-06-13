(function($) {
    $(document).ready(function() {

        /**
         * Упрощает ввод в текстовое поле номера сотового телефона, путём вставки шаблона-подсказки для ввода.
         *
         * 
         */

        var Form_telefon = function() {

            // -------------------------------
			// Приватные свойства и методы.
			// -------------------------------

            var id, input, start_pos, end_pos, form_value;

            // Шаблон-формат, в который будет вставлен номер сотового телефона.
            var template_tel = '+7(___)___-__-__';

            // Начальная позиция в шаблоне для ввода телефонного номера.
            function startPos() {
                start_pos = template_tel.indexOf( '_' );
            }

            // Конечная позиция в шаблоне для ввода телефонного номера.
            function endPos() {
                end_pos = template_tel.length;
            }

            // Следующая позиция для ввода номера телефона.
            // Работает непосредственно с полем ввода телефона.
            function nextPos() {
                var form_val = id.val();
                return form_val.indexOf( '_' );
            }

            /**
			 * Метод устанавливает курсор в нужную позицию внутри формы.
			 *
			 * @param oInput
			 *  Объект элемента поля ввода номера телефона.
			 * @param oStart
			 *  Позиция начала выделения текста в поле формы.
			 * @param oEnd
			 *  Позиция конца выделения текста в поле формы.
			 *
			 * При совпадении oStart и oEnd курсор устанавливается в указанную позицию.
			 */
			function setCursorPosition( oInput, oStart, oEnd ) {
                if ( oInput.setSelectionRange ) {
					oInput.setSelectionRange( oStart, oEnd );
				}
				else if ( oInput.createTextRange ) {
					range = oInput.createTextRange();
					range.collapse( true );
					range.moveEnd( 'character', oEnd );
					range.moveStart( 'character', oStart );
					range.select();
				}
			}

            /**
             * Метод получает позицию курсора внутри формы.
             *
             * @param input
			 *  Объект элемента поля ввода номера телефона.
             */
            function getCursorPosition( input ) {
                if ( input.selectionStart ) {
                    // Стандартные браузеры MazillaFireFox, Opera, Chrom.
                    return input.selectionStart;
                }
                else if ( document.selection ) {
                    // IE.
                    input.focus();
                    var sel = document.selection.createRange();
                    var selLen = document.selection.createRange().text.length;
                    sel.moveStart( 'character', -input.value.length );
                    return sel.text.length - selLen;
                }
            }

            // Событие - клик по форме ввода.
            function clickform() {
                id.on('click', function( eventObj ) {
                    var form_val = id.val();
                    if ( form_val == '' ) {
                        id.val( template_tel );
                        setCursorPosition( input, start_pos, start_pos );
                    }
                    else if ( form_val == template_tel ) {
                        setCursorPosition( input, start_pos, start_pos );
                    }
                    else if ( nextPos() == -1 ) {
                        setCursorPosition( input, end_pos, end_pos );
                    }
                    else {
                        var next_pos = nextPos();
                        setCursorPosition( input, next_pos, next_pos );
                    }
                });
            }

            // Событие - потеря формой фокуса.
            function focusout() {
                id.on('focusout', function( eventObj ) {
                    var form_val = id.val();
                    if ( form_val == template_tel ) {
                        id.val('');
                    }
                });
            }

            // Событие - перед нажатием клавиши (клавиша еще не отображена).
            function keypress() {
                id.on('keypress', function( eventObj ) {
                    form_value = id.val();
                });
            }

            // Событие - возвращение клавиши в ненажатое состояние.
            function keyup() {
                id.on('keyup', function( eventObj ) {
                    id.val( form_value );
                    var next_pos = nextPos();
                    if ( eventObj.which >= 48 && eventObj.which <= 57 ) {
                        if ( next_pos != -1 ) {
                            if ( eventObj.which == 48 ) var symbol = '0';
                            if ( eventObj.which == 49 ) var symbol = '1';
                            if ( eventObj.which == 50 ) var symbol = '2';
                            if ( eventObj.which == 51 ) var symbol = '3';
                            if ( eventObj.which == 52 ) var symbol = '4';
                            if ( eventObj.which == 53 ) var symbol = '5';
                            if ( eventObj.which == 54 ) var symbol = '6';
                            if ( eventObj.which == 55 ) var symbol = '7';
                            if ( eventObj.which == 56 ) var symbol = '8';
                            if ( eventObj.which == 57 ) var symbol = '9';
                            form_value = form_value.replace( '_', symbol );
                            id.val( form_value );
                            setCursorPosition( input, next_pos + 1, next_pos + 1 );
                        }
                        else setCursorPosition( input, end_pos, end_pos );
                    }
                    else if ( eventObj.which == 8 ) {
						if ( next_pos == -1 || (next_pos - 1) >= start_pos ) {
                            var result;
                            for (var i = 0; i <= (end_pos - 1); i++) {
                                if ( !isNaN(form_value.charAt(i)) ) result = i;
                            }
                            var new_str = '';
                            for (var i = 0; i <= (end_pos - 1); i++) {
                                if ( result == i ) new_str = new_str + '_';
                                else new_str = new_str + form_value.charAt(i);
                            }
							id.val( new_str );
							next_pos = nextPos();
							setCursorPosition( input, next_pos, next_pos );
						}
                        else {
                            setCursorPosition( input, start_pos, start_pos );
                        }
                    }
                });
            }

            return {

				// -------------------------------
				// Публичные методы и свойства.
				// -------------------------------

                // Инициализация объекта.
                init: function( id_form ) {
                    startPos();
                    endPos();
                    clickform();
                    focusout();
                    keypress();
                    keyup();
                },

                // Шаблон-подсказка.
                template: function( template ) {
                    template_tel = template;
                },

                // id поля для ввода номера телефона.
                id: function( id_tel ) {
                    id = $( '#' + id_tel );
                    input = document.getElementById( id_tel );
                },

            };
        };

        var Telefon = new Form_telefon();
        Telefon.id( 'tel' );
        Telefon.template( '(___)___-__-__' );
        Telefon.init();

    });
})(jQuery);
