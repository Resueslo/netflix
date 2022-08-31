let idPelicula;
let elenco;

init = () => {
    //obtener parametros
    const urlParams = new URLSearchParams(window.location.search);
    idPelicula = urlParams.get('id');

    if(!Number(idPelicula)) {
        window.location = "index-moy.html";
    }

    obtenerVideoPelicula(idPelicula);
}


obtenerVideoPelicula = id => {
    let elIframe = document.getElementById("iframeTrailer");

    obtenerVideosPelicula(id).then((videos) => {
        console.log(videos);

        if(videos && videos.length) {
            let trailer = videos.find(video => video.type == "Trailer");

            !trailer ? trailer = videos[0] : null;

            elIframe.setAttribute("src", `https://www.youtube.com/embed/${trailer.key}`);
        }
    })
}


init();