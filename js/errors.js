
    /** ERRORES */
	/*USO
	Import= <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	 alert(t="Error!",msj="Error Usuario o Contraseña Incorrecto",type="error");
	 t= el titulo el texto que saldra arriba
	 msj= mensaje del modal
	 type= el diseño que saldra del modal puede ser success,ingo,warning,error etc
	*/
    function alert(t,msj,type){ 
        Swal.fire({
            title: t,
            text: msj,
            icon: type,
            confirmButtonText: 'Ok'
        })}