import * as model from './model.js';
import { movDetails } from "./view.js";
import { genreCon } from "./view.js";
import movieView from './view.js';

async function moviesHandler() {
  try {
    movieView.loader();
    await model.loadMovie();
    movieView.renderData(model.state.result);
  } catch (err) {
    alert(err);
  }
}
const multiEvents = async function (e) {
  const isImgEl = e.target.classList.value === "card-img-top";
  const viewTrailer = e.target.classList[0] === "watch-trailer";
  const getBack = e.target.classList[0] === "get-back-btn";
  try {
    if (isImgEl) {
      const id = e.target.dataset.id;
      await model.loadMovieDetails(id);
      movieView.renderDetails(model.state.details, id);
    }
    if (viewTrailer) {
      window.open(model.state.details.video);
    }
    if (getBack) {
      setTimeout(() => {
        movDetails.classList.add("d-none");
        document.body.classList.remove("overflow-hidden");
        genreCon.innerHTML = "";
      }, 400);
    }
  } catch (err) {
    alert(err);
  }
};

movieView.eventHandler(multiEvents);

moviesHandler();