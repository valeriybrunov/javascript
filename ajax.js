(function($) {
    $(document).ready(function() {

    	var data = {
    		name: 'valera',
    		soname: 'brunov'
    	}

    	$.ajax({
    		url: 'users/',
    		type: 'POST',
    		data: data,
    		dataType: 'html',// json
    		cache: false,
    		beforeSend: function() {
    			// Перед отправкой AJAX-запроса.
    		},
    		success: function( html ) {
    			// Запрос успешно вернул данные.
    		},
    		error: function() {
    			// Ошибка AJAX-запроса.
    		}
    	});

    });
})(jQuery);