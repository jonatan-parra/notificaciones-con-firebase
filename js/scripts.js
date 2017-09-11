(function(){
// Initialize Firebase
  const config = {
    apiKey: "AIzaSyB2MOmi6MvqIJDs3zFWWg_cMtKWsklFQ3s",
    authDomain: "notificaciones-github.firebaseapp.com",
    databaseURL: "https://notificaciones-github.firebaseio.com",
    projectId: "notificaciones-github",
    storageBucket: "notificaciones-github.appspot.com",
    messagingSenderId: "36745106882"
  };
  firebase.initializeApp(config);

  // Crear referencias
  const dbRefList = firebase.database().ref().child('notificaciones');

  // Sincronizar cambios objeto
  dbRefList.orderByKey().on('child_added', snap => {
  addFila(snap);
  });

  // Sincronizar cambios lista
  dbRefList.orderByKey().on('child_changed', snap =>{
    console.log("Key de firebase ");
    $('#'+snap.key).remove();
    addFila(snap);
  });


  // Sincronizar removidos en la lista
  dbRefList.on('child_removed', snap =>{
    $('#'+snap.key).remove();
  });

  function addFila(snap) {
  	notificacion = snap.val();
  	console.log("valor: " + notificacion.asunto);
  	$("#tbody_tabla_notificaciones").append("<tr id='" + snap.key + "'>" + 
  		"<td class='td_usuario'>" + notificacion.usuario + "</td>"+ 
  		"<td class='td_asunto'>" + notificacion.asunto + "</td>" +
  		"<td class='td_contenido'>" + notificacion.contenido + "</td>" +
  		"<td class='td_visualizado'>" + notificacion.visualizado + "</td>" +	
  		"</tr>");

  	if (notificacion.visualizado == false){
  		Command: toastr["success"](notificacion.contenido, notificacion.asunto)
		toastr.options = {
		  "closeButton": true,
		  "debug": true,
		  "newestOnTop": true,
		  "progressBar": true,
		  "positionClass": "toast-top-right",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}	
  	}



  }

  //addUsuario("usu_7", "correo6", "nombre3");
  function addUsuario(id, correo1, nombre1) {
	  var referencia = firebase.database().ref('usuarios');
	  ref_id = referencia.push().set({
	    correo: correo1,
	    nombre: nombre1
	  });
	  console.log(ref_id);
  }

  // Obtiene los datos para crear un nuevo archivo
	$('#form_notificacion').submit(function(evento) {
	  evento.preventDefault();
	  input_correo = $('#input_correo').val();
	  input_asunto = $('#input_asunto').val();
	  input_contenido = $('#input_contenido').val();

	  firebase.database().ref('notificaciones').push().set({
	  	usuario: input_correo,
	    asunto: input_asunto,
	    contenido: input_contenido,
	    visualizado: false
	  });
	});

  //addNotificacion("asunto3", "contenido 3", "jonatan@unal.edu.co" )
  function addNotificacion(asunto, contenido, id_usu) {
	  firebase.database().ref('notificaciones').push().set({
	  	usuario: id_usu,
	    asunto: asunto,
	    contenido: contenido,
	    visualizado: false
	  });
  }

}());

