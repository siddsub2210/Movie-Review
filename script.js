const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d95020d24f37c87704070c367a8c76de&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=d95020d24f37c87704070c367a8c76de&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


function returnMovies(url){
  fetch(url)
  .then(response => response.json())
  .then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
      const div_card = document.createElement('div');
      div_card.setAttribute("class", "card");
      
      const div_row = document.createElement('div');
      div_row.setAttribute("class", "row");

      const div_column = document.createElement('div');
      div_column.setAttribute("class", "column");

      const image = document.createElement('img');
      image.setAttribute("class", "thumbnail");
      image.setAttribute("id", "image");

      const title = document.createElement('h3');
      title.setAttribute("id", "title");

      //------adding new link for reviews
      const rev_link = document.createElement('a');
      rev_link.setAttribute("class", "rev-link");
      //------
      
      const center = document.createElement('center');

  

      title.innerHTML = `${element.title}`;
      rev_link.setAttribute('href', `movie.html?id=${element.id}&title=${encodeURIComponent(element.title)}`);
      rev_link.textContent = "Click to see reviews";

      image.src = IMG_PATH + element.poster_path;
      center.appendChild(image); // Append the image to the center element
      div_card.appendChild(center); // Append the center element to the card
      div_card.appendChild(title); // Append the title below the image
      div_card.appendChild(rev_link); // Append the review link
      div_column.appendChild(div_card);
      div_row.appendChild(div_column);
      main.appendChild(div_row);

      
    });
  });
}


form.addEventListener("submit", (e) =>{
  e.preventDefault();
  main.innerHTML = '';

  const search_item = search.value;
  if (search_item){
    console.log(SEARCHAPI + search_item);
    returnMovies(SEARCHAPI + search_item);
    search.value = '';
  }
});
returnMovies(APILINK);