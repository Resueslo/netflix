const URL_API = "https://api.themoviedb.org/3";
const API_KEY_REYNA = "9eb4e5199ac559b2a5a63d0b43ea5c76";

const URL_IMAGES = "https://image.tmdb.org/t/p";


async function obtenerUltimasPeliculas() {
    let moviesUrl = `${URL_API}/movie/now_playing?api_key=${API_KEY_REYNA}&language=en-US&page=1`;

    try {
        let response = await axios.get(moviesUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function obtenerDetallePelicula(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}?api_key=${API_KEY_REYNA}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data
    } catch (e) {
        return []
    }
}

async function obtenerCreditosPelicula(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}/credits?api_key=${API_KEY_REYNA}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data
    } catch (e) {
        return []
    }
}

async function obtenerRecomendacionesPeliculas(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}/recommendations?api_key=${API_KEY_REYNA}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function obtenerFechasYCertificacion(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}/release_dates?api_key=${API_KEY_REYNA}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function obtenerBusquedasPalabras(busqueda, texto) {
    let movieUrl = `${URL_API}/search/${busqueda}?api_key=${API_KEY_REYNA}&language=en-US&query=${texto}&page=1&include_adult=false`;

    try {
        let response = await axios.get(movieUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}


async function getGenreMovies() {
    let moviesUrl = `${URL_API}/genre/movie/list?api_key=${API_KEY_REYNA}&language=en-US`;
    try {
        let response = await axios.get(moviesUrl);
        return response.data;
    } catch (e) {
        return []
    }
}
async function getDetailTV(id) {
    let movieUrl = `${URL_API}/tv/${id}?api_key=${API_KEY_REYNA}&language=en-US`;
    try {
        let response = await axios.get(movieUrl);
        return response.data
    } catch (e) {
        return []
    }
}

async function getTrending(option) {
    let moviesUrl = `${URL_API}/trending/${option}/day?api_key=${API_KEY_REYNA}&language=en-US`;
    try {
        let response = await axios.get(moviesUrl);
        return response.data.results.splice(0,15);
    } catch (e) {
        return []
    }
}

async function obtenerVideosPelicula(id) {
    let movieUrl = `${URL_API}/movie/${id}/videos?api_key=${API_KEY_REYNA}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function obtenerPeliculas(id_person) {
    let movieUrl = `${URL_API}/person/${id_person}/movie_credits?api_key=${API_KEY_REYNA}&language=en-US`;
    console.log("PeliculasPorAutor",movieUrl);
    try {
        let response = await axios.get(movieUrl);
        return response.data
    } catch (e) {
        return []
    }
}

async function obtenerBiografia(id_person) {
    let movieUrl = `${URL_API}/person/${id_person}?api_key=${API_KEY_REYNA}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data
    } catch (e) {
        return []
    }
}