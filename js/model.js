export const state = {
  result: {},
  details:{},
}

const getRes = async function(url, err = "Something went wrong") {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${err} (${res.status})`);
  return await res.json();
}

export const loadMovie = async function () {
  try {
    const data = await Promise.all([
      getRes(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=531bf6af87ea9bad6ceb5623091d31fe&language=en-US&page=2"
      ),
      getRes(
        "https://api.themoviedb.org/3/movie/popular?api_key=531bf6af87ea9bad6ceb5623091d31fe&language=en-US&page=1"
      ),
      getRes(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=531bf6af87ea9bad6ceb5623091d31fe&language=en-US&page=3"
      ),
    ]);
    const results = data.map((e) => e.results);
    state.result = results;
  } catch(err) {
    alert(err);
   }
}

export const loadMovieDetails = async function (id) {
  try {
    const data = await getRes(
      `https://api.themoviedb.org/3/movie/${id}?api_key=531bf6af87ea9bad6ceb5623091d31fe&append_to_response=videos`
    );
    let genres = data.genres.map((item) => item.name);
    const videoLink = data.videos.results[0].key;
    state.details = {
      imgSrc: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
      title: data.title,
      vote: data.vote_average,
      genre: genres,
      video: `https://www.youtube.com/watch?v=${videoLink}`,
      releaseDate: data.release_date,
      runtime: data.runtime,
      tagline: data.tagline,
      overview: data.overview,
    };
  } catch (err) {
    alert(err);
  }
}