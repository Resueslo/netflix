const URL_API = "https://api.themoviedb.org/3";
const API_KEY = "9eb4e5199ac559b2a5a63d0b43ea5c76";

const URL_IMAGES = "https://image.tmdb.org/t/p";


async function obtenerUltimasPeliculas() {
    let moviesUrl = `${URL_API}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

    try {
        let response = await axios.get(moviesUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function obtenerDetallePelicula(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}?api_key=${API_KEY}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data
    } catch (e) {
        return []
    }
}

async function obtenerCreditosPelicula(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}/credits?api_key=${API_KEY}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data
    } catch (e) {
        return []
    }
}

async function obtenerRecomendacionesPeliculas(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}/recommendations?api_key=${API_KEY}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function obtenerFechasYCertificacion(id_movie) {
    let movieUrl = `${URL_API}/movie/${id_movie}/release_dates?api_key=${API_KEY}&language=en-US`;

    try {
        let response = await axios.get(movieUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function obtenerBusquedasPalabras(busqueda, texto) {
    let movieUrl = `${URL_API}/search/${busqueda}?api_key=${API_KEY}&language=en-US&query=${texto}&page=1&include_adult=false`;

    try {
        let response = await axios.get(movieUrl);
        return response.data.results
    } catch (e) {
        return []
    }
}
