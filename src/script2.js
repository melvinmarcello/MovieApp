const APIURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=76820f7ce10a774d7b509978da68ea98&language=en-US";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const GETPOPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=76820f7ce10a774d7b509978da68ea98&language=en-US&page=1";

const row = document.querySelector(".movie");
const button = document.querySelector(".mov");
const tag = document.querySelector(".tag");
const card = document.querySelector(".card");

button.addEventListener("click", function () {
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
                      <p><i class="bi bi-star-fill me-2"><span class="rating">${m.vote_average}</span></i></p>
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
sessionStorage.removeItem("movId");
function showMovieDetail(m) {
  const date = m.release_date.split("-");
  let years = date[0];
  let companies = m.production_companies[0].name;
  let idmov = m.id;
  sessionStorage.setItem("movId", idmov);
  return `<div class="modal-header">
               <h5 class="modal-title" id="movieDetailModalLabel">${m.original_title}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
             <div class="container-fluid">
               <div class="row">
                 <div class="col-md-3">
                   <img src="${IMGPATH}${m.poster_path}" alt="" class="img-fluid" />
                   <a href="stream.php"><button class="btn btn-outline-dark ms-5 mt-2 mb-2 watch">Watch</button></a>
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

const carousel = document.querySelector(".carousel-inner");
const cont = document.querySelector(".cont");
const vidYT = document.querySelector(".vid");
const desc = document.querySelector(".describe");
window.addEventListener("DOMContentLoaded", function () {
  fetch(GETPOPULAR)
    .then((res) => res.json())
    .then((res) => {
      const popular = res.results;
      const pop = popular[0];
      const date = pop.release_date.split("-");
      let years = date[0];
      // Carrousel
      const img1 = popular[0].backdrop_path;
      const img2 = popular[1].backdrop_path;
      const img3 = popular[2].backdrop_path;
      carousel.innerHTML = `
        <div class="carousel-item active">
          <img src="${IMGPATH}${img1}" class="d-block w-100 car" alt="${popular[0].original_title}" />
          <div class="carousel-caption d-none d-md-block">
            <h5>${popular[0].original_title}</h5>
            <p>${popular[0].overview}</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="${IMGPATH}${img2}" class="d-block w-100 car" alt="${popular[1].original_title}" />
          <div class="carousel-caption d-none d-md-block">
            <h5>${popular[1].original_title}</h5>
            <p>${popular[1].overview}</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="${IMGPATH}${img3}" class="d-block w-100 car" alt="${popular[2].original_title}" />
          <div class="carousel-caption d-none d-md-block">
            <h5>${popular[2].original_title}</h5>
            <p>${popular[2].overview}</p>
          </div>
        </div>`;
      // Background
      let bg = pop.backdrop_path;
      bg = IMGPATH + bg;
      cont.style.backgroundImage = `url(${bg})`;
      // Trailer
      idMov = pop.id;
      fetch(`https://api.themoviedb.org/3/movie/${idMov}/videos?api_key=76820f7ce10a774d7b509978da68ea98&language=en-US`)
        .then((res) => res.json())
        .then((res) => {
          const result = res.results;
          const r = result[0];
          const yt = r.key;

          vidYT.innerHTML = ` 
            <iframe src="https://www.youtube.com/embed/${yt}" frameborder="0" allowfullscreen></iframe>`;
        });
      desc.innerHTML = `  
          <h1>${pop.original_title}</h1>
          <h2>${years}</h2>
          <p>${pop.overview}</p>`;
    });
});
