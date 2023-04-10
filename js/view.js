import * as el from "./selectors.js";

class MovieView {
  #data;
  #details;
  #value;
  renderData(data) {
    this.#data = data;
    this.displayWrapper();
  }
  renderDetails(details, movieId) {
    this.#details = details;
    this.movieId = movieId;
    this.movieDetails();
  }
  searchDat(value) {
    this.#value = value;
    this.searchMovie();
  }
  loader() {
    window.addEventListener("load", () => {
      document.body.classList.remove("overflow-hidden");
      document.querySelector(".loader").classList.add("d-none");
    });
  }
  wrapperHeader(con, txt) {
    const header = document.createElement("div");
    header.setAttribute(
      "class",
      "header d-flex justify-content-between align-items-center px-3 px-md-4 my-2"
    );
    const title = document.createElement("div");
    title.classList.add("title");
    const h3 = document.createElement("h3");
    h3.classList.add("fw-normal");
    h3.textContent = txt;
    title.appendChild(h3);
    header.appendChild(title);
    con.insertAdjacentElement("afterbegin", header);
  }
  createWrapper(imgUrl, id) {
    const cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", `card-wrapper ms-1 me-3 mb-3`);

    const card = document.createElement("div");
    card.setAttribute("class", "card border-0 bg-transparent");

    const img = document.createElement("img");
    img.setAttribute("src", `${imgUrl}`);
    img.setAttribute("class", "card-img-top");
    img.setAttribute("data-id", `${id}`);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body pt-3 pb-1");

    card.append(img, cardBody);
    cardWrapper.appendChild(card);
    return cardWrapper;
  }
  containerHandler(container, imgUrl, id) {
    const movies = this.createWrapper(imgUrl, id);
    container.appendChild(movies);
  }
  mapTitle(item, element) {
    let imgUrl;
    if (item.poster_path === null) {
      return;
    } else {
      imgUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    }
    const id = item.id;
    this.containerHandler(element, imgUrl, id);
  }
  eventHandler(element, event = "click", handler) {
    element.addEventListener(event, handler);
  }
  displayWrapper() {
    this.wrapperHeader(el.upConHeader, "UPCOMING");
    this.#data[0].map((item) => this.mapTitle(item, el.upMovCon));
    this.wrapperHeader(el.newConHeader, "POPULAR");
    this.#data[1].map((item) => this.mapTitle(item, el.newMovCon));
    this.wrapperHeader(el.topRatConHeader, "TOP RATED");
    this.#data[2].map((item) => this.mapTitle(item, el.topMovCon));
  }
  movieDetails() {
    const ratingsData = this.#details.vote;
    el.ratings.innerHTML =
      ratingsData === 0 ? "NR" : `<i class="far fa-star"></i> ${ratingsData.toFixed(1)}`;
    el.movieIdImg.src = this.#details.imgSrc;
    this.#details.genre.map((e) => {
      const genreItem = document.createElement("div");
      genreItem.setAttribute("class", "genre-item mx-1 mt-2 py-2 px-3");
      genreItem.textContent = e;
      el.genreCon.appendChild(genreItem);
    });
    const runtimeData = this.#details.runtime;
    if (runtimeData === 0) {
      el.runTime.classList.add("d-none");
    } else {
      el.runTime.classList.remove("d-none");
      el.runTime.textContent = `${runtimeData} min`;
    }
    el.titleTxt.textContent = this.#details.title;
    el.releaseDate.textContent = this.#details.releaseDate;
    el.tagLine.textContent = this.#details.tagline;
    el.overviewTxt.textContent = this.#details.overview;
    setTimeout(() => {
      el.movDetails.classList.remove("d-none");
      document.body.classList.add("overflow-hidden");
    }, 450);
  }
  searchMovie() {
    this.#value.map((item) => this.mapTitle(item, el.movieQue));
    el.searchMovCon.classList.remove("d-none");
    el.movsCon.classList.add("d-none");
  }
}

export default new MovieView();
