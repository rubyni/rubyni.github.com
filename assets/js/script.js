//Efecto sobre navbar al momento de iniciar scroll

$(window).scroll(function() {
  if ($(".navbar").offset().top > 50) {
  $(".navbar-fixed-top").addClass("top-nav-collapse");
} else {
$(".navbar-fixed-top").removeClass("top-nav-collapse");
}
});


//jQuery plugin para scrolling en el front-page
$(function() {
$('.page-scroll a').bind('click', function(event) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: $($anchor.attr('href')).offset().top
  }, 1500, 'easeInOutExpo');
  event.preventDefault();
});
});

//Validaciones sobre formulario

jQuery.extend(jQuery.validator.messages, {
  required: "Este campo es obligatorio.",
  remote: "Por favor, rellena este campo.",
  email: "Por favor, escribe una dirección de correo válida",
  url: "Por favor, escribe una URL válida.",
  date: "Por favor, escribe una fecha válida.",
  dateISO: "Por favor, escribe una fecha (ISO) válida.",
  number: "Por favor, escribe un número entero válido.",
  digits: "Por favor, escribe sólo dígitos.",
  creditcard: "Por favor, escribe un número de tarjeta válido.",
  equalTo: "Por favor, escribe el mismo valor de nuevo.",
  accept: "Por favor, escribe un valor con una extensión aceptada.",
  maxlength: jQuery.validator.format("Por favor, no escribas más de {0} caracteres."),
  minlength: jQuery.validator.format("Por favor, no escribas menos de {0} caracteres."),
  rangelength: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
  range: jQuery.validator.format("Por favor, escribe un valor entre {0} y {1}."),
  max: jQuery.validator.format("Por favor, escribe un valor menor o igual a {0}."),
  min: jQuery.validator.format("Por favor, escribe un valor mayor o igual a {0}.")
});

$("#contact-form").validate({
  rules: {
    name: "required",
    email: {
      required: true,
      email: true
    },
    message: "required"
  },
   submitHandler: function(form, event) { 
      event.preventDefault();
   }
});

//Envio de datos del formulario de contacto usando AJAX


// Convertir parametros de formulario en objeto para envio mediante AJAX

(function($){
    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);


//Envio de petición desde formulario por medio de AJAX

$(function() {


    // obtener el formulario.
    var form = $('#contact-form');

    // Obtener div para mensajes.
    var formMessages = $('#mensajes-formulario');

    // Obtener div del formulario
    var formArea = $('#form-area');

    // Obtener boton de enviar
    var botonEnviar = $('#boton-enviar');

    // Event listener para el formulario de contacto.
	$(form).submit(function(event) {
	    // Previene envio de formulario por defecto en el navegador.
	    event.preventDefault();

	    // Serializar los datos del formulario.
		var formData = $(form).serializeObject();

		if(formData.uuid !== "" && formData.name !== "" && formData.menssage !== "") {

			//Cambiar estado de boton enviar

			$(botonEnviar).css( "background-color", "lightseagreen" );
			$(botonEnviar).text('Enviando...');

					// Envio  del formulario usando AJAX.
			$.ajax({
			    type: 'POST',
			    url: $(form).attr('action'),
			    crossDomain: true,
			    contentType: 'text/plain',
			     data: JSON.stringify({
				        uuid: formData.uuid,
				        name: formData.name,
				        subject: 'Mensaje desde RubyNi',
				        email: formData.email,
				        message: formData.message
				    }),
				  headers: {
				    'Content-Type': 'application/json; charset=utf-8'
				  },
				  success: function(data) {
				    $(formMessages).removeClass('alert alert-danger');
				    $(formMessages).addClass('success');
				    $('#boton-enviar').css( "background-color", "rgb(220,20,60)" );
				    $(formArea).html("<div class='alert alert-success' role='alert'> <strong>Tu mensaje ha sido enviado!</strong> Te estaremos contestando a la brevedad posible.</div>");
				  },
				  error: function(data) {
				    // Asegurarse que el formulario de mensajes tiene la clase 'error'
				    $(formMessages).removeClass('alert alert-success');
				    $(formMessages).addClass('alert alert-error');

				    // Imprimir mensaje de error en el div.
				    if (data.responseText !== '') {
				        $(formMessages).text('Ha habido un problema. Mensaje no enviado. (revisa tu conexión)');
				        $(botonEnviar).text('Intenta otra vez')
                $('#boton-enviar').css( "background-color", "green" );
				    } else {
				        $(formMessages).text('Oops! Un error ha ocurrido y su mensaje no ha sido enviado.');
				    }
				  }
			});

		} else {
			$(formMessages).removeClass('alert alert-info');
			$(formMessages).text('Por favor llene todos los parámetros requeridos');
		}




	});


});

