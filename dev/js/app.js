
import React, {Component} from "react";
import ReactDOM from "react-dom";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';


class Cites extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    const citeNo = this.props.citeNo

    const cites = ['"Kupuj kiedy leje się krew"', '"Hossa wspina sie po ścianie strachu"', '"Bój się kiedy inni sa chytrzy"', '"Trend is your friend"'];
  
  return (<>
          <h1>{cites[citeNo]}</h1>
          </>
  )}
}

class StockSearch extends Component {
  constructor(props) {
    super(props);
      this.state ={
      stock: '',
    }
  }
  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
})
}
  handleEnter(e) {
    if (e.keyCode == 13) {
        this.setState({
          changeSite: true,
        })
    }
  }


  render() {
    return <input type='text' name="stock" value={this.state.stock} onChange={e=>this.handleChange(e)} onKeyDown={e=>this.handleEnter(e)}/>
    };
}

class Main extends Component {
  render() {
    return (<>
            <div className="container">
   <div className="row">
        <div class="col-xs-12">
           <header>To będzie info o stronie/wybranej spółce     || Kurs Dnia    || Inne informacje</header>
        </div>
        <div className="col-xs-3">
            <div class="element">To jest element z ważnymi wydarzeniami w danym roku</div>
        </div>

        <div className="col-xs-6">
           <section class="element">Tu wykres (skorzystam z bilbiotek wykresu za dany rok)</section>
         </div>
         <div className="col-xs-3">
               <div className="element"><div>Dywidendy</div></div>
      </div>
      <div className="col-xs-6">
          <div className="element"><div>Rekomendacje</div></div>
        </div>
        <div className="col-xs-6">
            <section className="element">Dziennik inwestora [textarea=>local Storage</section>
        </div>


        <div className="col-xs-12">
           <footer><span className="line"><div class="circle">2019</div></span></footer>
       </div>
    </div>

   </div>
              </>

    )
  }
}

class FirstView extends Component {
  render() {
    return (<>
      <Cites/>
      <StockSearch/>
    </>)

  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      changeSite: false,
      citeNo: 0,
    }
  }

componentDidMount() {
  this.setState({
    citeNo: getRandomIntInclusive(0,3),
  })
}
  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
})
}
  handleEnter(e) {
    if (e.keyCode == 13) {
        this.setState({
          changeSite: true,
        })
    }
  }
  


  render() {
    if (this.state.changeSite == false) {
    return ( <>
              <Cites citeNo={this.state.citeNo}/>
              <input type='text' name="stock" value={this.state.stock} onChange={e=>this.handleChange(e)} onKeyDown={e=>this.handleEnter(e)}/>
            </>
    )}
    else {
      return <Main/> 
    }
  }
}



ReactDOM.render(<App/>, document.getElementById("app"))





// $( function() {

// var foot = $('.element:eq(3)');
// let news = $('.element:eq(1)');
// var stock_path = 'http://localhost:3000';

// function showStocks(stocks) {
//     //Użyj sposobu na pobranie wartości z obiektu (nie kluczy) np. pętla for in
//       stocks.forEach(function(stock) {
//         if (stock.name == "WIELTON") {
//         let newLi = $(`<div> ${stock.ticker} można było kupić ${stock.data_debiutu} za ${stock.cena_debiutu} </div>`);
//         let newN = $(`<span> ${stock[2019].events[1]} </span>`);
//         foot.append(newLi);
//         news.append(newN);
//           }
//       });
//       foot.append(stocks);

//       // var newLi = $("<li>" + movie.title + "</li>");
//       //             movieList.append(newLi);

//     // stocks.each(function(stock) {
//     //   var newLi = $(`<p>
//     //                     ${stock.ticker}
//     //                 </p>`);
//     //   foot.append(newLi);
//     // });
// }

// function loadStocks() {
//     //tutaj wykonaj połączenie Ajaxem
//     $.ajax({
//       url: stock_path + "/stocks",
//       method: 'GET',
//       dataType: "json"
//       // data: {
//       //
//       // },
//     }).done(function(response) {
//       console.log(response);
//       showStocks(response);
//     }).fail(function(e) { console.log(e); });
// }
// loadStocks();


// let but = $('div.circle');

// but.on('click', function() {
//   $('.element').css('opacity', '0.1');
// } )



// });
// //
// // $( function() {
// //
// //     var movieList = $( '.list' );
// //     var movieUrl = 'https://swapi.co/api/films/';
// //
// //     function insertContent( movies ) {
// //         //tutaj zrób pętlę po filmach
// //         //wygeneruj kolejne LI i wstaw do listy movieList
// //         movies.forEach(function (movie) {
// //             var newLi = $("<li>" + movie.title + "</li>");
// //             movieList.append(newLi);
// //         })
// //     }
// //
// //     function loadMovies() {
// //         //tutaj wykonaj połączenie Ajaxem
// //         $.ajax({url: movieUrl, method: "GET"})
// //             .done(function (response) {
// //                 insertContent(response.results)
// //             })
// //             .fail(function (error) {
// //                 console.log(error);
// //             });
// //     }
// //
// //     loadMovies();
// // });
