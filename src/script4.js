var mov = sessionStorage.getItem("movId");
const cont = document.querySelector(".player-container");
const info = document.querySelector(".info");

window.addEventListener("DOMContentLoaded", function () {
  fetch(`https://api.themoviedb.org/3/movie/${mov}/videos?api_key=76820f7ce10a774d7b509978da68ea98&language=en-US`)
    .then((res) => res.json())
    .then((res) => {
      const result = res.results;
      const r = result[0];
      const yt = r.key;
      cont.innerHTML = `<iframe src="https://www.youtube.com/embed/${yt}" frameborder="0" allowfullscreen></iframe>`;
      fetch(`https://api.themoviedb.org/3/movie/${mov}?api_key=76820f7ce10a774d7b509978da68ea98&language=en-US`)
        .then((m) => m.json())
        .then((m) => {
          let year = m.release_date.split("-");
          year = year[0];
          console.log(year);
          info.innerHTML = `
                            <h1 class="title">${m.original_title} (${year})</h1>
                            <h3 class="syn">Synopis </h3>
                            <p>${m.overview}</p>`;
        });
    });
});
