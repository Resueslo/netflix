
let API_KEY = "f28711faa6dd23ead57c3434bcbea433";
let imageUrl="https://image.tmdb.org/t/p/w220_and_h330_face";


    async function getMovie(id) {
    
    let url =`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    try {
        let response = await axios.get(url)
        return response.data
    } catch (e) {
        console.log(e)
        return null;
    }
    }

    async function getLatestMovies() {
        let moviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        try {
            let response = await axios.get(moviesUrl);
            return response.data.results
        } catch (e) {
            return []
        }
    }

    
    function setImage(id,url,div){
        const categoria=document.getElementById(div);
        const image = document.createElement('img');
            image.setAttribute('id',id);
            image.setAttribute('src',url);
            image.setAttribute('class','row__poster');
            categoria.appendChild(image);
    }


    getLatestMovies().then((movies) => {
        for (let movie of movies) {
            console.log(movie)
            const url= imageUrl+movie.poster_path;
            console.log(url);
            setImage(movie.id,url,'top_rated');
        }
    })