const cargarUltimasPeliculas = () => {
    let seccionReciente = document.getElementById("carruselRecientes");


    obtenerUltimasPeliculas().then((movies) => {
        movies.map(movie => {
            console.log(movie);
            const contenedorPelicula =  document.createElement('div');
            contenedorPelicula.classList = "caja";

            contenedorPelicula.innerHTML = `<img src="${URL_IMAGES}/w500/${movie.poster_path}" alt="${movie.title}">`;

            seccionReciente.appendChild(contenedorPelicula);
        });
    })
}

cargarUltimasPeliculas();