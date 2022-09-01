const API_KEY = "f28711faa6dd23ead57c3434bcbea433";
const imageUrl="https://image.tmdb.org/t/p/w220_and_h330_face";
// const URL_IMAGES = "https://image.tmdb.org/t/p";
const videoUrl="https://www.youtube.com/watch?v="
const detailUrl= "/detalle.html?id=";

async function getMoviesByGenre(id){
    let moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${id}`;
    try {
        let response = await axios.get(moviesUrl);
        console.log(response.data.results);
        return response.data.results
    } catch (e) {
        return []
    }
}

async function getGenreMovies() {
    let moviesUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    try {
        let response = await axios.get(moviesUrl);
        return response.data;
    } catch (e) {
        return []
    }
}

async function screenGenre(){
   
    let divGenre = document.getElementById("genre");
    let elNameGenere = document.getElementById("nameGenere");

    const urlParams = new URLSearchParams(window.location.search);
    idGenre = urlParams.get('id');
    nameGenre = urlParams.get('g');

    let selectInput = document.getElementById('genres');
    selectInput.value=idGenre;
    let movies = await getMoviesByGenre(idGenre);

    elNameGenere.innerText = nameGenre;

    console.log(movies);
      movies.forEach(movie => {
         if(movie.poster_path) {
            let card =  document.createElement('div');
             card.classList = "card mb-2 poster-pelicula";
             card.setAttribute("id", movie.id);
             card.addEventListener("click", e => {
                window.location = `detalle.html?id=${movie.id}`;
            });
            card.innerHTML = `
                    <img src="${URL_IMAGES}/w500/${movie.poster_path}" alt="${movie.title}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                    </div>
                `;
                divGenre.appendChild(card);   
         }
     });
     if(!Number(idGenre)) {
        window.location = "index-moy.html";
    }
       
 };

 
 getGenreMovies().then((movies)=>{
    let select=document.getElementById('genres');
    for(let movie of movies.genres){
    var option = new Option(movie.name,movie.id);
       select.appendChild(option);
    };
    console.log(movies.genres);
});



 screenGenre();