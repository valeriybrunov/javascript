		var Modal = function() {

    		/**
        	 * Приватные свойства синглтона.
        	 */
    		// Экземпляр сохраняет ссылку на Синглтон.
			var instance;

			/**
			 * Функция - синглтон.
			 */
			function Singleton() {

				/**
        	 	 * Приватные свойства и методы.
        	 	 */

			    return {

			       /**
        	 		* Публичные свойства и методы.
        	 		*/


			    };
			};
			return {
				/**
        	 	 * Публичные свойства и методы.
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