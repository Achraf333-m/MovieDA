const movieList = document.querySelector(".movies__list");
const searchIcon = document.querySelector(".search__icon");
const searchInput = document.querySelector(".nav__input");
const searchResult = document.querySelector(".movie-name");

async function getMovies (searchTerm) {
    const url = fetch(`https://www.omdbapi.com/?apikey=d7952e91&s=${encodeURIComponent(searchTerm)}`)
    const movies = await url;
    const moviesJs = await movies.json();
    const loadingPage = document.querySelector(".movies__loading--container")
    if (moviesJs.Search) {
        loadingPage.classList += " movies__loading--visible"
        setTimeout(() => {
            movieList.innerHTML = moviesJs.Search.map((movie) => moviesHTML(movie)).join('')
            loadingPage.classList.remove("movies__loading--visible")
        }, 1000);
    }
    
    else {
        loadingPage.classList += " movies__loading--visible"
        setTimeout(() => {
            movieList.innerHTML = emptyPageHtml()
            loadingPage.classList.remove("movies__loading--visible")
            
        }, 1000);
        
    }
    searchResult.innerHTML = `"${searchTerm}"`
    
    
}


async function searchYear(event) {
    const yearMovie = event.target.value
    const searchTerm = searchInput.value;
    const link = fetch(`https://omdbapi.com/?apikey=d7952e91&s=${encodeURIComponent(searchTerm)}&y=${encodeURIComponent(yearMovie)}`)
    const movieY = await link;
    const movieYData = await movieY.json()
    const loadingPage = document.querySelector(".movies__loading--container")
    if (movieYData.Search) {
        loadingPage.classList += " movies__loading--visible"
        movieList.innerHTML = movieYData.Search.map((movie) => moviesHTML(movie)).join('')
        setTimeout(() => {
            loadingPage.classList.remove("movies__loading--visible")
        }, 1000);
        
    }
    else {
        movieList.innerHTML = emptyPageHtmlYear ()
    }

}

function movingFilm() {
    const animation = document.querySelector(".moving-film")
    animation.classList += " moving-film--visible"
    setTimeout(() => {
        animation.classList = " moving-film--paused"
    }, 3000);

}






searchIcon.addEventListener('click', function () {
    const searchTerm = searchInput.value;
    dynamicSearch (searchTerm);
    window.scrollTo(0, 300)
    getMovies(searchTerm)
    
    
    
    
    
})

searchInput.addEventListener('keypress', (event)=>{

    if(event.key === 'Enter') {
        searchIcon.click();
      
    }
      
  });

function dynamicSearch(searchTerm) {
    getMovies(searchTerm)
}




// HTML FUNCTIONS

function moviesHTML(movie) {
    return `<div class="movie">
    <figure class="movie__poster--wrapper">
        <img src= "${movie.Poster}"
            alt="" class="movie__poster">
    </figure>
    <div class="movie__title">
        ${movie.Title}
    </div>
    <div class="movie__date">
        ${movie.Year}
    </div>
    </div>
    `
}

function emptyPageHtml () {
    return `<p class='paragraph'> oh it seems that we don't have that movie! </p> 
    <img src='./assets/undraw_void_-3-ggu.svg' class='no-movies__img'>`
}

function emptyPageHtmlYear () {
    return `<p class='paragraph paragraph--mod'> oop! We seem to either not have the movie or you might have forgotten to type in the title as well</p> 
    <img src="./assets/undraw_server_down_s-4-lk.svg" class='no-movies__img'>`
}