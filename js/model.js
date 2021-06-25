export const state = {
  result:{}
}

async function getRes(url, err = "Something went wrong") {
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