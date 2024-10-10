const API_KEY = "af8c9e3c5e7ef1503d9793e7f012e887"; // API key for The Movie Database
const BASE_URL = "https://api.themoviedb.org/3"; // Base URL for the API
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Base URL for images

const options = {
  // Options object to be used in the fetch request where I have the headers and the method
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

// Add event listeners to the buttons to fetch movies and display them
nowPlayingBtn.addEventListener("click", () => fetchMovies("now_playing"));
popularBtn.addEventListener("click", () => fetchMovies("popular"));
topRatedBtn.addEventListener("click", () => fetchMovies("top_rated"));
upcomingBtn.addEventListener("click", () => fetchMovies("upcoming"));

// Function to fetch movies from the API with a async/await function so it waits for the response before continuing
async function fetchMovies(type) {
  try {
    // Trying to block to catch any errors that occur in the try block
    const response = await fetch(`${BASE_URL}/movie/${type}?language=en-US&page=1`, options); // Fetching the movies from the API
    if (!response.ok) {
      // if the response is not OK then throw an error and ! means not
      throw new Error(`HTTP error! status: ${response.status}`);
    } // Check if the response is OK (status code 200)
    const data = await response.json();
    if (data.results) {
      // Check if the results property exists
      displayMovies(data.results);
    } else {
      // If the results property does not exist then throw an error
      throw new Error("No results found");
    }
  } catch (error) {
    // Here it catches any error that occurred in the try block
    console.error("Error fetching data:", error);
  }
}

// Function to display movies on the page
function displayMovies(movies) {
  movieList.innerHTML = ""; // Clear the previous movies

  movies.forEach((movie) => {
    // Loop through the movies and create a card for each movie
    const movieCard = document.createElement("div"); // Create a new div element for the movie card
    movieCard.classList.add("movie-card"); // Add the movie-card class to the div element

    const movieImage = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750";
    // Check if the movie has a poster image, if it does then use the image URL, otherwise use a placeholder image
    const truncatedOverview = truncateText(movie.overview, 8); // Truncate the overview text to 8 words

    // Set the inner HTML of the movie card with the movie data, images and text
    movieCard.innerHTML = ` 
      <img src="${movieImage}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>${movie.release_date}</p>
      <p>${truncatedOverview}</p>
      <p class="rating">Rating: ${movie.vote_average}</p>
    `;
    // Add an event listener to the movie card to open the movie page on The Movie Database when clicked
    movieCard.addEventListener("click", () => {
      window.location.href = `https://www.themoviedb.org/movie/${movie.id}`;
    });
    // Append the movie card to the movie list
    movieList.appendChild(movieCard);
  });
}
// This function truncates the text to a certain number of words
function truncateText(text, wordLimit) {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

// Fetch and display now playing movies when the page loads
fetchMovies("now_playing");
