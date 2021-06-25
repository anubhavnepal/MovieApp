import * as model from './model.js';
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
moviesHandler();