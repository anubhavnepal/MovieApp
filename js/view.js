const upMovCon = document.querySelector(".upcoming-movie");
const newMovCon = document.querySelector(".new-releases-movie");
const topMovCon = document.querySelector(".top-rated-movie");

class MovieView {
  #data;
  renderData(data) {
    this.#data = data;
    this.displayElement();
  }
  loader() {
    window.addEventListener("load", () => {
      document.body.classList.remove("overflow-hidden");
      document.querySelector(".loader").classList.add("d-none");
      document.querySelector(".navbar").classList.add("sticky-top");
    });
  }
  newElement(imgUrl, id) {
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
    const movies = this.newElement(imgUrl, id);
    container.classList.add("custom-scrollbar");
    container.appendChild(movies);
  }
  mapTitle(item, element) {
    const imgUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    const id = item.id;
    this.containerHandler(element, imgUrl, id);
  }
  displayElement() {
    this.#data[0].map((item) => this.mapTitle(item, upMovCon));
    this.#data[1].map((item) => this.mapTitle(item, newMovCon));
    this.#data[2].map((item) => this.mapTitle(item, topMovCon));
  }
}

export default new MovieView();
