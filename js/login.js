var array = ['yuriviaos@coppel.com', 'reynaes@coppel.com', 'moisessaninz@coppel.com']
var password = ['1a23', '1234b', '5678c']

function validarCredenciales() {
    let usuario = '';
    usuario = document.getElementById("text").value;
    let nip = '';
    nip = document.getElementById("password").value;
    let encontroUsuario = 0;

    if (usuario != "" && nip != "") {

        for (var i = 0; i < array.length; i++) {
            let nombre = array[i];
            if (usuario == nombre) {
                for (var y = 0; y < password.length; y++) {
                    let contrasena = password[y];

                    if (i == y) {
                        if (contrasena == nip) {
                            encontroUsuario = 1;
                            window.open("home.html");
                        }
                    }
                }
            }
        }

        if (encontroUsuario == 0) {
            alert("Credenciales invalidas");
        }

    } else {
        alert("Favor de capturar un Usuario y una contraseña");
    }
}



