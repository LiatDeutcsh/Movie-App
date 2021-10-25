const API_KEY = "api_key=66475a4823b5d966314c120f2a7a7e7a";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const CURRENT_MOVIES_URL =
    "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-09-24&primary_release_date.lte=2021-10-24&api_key=66475a4823b5d966314c120f2a7a7e7a&language=en-US";

const main = document.getElementById("main");
const form = document.getElementById("form");
console.log(form);

getMovies(API_URL + "&language=en-US&sort_by=vote_count.desc");

function getMovies(url) {
    fetch(url).then((res) => {
        res.json().then((data) => {
            console.log(data.results);
            showMovies(data.results);
        });
    });
}

function getCurrentMovies(url) {
    fetch(url).then((res) => {
        res.json().then((data) => {
            console.log(data);
            showMovies(data.results);
        });
    });
}

function showMovies(data) {
    main.innerHTML = "";

    data.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">

        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h4>Overview</h4>
            ${overview}
        </div>
        
        `;

        main.appendChild(movieEl);
    });
}

function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const searchTerm = search.value;

//     console.log(search);

//     if (searchTerm) {
//         getMovies(searchURL + "&query=" + searchTerm);
//     } else {
//         getMovies(API_URL);
//     }
// });

function check(value) {
    let searchValue = document.getElementById("search");
    console.log(searchValue.value);
    if (value === "Popular Movies") {
        console.log("get movies");
        getMovies(
            API_URL +
            "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
        );
    } else if (value === "Recent Released Movies") {
        console.log("get current movies");
        getCurrentMovies(CURRENT_MOVIES_URL);
    }
}

function myFunction() {
    const x = document.getElementById("myLinks");

    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}