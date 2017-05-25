(function($) {
    $(document).ready(function() {

    	/**
    	 * МОДАЛЬНЫЕ ОКНА.
    	 * 
    	 * 1. Ссылка (кнопка) для открытия модального окнадолжна содержать класс "openModal", а в аттребуте href содержать
    	 * символ # (рушётка) и id модального окна. Например:
    	 * Ссылка, открывающая модальное окно:
    	 *  <a href="#modal-reg" class="openModal">Регистрация</a>
    	 * Оболочка модального окна:
    	 *  <div id="modal-reg" class="modal"><div>Содержимое</div></div>
    	 * 2. Модальное окно должно идти сразу за тэгом <body>.
    	 */
    	var Modal = function() {

    		// ----------------------------
			// Приватные свойства и методы.
			// ----------------------------

    		// Экземпляр сохраняет ссылку на Синглтон.
			var instance;

			/**
			 * Функция - Cинглтон.
			 */
			function Singleton() {

				// ----------------------------
				// Приватные свойства и методы.
				// ----------------------------

				// id последнего открытого модального окна.
				var id_modal_ = '';
				// Ссылка на модальное окно.
				var modal_ = '';
				// Высота окна браузера.
            	var h_win_ = 0;
            	// Тушка.
            	var body_ = $( 'body' );
            	// Ссылка на затемняющий слой overlay.
            	var overlay_ = '';
            	// Ссылка на основной слой модального окна.
            	var id_modal_div_ = 0;
            	// Высота модального окна.
            	var h_modal_ = 0;
            	// Помогает различать клики в пределах или за границей модального окна.
            	var e = 1;

            	/**
            	 * Методы устанавливающие свойства.
            	 */
            	function id_modal( eventObj ) {
            		id_modal_ = eventObj.currentTarget.attributes.href.nodeValue.slice(1);
            		modal_ = $( '#' + id_modal_ );
            		id_modal_div();
            	}
            	function h_win() {
            		h_win_ = $( window ).height();
            	}
            	h_win();
            	function overlay() {
            		overlay_ = $( '#overlay' );
            	}
            	function id_modal_div() {
            		id_modal_div_ = $( '#' + id_modal_ + ' div' );
            	}
            	function h_modal() {
            		h_modal_ = id_modal_div_.height();
            	}

        	 	/**
				 * Открывает модальное окно.
				 */
        	 	function open( eventObj ) {
        	 		id_modal( eventObj );
		    		body_.addClass( 'modalBody' );
		    		modal_.before( '<div id="overlay" style="position:absolute;width:100%;overflow:hidden;z-index:99;height:' + h_win_ + 'px;"></div>' );
		    		overlay();
		    		modal_.height( h_win_ ).css( 'display', 'block' );
		    		h_modal();
		    		var f = formatModal();
		    		if ( f == 'center' ) {
		    			var margin = Math.floor(( h_win_ - h_modal_ ) / 2);
		    			id_modal_div_.css( 'margin-top', margin );
		    		}
		    		else {
		    			if ( f == 'indent' ) {
		    				id_modal_div_.addClass( 'indent' );
		    			}
		    		}
        	 	}

        	 	/**
				 * Закрывает модальное окно.
				 */
        	 	function close() {
        	 		modal_.css( 'display', 'none' ).removeAttr( 'style' );
        	 		overlay_.remove();
        	 		//modal_.removeAttr( 'style' );
        	 		body_.removeClass( 'modalBody' );
        	 		id_modal_div_.removeAttr( 'style' ).removeClass( 'indent' );
        	 		reset();
        	 	}

        	 	/**
        	 	 * Возвращает всем свойствам первоночальные состояния.
        	 	 */
        	 	function reset() {
        	 		id_modal_ = '';
        	 		modal_ = '';
        	 		overlay_ = '';
        	 		h_modal_ = 0;
        	 		id_modal_div_ = 0;
        	 	}

        	 	/**
	    		 * Определяет в зависимости от высоты модального окна, как форматировать модальное окно (по центру, с отступами сверху и снизу).
	    		 * @return
	    		 *  'center' - модальное окно необходимо показывать по центру.
	    		 *  'equally' - к модальному окну не надо применять какое-либо форматирование.
	    		 *  'indent' - к модальному окну необходимо применить отступы.
	    		 */
	    		function formatModal() {
	    			if ( h_win_ > h_modal_ ) return 'center';
	    			else {
	    				if ( h_win_ < h_modal_ ) return 'indent';
	    				else {
	    					if ( h_win_ == h_modal_ ) return 'equally';
	    				}
	    			}
	    		}

			    return {

			       	// ----------------------------
				   	// Публичные методы и свойства.
				   	// ----------------------------

					/**
					 * Описание событий.
					 */
				   	start: function() {
				   		// Клик по ссылке открытия модального окна.
				   		$( 'a.openModal' ).on('click', function( eventObj ) {
				   			if ( id_modal_ == '' ) open( eventObj );
				   			else {
								close();
								open( eventObj );
							}
        	 			});
        	 			// Клик по ссылке закрытия модального окна.
        	 			$( 'a.closeModal' ).on('click', function( eventObj ) {
				   			close();
        	 			});
        	 			// Следующие два события происходят одновременно, если курсор находится
        	 			// в пределах модального окна, но событие 2 происходит перед событием 1.
        	 			// 1. Клик за пределами модального окна.
        	 			$( 'div.modal' ).on('click', function( eventObj ) {
				   			if ( e == 1 ) close();
				   			else e = 1;
        	 			});
        	 			// 2. Клик в районе модального окна.
        	 			$( 'div.modal div' ).on('click', function( eventObj ) {
        	 				e = 2;
        	 			});

        	 			// Событие - изменение окна браузера.
        	 			$( window ).resize(function() {
        	 				if ( id_modal_ == '' ) h_win();
        	 				else {
        	 					var i = id_modal_;
        	 					close();
        	 					h_win();
        	 					$( 'a[href="#' + i + '"]' ).click();
        	 				}
						});
				   	}

			    };
			};
			return {

				// ----------------------------
				// Публичные методы и свойства.
				// ----------------------------

        	 	/**
        	 	 * Метод запуска (инициализации).
        	 	 */
				init: function() {
				    if ( !instance ) {
				        instance = Singleton();
				    }
	    			return instance;
    			},
			};
    	};
    	var modal = new Modal();
    	modal.init().start();

    });
})(jQuery);
