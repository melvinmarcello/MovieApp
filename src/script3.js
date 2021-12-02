const APIURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=76820f7ce10a774d7b509978da68ea98&language=en-US";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const row = document.querySelector(".movie");
const tag = document.querySelector(".tag");

window.addEventListener("DOMContentLoaded", function () {
  fetch(APIURL)
    .then((res) => res.json())
    .then((res) => {
      const movies = res.results;
      let cards = "";
      movies.forEach((m) => (cards += showCards(m)));
      row.innerHTML = cards;
    });
});

function showCards(m) {
  return `
            <div class="col-xl-3 col-md-4 col-sm-6 mt-3 mb-3">
              <div class="card">
              <a data-bs-toggle="modal" data-bs-target="#movieDetailModal"  href="#"><img src="${IMGPATH}${m.poster_path}" data-movid=${m.id} class="card-img-top detail-button poster" alt="..."> </a>
                <div class="card-body">
                      <h5 class="card-title">${m.original_title}</h5>
                      <div class="row justify-content-between">
                        <div class="col-sm">
                          <p><i class="bi bi-star-fill me-2"><span class="rating">${m.vote_average}</span></i></p>                        
                        </div>
                        <div class="col-sm mb-2">
                          <h6 class="card-subtitle mt-1 text-muted">${m.release_date}</h6>
                        </div>
                      </div>
                </div> 
              </div>
            </div>`;
}

document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("detail-button")) {
    const id = e.target.dataset.movid;
    const movDetail = await getMovieDetail(id);
    updateUIDetail(movDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch(`https://api.themoviedb.org/3/movie/${imdbid}?api_key=76820f7ce10a774d7b509978da68ea98&language=en-US`)
    .then((response) => response.json())
    .then((res) => res);
}
function updateUIDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function showMovieDetail(m) {
  const date = m.release_date.split("-");
  let years = date[0];
  let companies = m.production_companies[0].name;
  return `<div class="modal-header">
               <h5 class="modal-title" id="movieDetailModalLabel">${m.original_title}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="container-fluid">
               <div class="row">
                 <div class="col-md-3">
                   <img src="${IMGPATH}${m.poster_path}" alt="" class="img-fluid" />                   
                 </div>
                 <div class="col-md">
                   <ul class="list-group">
                     <li class="list-group-item"><h4>${m.original_title} (${years})</h4></li>
                     <li class="list-group-item"><strong>Company :</strong> ${companies}</li>
                     <li class="list-group-item"><strong>Time :</strong> ${m.runtime} minutes</li>
                     <li class="list-group-item"><strong>Rating :</strong> ${m.vote_average}</li>
                     <li class="list-group-item"><strong>Plot :</strong> ${m.overview}</li>
                   </ul>
                 </div>
               </div>
             </div>`;
}
