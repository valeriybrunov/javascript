(function($) {
    $(document).ready(function() {

        var Modal = function() {

            // ----------------------------
            // Приватные свойства и методы.
            // ----------------------------

            var winH, pageH;
            var id_modal, body_, scrollTop;
            var fade, obolochka;
            var om = 0;
            var e = 1;

            /**
             * Основные свойства всплывающего окна.
             */
            function propertiesAll() {
                // Высота окна браузера.
                winH = document.documentElement.clientHeight;
                // Объект body.
                body_ = $( 'html body' );
                // Высота всего документа с учетом прокрутки (для всех браузеров), включая его невидимую часть (если такая область имеется).
                bodyH = Math.max(
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight,
                        document.body.offsetHeight,
                        document.documentElement.offsetHeight,
                        document.body.clientHeight,
                        document.documentElement.clientHeight
                    );
                // Высота невидимой верхней части страницы (для всех браузеров).
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                // Объект оболочки.
                obolochka = id_modal.children();
            }

            /**
             * Открывает модальное окно.
             */
            function openModal( id_modal_ ) {
                if ( om == 1 ) om = 2;
                closeModal();
                id_modal = $( '#' + id_modal_ );
                propertiesAll();
                if ( om != 2 ) body_.addClass( 'modalBody' ).prepend( '<div class="abs" id="overlay" style="width:100%;overflow:hidden;z-index:2000;height:' + bodyH + 'px;"></div>' );
                if ( fade ) id_modal.fadeIn( fade );
                else id_modal.fadeIn();
                var modalH = obolochka.height();
                obolochka.removeClass( 'modal-obolochka-2' ).removeClass( 'modal-obolochka' ).removeClass( 'abs' );
                if ( modalH < winH ) obolochka.addClass( 'abs modal-obolochka-2' );
                else obolochka.removeClass( 'abs' ).addClass( 'modal-obolochka' );
                //obolochka.scrollTop(0);
                om = 1;
            }

            /**
             * Закрывает модальное окно.
             */
            function closeModal() {
                if ( om == 1 ) {
                    // Если модальное окно открыто.
                    propertiesAll();
                    body_.removeClass( 'modalBody' );
                    $( '#overlay' ).remove();
                    obolochka.removeClass( 'modal-obolochka' ).removeClass( 'modal-obolochka-2' ).removeClass( 'abs' );
                    id_modal.hide();
                    // Модальное окно закрыто.
                    om = 0;
                }
                else if ( om == 2 ) {
                    // Если модальное окно открыто, но подана команда открыть другое модальное окно.
                    obolochka.removeClass( 'modal-obolochka' ).removeClass( 'modal-obolochka-2' ).removeClass( 'abs' );
                    id_modal.hide();
                }
            }

            /**
             * Событие - изменение размеров окна браузера.
             */
            $( window ).resize(function() {
                var modalH = obolochka.height();
                propertiesAll();
                if ( modalH < winH ) {
                    obolochka.removeClass( 'modal-obolochka-2' ).removeClass( 'modal-obolochka' ).removeClass( 'abs' );
                    obolochka.addClass( 'abs modal-obolochka-2' );
                }
                else {
                    obolochka.removeClass( 'modal-obolochka-2' ).removeClass( 'modal-obolochka' ).removeClass( 'abs' );
                    obolochka.removeClass( 'abs' ).addClass( 'modal-obolochka' );
                }
            });

            /**
             * Следующие два события происходят одновременно, если курсор находится в пределах модального окна, но событие 2 происходит перед событием 1.
             */
            // Событие 1: клик за пределами модального окна.
            $( 'div.modal' ).on('click', function( eventObj ) {
                if ( e == 1 ) closeModal();
                else e = 1;
            });
            // Событие 2: клик в районе модального окна.
            $( 'div.modal div' ).on('click', function( eventObj ) {
                e = 2;
            });

            return {

                // ----------------------------
                // Публичные методы и свойства.
                // ----------------------------

                /**
                 * Инициализация.
                 */
                init: function( fade_ ) {
                    if ( fade_ != '' ) fade = fade_;
                    else fade = null;
                },

                /**
                 * Открывает модальное окно.
                 */
                open: function( id_modal_ ) {
                    openModal( id_modal_ );
                },

                /**
                 * Закрывает модальное окно.
                 */
                close: function() {
                    closeModal();
                }

            };
        };

    	var modal_ = new Modal();
        window.modal =  modal_;
    	modal_.init(1000);

    });
})(jQuery);
