import * as model from "./model.js";
import * as el from "./selectors.js";
import movieView from "./view.js";

async function moviesHandler() {
  try {
    movieView.loader();
    await model.loadMovie();
    movieView.renderData(model.state.result);
  } catch (err) {
    alert(err);
  }
}

const searchQue = async function (e) {
  e.preventDefault();
  el.movieQue.innerHTML = "";
  try {
    await model.movieSearch(el.inputVal.value);
    movieView.searchDat(model.state.searchData);
    el.inputVal.value = "";
  } catch (err) {
    alert(err);
  }
};

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
      playVideo();
      el.trailerContainer.classList.remove("d-none");
      el.overlay.classList.remove("d-none");
    }
    if (getBack) {
      setTimeout(() => {
        el.movDetails.classList.add("d-none");
        document.body.classList.remove("overflow-hidden");
        el.genreCon.innerHTML = "";
      }, 400);
    }
  } catch (err) {
    alert(err);
  }
};

const exitPlayer = function () {
  el.trailerContainer.classList.add("d-none");
  el.overlay.classList.add("d-none");
  stopVideo();
};

movieView.eventHandler(document.body, "click", multiEvents);
movieView.eventHandler(el.closePlayer, "click", exitPlayer);
movieView.eventHandler(el.form, "submit", searchQue);

moviesHandler();