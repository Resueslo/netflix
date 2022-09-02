const elIconoBusqueda = document.getElementById("iconoBusqueda");
let elinputBusqueda = document.getElementById("inputBusqueda");
const modalBusqueda = document.getElementById('modalBusqueda');

const myModal = new bootstrap.Modal('#modalBusqueda', {
  keyboard: false
})

elIconoBusqueda.addEventListener("click", () => {
  if (elinputBusqueda.classList.contains("d-none")) {
    elinputBusqueda.classList.remove("d-none");
  }

  if (elinputBusqueda.value) {
    obtenerBusqueda(elinputBusqueda.value);
    obtenerPeliculasRelacionadasBusqueda(elinputBusqueda.value);
  }
})

//
obtenerBusqueda = busqueda => {
  let elTitulosRelacionados = document.getElementById("titulosRelacionados");
  obtenerBusquedasPalabras("multi", busqueda).then((respuesta) => {

    // Abrir modal
    myModal.show();

    document.getElementById("tituloBusqueda").innerText = busqueda;
    document.getElementById("tituloBusqueda2").innerText = busqueda;

    if (respuesta.length) {
      respuesta.forEach((item, index) => {
        let a = document.createElement('a');
          a.setAttribute("href", "#");
          a.innerText = `${item.title ? item.title : item.name}${index == respuesta.length - 1 ? '' : ' | '}`;
          a.addEventListener("click", (e) => {
            e.preventDefault();
            window.location = item.media_type == "movie" ? `detalle.html?id=${item.id}` : `actores.html?id=${item.id}`;
          });

          elTitulosRelacionados.appendChild(a);
      });
    }
  })
}

// OBTENER LA PELICULAS RELACIONADAS CON LA BUSQUEDA
obtenerPeliculasRelacionadasBusqueda = busqueda => {
  let elRecomendaciones = document.getElementById("contenedorRecomendacionesBusqueda");
  obtenerBusquedasPalabras("movie", busqueda).then((respuesta) => {

    if (respuesta.length) {
      respuesta.forEach(pelicula => {
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

          elRecomendaciones.appendChild(card);
        }
      })
    }
  })
}

getGenreMovies().then((movies)=>{
  let select=document.getElementById('genres');
  select.innerHTML = "";
  for(let movie of movies.genres){

      let li =  document.createElement('li');            
      li.innerHTML = `
          <a class="dropdown-item" href="genre.html?id=${movie.id}&g=${movie.name}">${movie.name}</a>
      `;
      select.appendChild(li);
  };
});

// AL CERRAR MODAL DE BUSQUEDA
modalBusqueda.addEventListener('hidden.bs.modal', event => {
  let elRecomendaciones = document.getElementById("contenedorRecomendacionesBusqueda");
  let elTitulosRelacionados = document.getElementById("titulosRelacionados");
  elinputBusqueda.value = "";
  elRecomendaciones.innerHTML = "";
  elTitulosRelacionados.innerText = "";
})