export const movDetails = document.querySelector(".movie-details-view");
export const genreCon = document.querySelector(".genre");
export const trailerContainer = document.querySelector(".trailer-container");
export const closePlayer = document.querySelector(".trailer-exit");
export const overlay = document.querySelector(".overlay");
const upMovCon = document.querySelector(".upcoming-movie");
const newMovCon = document.querySelector(".new-releases-movie");
const topMovCon = document.querySelector(".top-rated-movie");
const movieIdImg = document.getElementById("imgMovieId");
const titleTxt = document.querySelector(".title-txt");
const ratings = document.querySelector(".ratings");
const runTime = document.querySelector(".run-time");
const releaseDate = document.querySelector(".release-date");
const tagLine = document.querySelector(".movie-tagline");
const overviewTxt = document.querySelector(".overview-txt");
class MovieView {
  #data;
  #details;
  renderData(data) {
    this.#data = data;
    this.displayWrapper();
  }
  renderDetails(details, movieId) {
    this.#details = details;
    this.movieId = movieId;
    this.movieDetails();
  }
  loader() {
    window.addEventListener("load", () => {
      document.body.classList.remove("overflow-hidden");
      document.querySelector(".loader").classList.add("d-none");
      document.querySelector(".navbar").classList.add("sticky-top");
    });
  }
  createWrapper(imgUrl, id) {
    const cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", "card-wrapper ms-1 me-2");

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
    container.classList.add("custom-scrollbar");
    container.appendChild(movies);
  }
  mapTitle(item, element) {
    const imgUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    const id = item.id;
    this.containerHandler(element, imgUrl, id);
  }
  eventHandler(element,handler) {
    element.addEventListener("click", handler);
  }
  displayWrapper() {
    this.#data[0].map((item) => this.mapTitle(item, upMovCon));
    this.#data[1].map((item) => this.mapTitle(item, newMovCon));
    this.#data[2].map((item) => this.mapTitle(item, topMovCon));
  }
  movieDetails() {
    ratings.innerHTML = `<i class="far fa-star"></i> ${this.#details.vote}`;
    movieIdImg.src = this.#details.imgSrc;
    this.#details.genre.map((e) => {
      const genreItem = document.createElement("div");
      genreItem.setAttribute("class", "genre-item mx-1 py-2 px-3");
      genreItem.textContent = e;
      genreCon.appendChild(genreItem);
    });
    runTime.textContent = `${this.#details.runtime} min`;
    titleTxt.textContent = this.#details.title;
    releaseDate.textContent = this.#details.releaseDate;
    tagLine.textContent = this.#details.tagline;
    overviewTxt.textContent = this.#details.overview;
    setTimeout(() => {
      movDetails.classList.remove("d-none");
      document.body.classList.add("overflow-hidden");
    }, 450);
  }
}

export default new MovieView();
