
//let actor="https://api.themoviedb.org/3/search/person?api_key=9eb4e5199ac559b2a5a63d0b43ea5c76&language=en-US&query="+actor+"&page=1&include_adult=false";

const API_KEY = "f28711faa6dd23ead57c3434bcbea433";
const imageUrl="https://image.tmdb.org/t/p/w220_and_h330_face";
//const URL_IMAGES = "https://image.tmdb.org/t/p/w500";
const videoUrl="https://www.youtube.com/watch?v="
const detailUrl= "/detalle.html?id=";


    async function getMovie(id) {
    let url =`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    try {
        let response = await axios.get(url);

        return response.data;
    } catch (e) {
        console.log(e)
        return null;
    }
    }

    async function getLatestMovies() {
        let moviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US`;
        try {
            let response = await axios.get(moviesUrl);
            return response.data.results.slice(0,15);
        } catch (e) {
            return []
        }
    }

    async function getRatedMovies() {
        let moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
        try {
            let response = await axios.get(moviesUrl);
            return response.data.results.slice(0,10);
        } catch (e) {
            return []
        }
    }

    async function getTvShows() {
        let moviesUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US`;
        try {
            let response = await axios.get(moviesUrl);
            return response.data.results.splice(0,15);
        } catch (e) {
            return []
        }
    }

    async function getTrending(option) {
        let moviesUrl = `https://api.themoviedb.org/3/trending/${option}/day?api_key=${API_KEY}&language=en-US`;
        try {
            let response = await axios.get(moviesUrl);
            return response.data.results.splice(0,15);
        } catch (e) {
            return []
        }
    }

    // async function getGenreMovies() {
    //     let moviesUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    //     try {
    //         let response = await axios.get(moviesUrl);
    //         return response.data;
    //     } catch (e) {
    //         return []
    //     }
    // }



    async function setImage(id,url,div,type,bool){
        const category=document.getElementById(div);
        const image = document.createElement('img');
        const href = createAHref(id,bool);
        const span = await createSpan(id);
            image.setAttribute('id',id);
            image.setAttribute('src',url);
            image.setAttribute('class',type);
            category.appendChild(href).appendChild(image);
    }



 

     function createAHref(id,bool){ 
        const link = document.createElement('a');
        if(!bool){
            link.setAttribute('href','#');
            return link;
        }
        link.setAttribute('target','__self');
        link.setAttribute('href',detailUrl+id);
        return link;
        
        
    }

    async function createSpan(id){ 
        const span = document.createElement('span');
           let movie ='#';
       /* let movie = await getMovie(id).then((m)=>{      
                return videoUrl+m.results[0].key?'':'#';          
        });*/
        span.setAttribute('target','__self');
        span.setAttribute('href',movie);
        return span;
    }


    async function createTrending(option,div,url,bool){
        let shows = await getTrending(option);
            for (let movie of shows) {
                const img= url+movie.poster_path;
                console.log(movie)
                setImage(movie.id,img,div,'row__poster',bool);
            }
         } 
    
  getRatedMovies().then((movies) => {
        let i = 0;
        for (let movie of movies) {
            const url=URL_IMAGES+"/w500/"+movie.poster_path;
                setImage(i++,"public/src/images/top10/"+i+".png",'top_10','top10',false);
                setImage(movie.id,url,'top_10','row__poster top10',true);
                   
        }
    });



     getLatestMovies().then((movies) => {
            for (let movie of movies) {
            const url= imageUrl+movie.poster_path;
            setImage(movie.id,url,'top_rated','row__poster',true);

        }
        createBanner(movies)
    });

    getTvShows().then((shows)=>{
        console.log(shows);
         for (let movie of shows) {
             const url= URL_IMAGES+"/w500/"+movie.poster_path;
             setImage(movie.id,url,'tv_shows','row__poster',true);
         }
         });
        


        createTrending('movie','trending',URL_IMAGES+"/w500/",true);
        createTrending('tv','series',URL_IMAGES+"/w500/",false);

    //  getGenreMovies().then((movies)=>{
    //     let select=document.getElementById('genres');
    //     for(let movie of movies.genres){
    //     var option = new Option(movie.name,movie.id);
    //        select.appendChild(option);
    //     };
    // });


    createBanner = (movies) => {
        let movie = movies[movies.length-1];
        let elImgBanner = document.getElementById("imgBanner");
        let elTituloBanner = document.getElementById("tituloBanner");
        let elDescBanner = document.getElementById("descBanner");
        let elBtnReproducirBanner = document.getElementById("btnReproducirBanner");
        let elBtnInfoBanner = document.getElementById("btnInfoBanner");

        if(movie) {
            elImgBanner.setAttribute("src", `${URL_IMAGES}/original/${movie.backdrop_path}`);
            elTituloBanner.innerText = movie.title;
            elDescBanner.innerText = movie.overview;
            elBtnReproducirBanner.setAttribute("href", `reproductor.html?id=${movie.id}`);
            elBtnInfoBanner.setAttribute("href", `detalle.html?id=${movie.id}`);
        }

    }
   


    