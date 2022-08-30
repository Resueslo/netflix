
//let actor="https://api.themoviedb.org/3/search/person?api_key=9eb4e5199ac559b2a5a63d0b43ea5c76&language=en-US&query="+actor+"&page=1&include_adult=false";

const API_KEY = "f28711faa6dd23ead57c3434bcbea433";
const imageUrl="https://image.tmdb.org/t/p/w220_and_h330_face";
const URL_IMAGES = "https://image.tmdb.org/t/p";
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
        let moviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        try {
            let response = await axios.get(moviesUrl);
            return response.data.results
        } catch (e) {
            return []
        }
    }

    async function getRatedMovies() {
        let moviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        try {
            let response = await axios.get(moviesUrl);
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



    
  getRatedMovies().then((movies) => {
        let i = 0;
        for (let movie of movies) {
            console.log(movie);
            consturl2=URL_IMAGES+"/w500/"+movie.poster_path;
            const url= imageUrl+movie.poster_path;
            console.log(url);
            if(i<10){
                setImage(i++,"public/src/images/top10/"+i+".png",'top_10','top10',false);
                setImage(movie.id,url,'top_10','row__poster top10',true);
               
            }     
        }
    });



     getLatestMovies().then((movies) => {
        let i=0;
        for (let movie of movies) {
            if (i<15){
            console.log(movie)
            const url= imageUrl+movie.poster_path;
            console.log(url);
            setImage(movie.id,url,'top_rated','row__poster',true);
            i++;
        }
        }
    });

     getGenreMovies().then((movies)=>{
        let select=document.getElementById('genres');
        for(let movie of movies.genres){
        var option = new Option(movie.name,movie.id);
           select.appendChild(option);
        };
        console.log(movies.genres);
    });


    
   


    