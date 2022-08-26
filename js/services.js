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