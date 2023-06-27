// event binding
document.addEventListener("submit", function (e) {
   e.preventDefault();
   if (e.target.classList.contains("search-movie")) {
      let cards = "";
      const inputKeyword = document.querySelector(".input-keyword");
      const movieContainer = document.querySelector(".movie-container");

      updateUI(inputKeyword, movieContainer, cards);
   }
});
document.addEventListener("click", async function (e) {
   if (e.target.classList.contains("modal-detail-button")) {
      const containerMovieDetail = document.querySelector(
         ".container-movie-detail"
      );
      const imdbid = e.target.dataset.imdbid;
      updeteUIDetail(imdbid, containerMovieDetail);
   }
});
// UPDATE UI
async function updateUI(inputKeyword, movieContainer, cards) {
   movieContainer.innerHTML = `
    <div class="spinner-border text-primary" role="status"></div>
   `;
   try {
      const res = await getMovies(`s=${inputKeyword.value}`);
      const data = await res.json();

      if (data.Response === "True") {
         data.Search.forEach((d) => (cards += showCards(d)));
         return (movieContainer.innerHTML = cards);
      }
      if (data.Response === "False") {
         return (movieContainer.innerHTML = `<h3>${inputKeyword.value} Not Found</h3>`);
      }
   } catch (error) {
      return (movieContainer.innerHTML = "<h1>Error</h1>");
   }
}
// UPDATE UI DETAIL
async function updeteUIDetail(imdbid, containerMovieDetail) {
   containerMovieDetail.innerHTML = `
      <div class="spinner-border text-primary" role="status"></div>
   `;
   try {
      const res = await getMovies(`i=${imdbid}`);
      const data = await res.json();

      if (data.Response === "True") {
         return (containerMovieDetail.innerHTML = showMovieDetail(data));
      }
      if (data.Response === "False") {
         return (containerMovieDetail.innerHTML = "<h3>Not Found</h3>");
      }
   } catch (error) {
      return (containerMovieDetail.innerHTML = "<h3>Error</h3>");
   }
}
// HIT API
async function getMovies(keyword = "") {
   return await fetch(`https://www.omdbapi.com/?apikey=a8b3cdf1&${keyword}`);
}
// CARDS
function showCards(data) {
   return `
      <div class="col-md-4 my-3">
        <div class="card">
          <img src="${data.Poster}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${data.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal"
            data-target="#movieDetailModal" data-imdbid="${data.imdbID}">Show Details</a>
          </div>
        </div>
      </div>
    `;
}
// DETAILS
function showMovieDetail(m) {
   return `
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">
            <img src="${m.Poster}" alt="" class="img-fluid" />
          </div>
          <div class="col-md">
            <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title} ${m.Year}</h4></li>
              <li class="list-group-item">
                <strong>Director : </strong>${m.Director}
              </li>
              <li class="list-group-item">
                <strong>Actors : </strong>${m.Actors}
              </li>
              <li class="list-group-item">
                <strong>Write : </strong>${m.Writer}
              </li>
              <li class="list-group-item">
                <strong>Plot : </strong>${m.Plot}
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
}
