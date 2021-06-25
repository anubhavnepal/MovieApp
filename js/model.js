const upMovCon = document.querySelector(".upcoming-movie");
const newMovCon = document.querySelector(".new-releases-movie");
const topMovCon = document.querySelector(".top-rated-movie");

function newElement(imgUrl, id) {
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

function containerHandler(container, imgUrl, id) {
  const movies = newElement(imgUrl, id);
  container.classList.add("custom-scrollbar");
  container.appendChild(movies);
}
async function getRes(url, err = "Something went wrong") {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${err} (${res.status})`);
  return await res.json();
}

function mapTitle(item, element) {
  const imgUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
  const id = item.id;
  containerHandler(element, imgUrl, id);
}
function renderLoader() {
  window.addEventListener("load", () => {
    document.body.classList.remove("overflow-hidden");
    document.querySelector(".loader").classList.add("d-none");
    document.querySelector(".navbar").classList.add("sticky-top");
  });
}
async function moviesHandler() {
  try {
    renderLoader();
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
    const result = data.map((e) => e.results);
    result[0].map((item) => mapTitle(item, upMovCon));
    result[1].map((item) => mapTitle(item, newMovCon));
    result[2].map((item) => mapTitle(item, topMovCon));
  } catch (err) {
    alert(err);
  }
}
moviesHandler();