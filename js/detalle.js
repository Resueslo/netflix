let idPelicula;
let elenco;
let tipo;
init = () => {
    //obtener parametros
    const urlParams = new URLSearchParams(window.location.search);
    idPelicula = urlParams.get('id');
    tipo = urlParams.get('type');

    if(!Number(idPelicula)) {
        window.location = "index-moy.html";
    }

    obtenerDetalle(idPelicula);
    obtenerCreditos(idPelicula);
    obtenerRecomendaciones(idPelicula);
    obtenerCertificacion(idPelicula);
}


obtenerDetalle = id => {
    let elImgBanner = document.getElementById("imgBanner");
    let elTituloPelicula = document.getElementById("tituloPelicula");
    let elDescripcion = document.getElementById("descripcion");
    let elGeneros = document.getElementById("genero");
    let elFecha = document.getElementById("fecha");
    let elProduccion = document.getElementById("produccion");
    let btnReproducirBanner = document.getElementById("btnReproducirBanner");

    if(tipo == 'tv'){
        getDetailTV(id).then((movie) => {
            console.log(movie)
            elImgBanner.setAttribute("src", `${URL_IMAGES}/original/${movie.backdrop_path}`);
            imgBanner.setAttribute("alt", movie.name);
            btnReproducirBanner.setAttribute("href", `reproductor.html?id=${movie.id}`);
            elTituloPelicula.innerText = movie.name;
            elDescripcion.innerText = movie.overview;
            elGeneros.innerText = generarString(movie.genres);
            elFecha.innerText = moment(movie.first_air_date).format("YYYY");
            elProduccion.innerText = generarString(movie.production_companies);
        });
    }else{
    obtenerDetallePelicula(id).then((movie) => {
        console.log(movie)
        elImgBanner.setAttribute("src", `${URL_IMAGES}/original/${movie.backdrop_path}`);
        imgBanner.setAttribute("alt", movie.title);
        btnReproducirBanner.setAttribute("href", `reproductor.html?id=${movie.id}`);

        elTituloPelicula.innerText = movie.title;
        elDescripcion.innerText = movie.overview;
        elGeneros.innerText = generarString(movie.genres);
        elFecha.innerText = moment(movie.release_date).format("YYYY");
        elProduccion.innerText = generarString(movie.production_companies);
    });
    }
    
}

obtenerCreditos = id => {
    obtenerCreditosPelicula(id).then((creditos) => {
        console.log("creditos", creditos)

        if(creditos.cast) {
            elenco = creditos.cast;
            generarElenco(creditos.cast, true);
        }
        
    })
}

generarElenco = (cast, limitado) => {
    let elElenco = document.getElementById("elenco");
    elElenco.innerHTML = "";
    for(let index=0; index < cast.length; index++) {
        let actor = cast[index];
        let a =  document.createElement('a');
        a.addEventListener("click", (e) => {
            window.location = `actores.html?id=${actor.id}`;
         })
        a.classList = "link-actor";
        a.innerText = `${actor.name}${limitado && index == 14 ? '...' : index == cast.length-1 ? '' : ', '} `;

        elElenco.appendChild(a);
        
        if(limitado && index == 15) {
            a.setAttribute("href", "#")
            a.setAttribute("id", "verMas");
            a.addEventListener("click", (e) => {
                e.preventDefault();
                generarElenco(elenco, false);
            })
            a.innerHTML = "Ver más"
            elElenco.appendChild(a);
            break;
        }
    }
};


obtenerRecomendaciones = id => {
    let elRecomendaciones = document.getElementById("contenedorRecomendaciones");
    if(tipo=="tv"){
        obtenerRecomendacionesTV(id).then((recomendaciones) => {
            console.log("recomendaciones", recomendaciones)
    
            recomendaciones.forEach(pelicula => {
                if(pelicula.poster_path) {
                    let card =  document.createElement('div');
                    card.classList = "card mb-2 poster-pelicula";
                    card.setAttribute("id", pelicula.id);
                    card.addEventListener("click", e => {
                        window.location = `detalle.html?id=${pelicula.id}&type=${tipo}`;
                    });
    
                    card.innerHTML = `
                        <img src="${URL_IMAGES}/w500/${pelicula.poster_path}" alt="${pelicula.name}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${pelicula.name}</h5>
                        </div>
                    `;
    
                    elRecomendaciones.appendChild(card);
                }
            });
        });
    }else{
    obtenerRecomendacionesPeliculas(id).then((recomendaciones) => {
        console.log("recomendaciones", recomendaciones)

        recomendaciones.forEach(pelicula => {
            if(pelicula.poster_path) {
                let card =  document.createElement('div');
                card.classList = "card mb-2 poster-pelicula";
                card.setAttribute("id", pelicula.id);
                card.addEventListener("click", e => {
                    window.location = `detalle.html?id=${pelicula.id}`;
                });

                card.innerHTML = `
                    <img src="${URL_IMAGES}/w500/${pelicula.poster_path}" alt="${pelicula.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${pelicula.title}</h5>
                    </div>
                `;

                elRecomendaciones.appendChild(card);
            }
        });
    });
    }
}


obtenerCertificacion = id => {
    let elCertificacion = document.getElementById("certificacion");
    obtenerFechasYCertificacion(id).then((fechas) => {
        console.log("fechas", fechas)

        let fecha = fechas.find(fecha => fecha.iso_3166_1 == "US");

        if(fecha) {
            elCertificacion.innerText = fecha.release_dates[0].certification;
        }

    })
}




generarString = (array) => {
    let cadena = "";

    if(array.length) {
        array.forEach((element, index) => {
            cadena += `${element.name}${index == array.length-1 ? '' : ', '}`;
        });
    }
    return cadena;
}



init();