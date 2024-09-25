const API_KEY = "af8c9e3c5e7ef1503d9793e7f012e887";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZjhjOWUzYzVlN2VmMTUwM2Q5NzkzZTdmMDEyZTg4NyIsIm5iZiI6MTcyNjY2MjI0Ny40OTQ3MzcsInN1YiI6IjY2ZWFjMWFlMWJlY2E4Y2UwN2QzNmIxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.djl3lisejtThd3VZUTvHZS9AiP1EjMnw13BBE1dUjw0",
  },
};

// Get references to the HTML elements
const movieList = document.getElementById("movieList");
const nowPlayingBtn = document.getElementById("nowPlayingBtn");
const popularBtn = document.getElementById("popularBtn");
const topRatedBtn = document.getElementById("topRatedBtn");
const upcomingBtn = document.getElementById("upcomingBtn");

// Add event listeners to the buttons
nowPlayingBtn.addEventListener("click", () => fetchMovies("now_playing"));
popularBtn.addEventListener("click", () => fetchMovies("popular"));
topRatedBtn.addEventListener("click", () => fetchMovies("top_rated"));
upcomingBtn.addEventListener("click", () => fetchMovies("upcoming"));

// Function to fetch movies from the API
async function fetchMovies(type) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${type}?language=en-US&page=1`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.results) {
      displayMovies(data.results);
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to display movies on the page
function displayMovies(movies) {
  movieList.innerHTML = ""; // Clear the previous movies

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const movieImage = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750";

    const truncatedOverview = truncateText(movie.overview, 8);

    movieCard.innerHTML = `
      <img src="${movieImage}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>${movie.release_date}</p>
      <p>${truncatedOverview}</p>
      <p class="rating">Rating: ${movie.vote_average}</p>
    `;

    movieCard.addEventListener("click", () => {
      window.location.href = `https://www.themoviedb.org/movie/${movie.id}`;
    });

    movieList.appendChild(movieCard);
  });
}

function truncateText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

// Fetch and display now playing movies when the page loads
fetchMovies("now_playing");
