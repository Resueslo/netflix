const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get('type');
console.log(type);
function setTitle(type){
    const principal = document.getElementById('title');
    let value = 'Series';
    if(type == 'all'){
        value = 'Novedades Populares';
    }
    principal.innerHTML = value;
}  

 
 getTrending(type).then((movies)=>{
    let series = document.getElementById('series');
    let title;
    setTitle(type);
    console.log(movies);
    movies.forEach(movie => {
        if(movie.poster_path) {
           let card =  document.createElement('div');
            card.classList = "card mb-2 poster-pelicula";
            card.setAttribute("id", movie.id);
            card.addEventListener("click", e => {
               window.location = `detalle.html?id=${movie.id}&type=${movie.media_type}`;
           });
           title=movie.title;
           if(movie.media_type == "tv"){
               title=movie.name;
           }
           card.innerHTML = `
                   <img src="${URL_IMAGES}/w500/${movie.poster_path}" alt="${title}" class="card-img-top">
                   <div class="card-body">
                       <h5 class="card-title">${title}</h5>
                   </div>
               `;
               series.appendChild(card);   
        }
    });
});

