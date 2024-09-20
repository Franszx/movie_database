const API_KEY = "af8c9e3c5e7ef1503d9793e7f012e887"; // This is the API key that I will use to fetch the movies from the API.
const BASE_URL = "https://api.themoviedb.org/3"; // This is the base URL of the API.
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // This is the base URL for the images of the movies.

// This is the code that will fetch the elements from the HTML file. And I will use these elements to display the movies.
const movieList = document.getElementById("movieList");
const nowPlayingBtn = document.getElementById("nowPlayingBtn");
const popularBtn = document.getElementById("popularBtn");
const topRatedBtn = document.getElementById("topRatedBtn");
const upcomingBtn = document.getElementById("upcomingBtn");

// Event Listeners for all buttons, so when clicked, it will fetch the movies from the API.
nowPlayingBtn.addEventListener("click", () => fetchMovies("now_playing"));
popularBtn.addEventListener("click", () => fetchMovies("popular"));
topRatedBtn.addEventListener("click", () => fetchMovies("top_rated"));
upcomingBtn.addEventListener("click", () => fetchMovies("upcoming"));
// ################################################################################ This section is for the search functionality where I will fetch the movies based on the search query.
// This is where I will fetch the movies from the API
function fetchMovies(type) {
  fetch(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`) // Here I am fetching the movies from the API
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // This is an error handling code that will throw an error if the response is not okay. THROW means that it will stop the code from running and display the error message.
      }
      return response.json();
    })
    .then((data) => {
      if (data.results) {
        displayMovies(data.results);
      } else {
        throw new Error("No results found");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}
//################################################################################

// ############################################################################### In this section I will display the movies on the page. Using the displayMovies function and adding an event listener to the movie card to redirect to the movie's page on TMDb.

// Okay, here I am going to display the movies and add click event listener to redirect to movie's page
function displayMovies(movies) {
  movieList.innerHTML = ""; // Here I clear the previous movies by setting innerHTML to empty string like so.
  movies.forEach((movie) => {
    // This is a loop that goes through each movie and creates a card for it.
    const movieCard = document.createElement("div"); // this is a div element that will contain the movie's details.
    movieCard.classList.add("bg-gray-800", "p-4", "mt-10", "rounded-lg", "shadow-md", "hover:shadow-xl", "transition-shadow", "duration-300", "transform", "transition-transform", "duration-300", "hover:scale-105", "cursor-pointer", "h-auto");

    const movieImage = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750";

    // This is where I show the movie's details on the card. Im using innerHTML to add the movie's details to the card.
    movieCard.innerHTML = `
        <img src="${movieImage}" alt="${movie.title}" class="rounded-md mb-4 w-full h-auto">
        <h2 class="text-xl font-bold mb-2">${movie.title}</h2>
        <p class="text-sm mb-2">${movie.release_date}</p>
        <p class="text-sm mb-4 truncate">${movie.overview}</p>
        <p class="font-bold text-yellow-500">Rating: ${movie.vote_average}</p>
      `;

    // Here I will add an event listener to the movie card to redirect to the movie's page on TMDb so it will be clickable.
    movieCard.addEventListener("click", () => {
      window.location.href = `https://www.themoviedb.org/movie/${movie.id}`;
    });

    movieList.appendChild(movieCard);
  });
}

// As a default I choose to display the now playing movies when the page loads.
fetchMovies("now_playing");
