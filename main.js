// $('.search-button').on('click', function (){
    
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=494c79a3&s=' + $('.input-keyword').val(),
//         success: results => {
//             const movies = results.Search;
//             console.log(movies);
//             let cards = '';
//             movies.forEach(m => {
//                 cards += showMovie(m);
//             });
//             $('.movie-container').html(cards);
//             //ketika tombol button-detail di klick
//             $('.modal-detail-buttton').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=494c79a3&i=' + $(this).data('imdbid'),
//                     success: m => {
//                         const modalDetail = showMovieDetil(m);
    
//                      $('.modal-body').html(modalDetail);
//                     },
//                     error: (e) => {
//                         console.log(e.responseText);
//                     }
//                 });
//             });
//         },
//         error: (e) => {
//             console.log(e.responseText);
//         }
//     })
// });

//fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function () {
//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=494c79a3&s=' + inputKeyword.value)
//     .then(response => response.json())
//     .then(response => {
//         const movie = response.Search;
//         let cards ='';  
//         movie.forEach(m => cards += showMovie(m));
//         const movieContiner = document.querySelector('.movie-container');
//         movieContiner.innerHTML = cards;
//         // ketka tombol detail di klik
//         const modalDetailButton = document.querySelectorAll('.modal-detail-buttton');
//         modalDetailButton.forEach(btn =>{

//             btn.addEventListener('click', function (){
//                 const imdbid = this.dataset.imdbid;
//                 fetch('http://www.omdbapi.com/?apikey=494c79a3&i=' + imdbid)
//                 .then(response => response.json())
//                 .then(m => {
//                     const modalDetail = showMovieDetil(m);
//                     const modalBody = document.querySelector('.modal-body');
//                     modalBody.innerHTML = modalDetail;
//                 })
//             });
//             });
//     });

// });

//perbaiikan 
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovie(inputKeyword.value);
    updateUI(movies)
});

// event binding
document.addEventListener('click', async function (e){
    if(e.target.classList.contains('modal-detail-buttton')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIData(movieDetail);
    }
});


function getMovie(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=494c79a3&s=' + keyword)
    .then(response => response.json())
    .then(response => response.Search);
}

function updateUI(movie) {
     let cards ='';  
            movie.forEach(m => cards += showMovie(m));
            const movieContiner = document.querySelector('.movie-container');
            movieContiner.innerHTML = cards;
}

function getMovieDetail (imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=494c79a3&i=' + imdbid)
                    .then(response => response.json())
                    .then(m => m);
}

function updateUIData(m){
    const modalDetail = showMovieDetil(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = modalDetail;
}





function showMovie(m){
    return ` <div class="col-md-4 my-5">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-buttton" 
                    data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">show detail</a>
                    </div>
                </div>
            </div>`;
};
function showMovieDetil(m) {
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><h3>${m.Title}(${m.Year})</h3></li>
                    <li class="list-group-item"> <strong>Director: </strong> ${m.Director}</li>
                    <li class="list-group-item"><strong> Actors:</strong> ${m.Actors}</li>
                    <li class="list-group-item"><strong>Writer:</strong> ${m.Writer}</li>
                    <li class="list-group-item"><strong>Plot:</strong> <br>  ${m.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>`;
};