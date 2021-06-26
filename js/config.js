export const API_KEY = "531bf6af87ea9bad6ceb5623091d31fe";

export const IMG_URL = "https://image.tmdb.org/t/p/w500";

export const TRAILER_URL = "https://www.youtube.com/watch?v=";

export const UPCOMING_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=2 `;

export const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=3`;

export const videosUrl = function (id) {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
} 
