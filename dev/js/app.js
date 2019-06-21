$( function() {

var foot = $('.element:eq(3)');
let news = $('.element:eq(1)');
var stock_path = 'http://localhost:3000';

function showStocks(stocks) {
    //Użyj sposobu na pobranie wartości z obiektu (nie kluczy) np. pętla for in
      stocks.forEach(function(stock) {
        if (stock.name == "WIELTON") {
        let newLi = $(`<div> ${stock.ticker} można było kupić ${stock.data_debiutu} za ${stock.cena_debiutu} </div>`);
        //let newN = $(`<span> ${stock.2019.events[1]} </span>`);
        foot.append(newLi);
        //news.append(newN);
          }
      });
      foot.append(stocks);

      // var newLi = $("<li>" + movie.title + "</li>");
      //             movieList.append(newLi);

    // stocks.each(function(stock) {
    //   var newLi = $(`<p>
    //                     ${stock.ticker}
    //                 </p>`);
    //   foot.append(newLi);
    // });
}

function loadStocks() {
    //tutaj wykonaj połączenie Ajaxem
    $.ajax({
      url: stock_path + "/stocks",
      method: 'GET',
      dataType: "json"
      // data: {
      //
      // },
    }).done(function(response) {
      console.log(response);
      showStocks(response);
    }).fail(function(e) { console.log(e); });
}
loadStocks();


let but = $('button');

but.on('click', function() {
  $('body').css('opacity', '0.2');
} )



});
//
// $( function() {
//
//     var movieList = $( '.list' );
//     var movieUrl = 'https://swapi.co/api/films/';
//
//     function insertContent( movies ) {
//         //tutaj zrób pętlę po filmach
//         //wygeneruj kolejne LI i wstaw do listy movieList
//         movies.forEach(function (movie) {
//             var newLi = $("<li>" + movie.title + "</li>");
//             movieList.append(newLi);
//         })
//     }
//
//     function loadMovies() {
//         //tutaj wykonaj połączenie Ajaxem
//         $.ajax({url: movieUrl, method: "GET"})
//             .done(function (response) {
//                 insertContent(response.results)
//             })
//             .fail(function (error) {
//                 console.log(error);
//             });
//     }
//
//     loadMovies();
// });
