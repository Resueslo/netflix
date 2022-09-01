let idActor;

init = () => {
    //obtener parametros
    const urlParams = new URLSearchParams(window.location.search);
    idActor = urlParams.get('id');

    if (!Number(idActor)) {
        window.location = "principal.html";
    }

    obtenerImagenActor(idActor);
    obtenerBiografiaActor(idActor);
    obtenerPeliculasActor(idActor);
}

obtenerImagenActor = id => {
    let elImgBanner = document.getElementById("imgBanner");

    obtenerPeliculas(id).then((person) => {
        if (person.cast) {
            ImagenAutor(person.cast);
        }
    })
}

ImagenAutor = (cast) => {
    let elImgBanner = document.getElementById("imgBanner");

    elImgBanner.setAttribute("src", `${URL_IMAGES}/original/${cast[0].backdrop_path}`);
};

obtenerBiografiaActor = id => {
    let nombreAutor = document.getElementById("autor");
    let biography = document.getElementById("biography");
    let fechaNacimiento = document.getElementById("fechaNacimiento");
    let lugarNacimiento = document.getElementById("lugarNacimiento");
    let imgActor = document.getElementById("imgActor");

    obtenerBiografia(id).then((biografia) => {
        let a = document.createElement('a');
        a.innerText = biografia.biography;

        nombreAutor.innerText = biografia.name;
        biography.appendChild(a);
        fechaNacimiento.innerText = moment(biografia.birthday).format("DD/MM/YYYY");
        lugarNacimiento.innerText = biografia.place_of_birth;

        imgActor.setAttribute("src", `${URL_IMAGES}/original/${biografia.profile_path}`)

    })
}

obtenerPeliculasActor = id => {
    let contenedorPeliculasPorActor = document.getElementById("contenedorPeliculasPorActor");
    obtenerPeliculas(id).then((pelicula) => {

        if (pelicula.cast) {
            Peliculas(pelicula.cast);
        }
    })
}

Peliculas = (cast) => {
    let contenedorPeliculasPorActor = document.getElementById("contenedorPeliculasPorActor");

    cast.forEach(pelicula => {
        if (pelicula.poster_path) {
            let card = document.createElement('div');
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

            contenedorPeliculasPorActor.appendChild(card);
        }
    })

};

init();