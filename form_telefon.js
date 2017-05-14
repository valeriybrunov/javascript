(function($) {

    $(document).ready(function() {

    	/**
    	 * Объект tel упрощает ввод в текстовое поле номера сотового телефона, путём вставки шаблона-подсказки для ввода.
    	 * 
    	 * ПРИМЕР: Для текстового поля формы <input type="text" value="+7(___)___-__-__" name="tel" id="tel">
    	 * применять следующим образом:
    	 * tel.id = 'tel';
    	 * tel.init();
    	 */
        var tel = {

        	/**
        	 * Свойсива.
        	 */
            // id поля ввода номера сотового телефона.
            id: '',
            // "Чистый" номер телефона, т.е. состоящий только из цифр. Например: 9379908790.
            clean_tel: '',
            // Шаблон-формат, в который будет вставлен номер сотового телефона.
            template_tel: '+7(___)___-__-__',
            // Счётчик кликов по форме ввода. Предназначен для вставки шаблона-формата при первом клике по форме.
            count_click: 0,
            // Счётчик возникновения события, когда позиция курсора становится равным 3.
            count_pos_3: 0,

            /**
             * Метод запуска.
             */
            init: function() {
            	// Ищем поле ввода номера телефона.
				var input = document.getElementById(this.id);
				$('#' + this.id).on('click', function(eventObj) {
					// Событие - клик по форме.
					if (tel.count_click == 0) {
						// Вставляем в поле ввода мобильного телефона аттрибут value с шаблоном ввода мобильного телефона.
            			$('#' + tel.id).val(tel.template_tel);
            			tel.count_click++;
            		}
					tel.click(eventObj, input);
				});
                $('#' + this.id).on('keyup', function(eventObj) {
                	// Событие - возврат клавиши из нажатого состояния.
					tel.keyup(eventObj, input);
				});
				$('#' + this.id).on('focusout', function(eventObj) {
					// Событие -потери фокуса на элементе формы.
					var count_ = input.value.split('_').length - 1;
					if (count_ == 10) {
						// Элемент формы для ввода номера сотового телефона не заполнен.
						input.value = '';
						tel.count_click = 0;
					}
				});
            },

            /**
             * Метод события клика по форме.
             * Метод установливает курсор только между цифрами, в начало или конец цифрового ряда. Установить курсор в те места формы,
             * где символы "_" метод не представляет возможным.
             *
             * @param eventObj
             *  Объект события.
             * @param input
             *  Объект элемента поля ввода номера телефона.
             */
            click: function(eventObj, input) {
				if (this.clean_tel.length == 0) {
					// Если поле пустое (пользователь не ввел ни одной цифры).
					// Устанавливаем курсор в начало перед "+7(".
					this.setCursor(input, 3);
				}
				else {
					// Поле формы заполнено частично или полностью.
					// Определяем позицию установки курсора пользователем при щелчке по полю формы.
					var posCursor = this.getCursorPosition(input);
					// Определяем длину строки clean_tel с учётом символов "+7(, ), -" шаблона template_tel.
					var length_clean_tel = this.clean_tel.length;
					if (length_clean_tel >= 1 && length_clean_tel <= 3)  var length_clean_tel_template_tel = length_clean_tel + 3;
					if (length_clean_tel >= 4 && length_clean_tel <= 6)  var length_clean_tel_template_tel = length_clean_tel + 4;
					if (length_clean_tel >= 7 && length_clean_tel <= 8)  var length_clean_tel_template_tel = length_clean_tel + 5;
					if (length_clean_tel >= 9 && length_clean_tel <= 10) var length_clean_tel_template_tel = length_clean_tel + 6;
					if (posCursor > (length_clean_tel_template_tel - 1)) {
						// Если пользователь пытался установить курсор дальше длины строки - возвращаем его к концу цифрового ряда.
						this.setCursor(input, length_clean_tel_template_tel);
					}
					else {
						// Позиция курсора не может быть меньше 3.
						if (posCursor < 3 || posCursor == undefined) this.setCursor(input, 3);
						else this.setCursor(input, posCursor);
					}
					if (posCursor > 3) {
						// Если позиция курсора в поле формы больше 3, обнуляем счётчик this.count_pos_3.
						this.count_pos_3 = 0;
					}
				}
			},

			/**
			 * Метод устанавливает курсор в указанную позицию. Любая установка курсора в поле формы должна идти через этот метод,
			 * так как метод передвигает курсор за символы ")" и "-".
			 *
			 * @param input
			 *  Объект элемента поля ввода номера телефона.
			 * @param posCursor
			 *  Позиция курсора в поле формы ввода номера сотвого телефона.
			 */
			setCursor: function(input, posCursor) {
				if (posCursor == 6) {
					this.setCursorPosition(input, 7, 7);
				}
				else {
					if (posCursor == 10) {
						this.setCursorPosition(input, 11, 11);
					}
					else {
						if (posCursor == 13) {
							this.setCursorPosition(input, 14, 14);
						}
						else {
							this.setCursorPosition(input, posCursor, posCursor);
						}
					}
				}
			},

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
			setCursorPosition: function(oInput, oStart, oEnd) {
                if (oInput.setSelectionRange) {
					oInput.setSelectionRange(oStart, oEnd);
				}
				else if (oInput.createTextRange) {
					range = oInput.createTextRange();
					range.collapse(true);
					range.moveEnd('character', oEnd);
					range.moveStart('character', oStart);
					range.select();
				}
			},

            /**
             * Метод получает позицию курсора внутри формы.
             *
             * @param input
			 *  Объект элемента поля ввода номера телефона.
             */
            getCursorPosition: function(input) {
                if (input.selectionStart) {
                    // Стандартные браузеры MazillaFireFox, Opera, Chrom.
                    return input.selectionStart;
                }
                else if (document.selection) {
                    // IE.
                    input.focus();
                    var sel = document.selection.createRange();
                    var selLen = document.selection.createRange().text.length;
                    sel.moveStart('character', -input.value.length);
                    return sel.text.length - selLen;
                }
            },

            /**
             * Метод события возврата клавиши из нажатого состояния.
             *
             * @param eventObj
             *  Объект события.
             * @param input
			 *  Объект элемента поля ввода номера телефона.
             */
            keyup: function(eventObj, input) {
				// Определяем позицию установки курсора пользователем.
				var posCursor = this.getCursorPosition(input);
				// Так как в шаблоне template_tel позиция курсора будет отличаться от позиции курсора в clean_tel из-за
				// символов: +7(, ), -, найдем позицию курсора в clean_tel.
				if (posCursor >= 3 && posCursor <= 5) var posClean_tel = posCursor - 3;
				if (posCursor >= 7 && posCursor <= 9) var posClean_tel = posCursor - 4;
				if (posCursor >= 11 && posCursor <= 12) var posClean_tel = posCursor - 5;
				if (posCursor >= 14 && posCursor <= 15) var posClean_tel = posCursor - 6;
				// Определяем категорию кода.
				if (eventObj.which >= 48 && eventObj.which <= 57) {
					// Если передан цифровой код.
					// По коду символа определяем его строковой символ.
                    if (eventObj.which == 48) var symbol = '0';
                    if (eventObj.which == 49) var symbol = '1';
                    if (eventObj.which == 50) var symbol = '2';
                    if (eventObj.which == 51) var symbol = '3';
                    if (eventObj.which == 52) var symbol = '4';
                    if (eventObj.which == 53) var symbol = '5';
                    if (eventObj.which == 54) var symbol = '6';
                    if (eventObj.which == 55) var symbol = '7';
                    if (eventObj.which == 56) var symbol = '8';
                    if (eventObj.which == 57) var symbol = '9';
					// Вставляем символ в clean_tel, введёный с клавиатуры.
					if (posClean_tel == 0) {
						var startText = symbol;
						var endText = this.clean_tel.substring(0, 9);
						this.clean_tel = startText.concat(endText);
					}
					if (posClean_tel == 9) {
						var startText = this.clean_tel.substring(0, 9);
						var endText = symbol;
						this.clean_tel = startText.concat(endText);
					}
					if (posClean_tel >= 1 && posClean_tel <= 8) {
						var startText = this.clean_tel.substring(0, posClean_tel);
						var endText = this.clean_tel.substring(posClean_tel, 9);
						this.clean_tel = startText.concat(symbol, endText);
					}
					// Обрезаем лишние символы.
					this.clean_tel = this.clean_tel.substr(0, 10);
					this.insertInTemplate(input);
					this.setCursor(input, posCursor + 1);
				}
				else if (eventObj.which == 8) {
					// Если передан код Del.
					if (posClean_tel == undefined) {
						// Если переменная posClean_tel не определена. Это может быть в том случае, если позиция курсора попала после
						// символа "-" или ")".
						if (posCursor == 13) {
							var posClean_tel = 7;
							posCursor = 12;
						}
						if (posCursor == 10) {
							var posClean_tel = 5;
							posCursor = 9;
						}
						if (posCursor == 6) {
							var posClean_tel = 2;
							posCursor = 5;
						}
						if (posCursor <= 3) {
							var posClean_tel = 0;
							posCursor = 3;
						}
					}
					var new_clean_tel = '';
					if (posCursor == 3) {
						// Если курсор достиг позиции 3.
						this.count_pos_3++;
					}
					else this.count_pos_3 = 0;
					if (this.count_pos_3 <= 1) {
						for (var i = 0; i < 10; i++) {
							if (i != posClean_tel) new_clean_tel = new_clean_tel + this.clean_tel.charAt(i);
						}
					}
					else new_clean_tel = this.clean_tel;
					this.clean_tel = new_clean_tel;
					this.insertInTemplate(input);
					this.setCursor(input, posCursor);
				}
			},

			/**
			 * Вставляет данные из this.clean_tel в шаблон this.template_tel, результат вставляет в форму.
			 *
			 * @param input
			 *  Объект элемента поля ввода номера телефона.
			 */
			insertInTemplate: function(input) {
                var new_template_tel = this.template_tel;
                for (var i = 0; i < 10; i++) {
                	if (this.clean_tel.charAt(i)) {
                		// Если в this.clean_tel существует цифра.
                		new_template_tel = new_template_tel.replace('_', this.clean_tel.charAt(i));
                	}
                	else break;
                }
                input.value = new_template_tel;
			}

        };

        // ПРИМЕР: Для текстового поля с id = 'tel'.
        // Инициализация объекта.
        tel.id = 'tel';
        tel.init();

    });

})(jQuery);
