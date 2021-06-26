import { getRes } from "./helper.js";
import * as config from "./config.js";

export const state = {
  result: {},
  details: {},
};

export const loadMovie = async function () {
  try {
    const data = await Promise.all([
      getRes(config.UPCOMING_URL),
      getRes(config.POPULAR_URL),
      getRes(config.TOP_RATED_URL),
    ]);
    const results = data.map((e) => e.results);
    state.result = results;
  } catch (err) {
    alert(err);
  }
};

export const loadMovieDetails = async function (id) {
  try {
    const data = await getRes(config.videosUrl(id));
    let genres = data.genres.map((item) => item.name);
    const videoKey = data.videos.results[0].key;
    state.details = {
      imgSrc: `${config.IMG_URL}${data.poster_path}`,
      title: data.title,
      vote: data.vote_average,
      genre: genres,
      video: `${config.TRAILER_URL}${videoKey}`,
      releaseDate: data.release_date,
      runtime: data.runtime,
      tagline: data.tagline,
      overview: data.overview,
    };
  } catch (err) {
    alert(err);
  }
};
