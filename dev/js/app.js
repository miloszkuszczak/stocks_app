
import React, {Component} from "react";
import Select from 'react-select';
import ReactDOM from "react-dom";
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import Stockdata from '../stocks.json'
import { Chart } from "react-charts";


class Cites extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    const citeNo = this.props.citeNo
    const aaa = [
      {author: "Warren Buffet", cites: ["aaa","bbb"]},
      {author: "", cites: []}]
    const cites = ['"Kupuj kiedy leje się krew"', '"Hossa wspina sie po ścianie strachu"', '"Bój się kiedy inni sa chytrzy"', '"Trend is your friend"'];
  return (<>
          <h1>{cites[citeNo]}</h1>
          </>
  )}
}


class Dividends extends Component {
 
}

class Graph extends Component {
    constructor(props) {
    super(props);
    }
    render() {
      debugger;
          const chartData = this.props.data.map(x=> [x.month, x.value]);
          const lineChart = (

          <div
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <Chart
              data={[
                {
                  label: "Series 1",
                  data: chartData
                },
              ]}
              axes={[
                { primary: true, type: "linear", position: "bottom" },
                { type: "linear", position: "left" }
              ]}
            />
          </div>
        );

  return(<>
          {lineChart}
        </>
    )}
}

class StockInfo extends Component {

}

class Financial extends Component {

}

class Equites extends Component {

}

class Reco extends Component {

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
  constructor(props) {
    super(props);
    this.state={
      stockCompany: this.props.stock,
      stockData: this.props.stockData[0],
      selectedYear: this.GetYearsToShow(this.props.stockData[0].years)[0],
      yearsToShow: [],
    }
  }

  GetYearsToShow(years){
    const yearsToShow = years.map(item => {return item.year}).sort((a,b) => {a>b});
    return yearsToShow;
  }

  componentDidMount() {
    
    let yearsToShow = this.GetYearsToShow(this.state.stockData.years);
    let selectedYear = yearsToShow[0];
    this.setState({yearsToShow,selectedYear});
  }

  handleClick(e) {
    this.setState({
       selectedYear: e.target.value,
      
      })
  }



  render() {
    debugger;
    const actualYearData = this.state.stockData.years.filter((elem) => {return elem.year == this.state.selectedYear});
    const yearsFromStartToToday = this.state.stockData.years.filter((elem) => {return elem.year <= this.state.selectedYear});



  // var divident = yearsFromStartToToday.map(x=>x.divident).reduce();

    return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <header>{this.state.stockCompany}</header>
          </div>
          <div className="col-xs-3">
            <div className="element info"> {actualYearData[0].events.map((event, index) => <li key={index}>{event}</li>)} </div>
          </div>
          <div className="col-xs-6">
               <section className="element">
                <Graph data={actualYearData[0].cena} />
               </section>
          </div>
          <div className="col-xs-3">
                <div className="element"><div>Dywidenda {actualYearData[0].dividend} </div><div>Stopa dywidendy: {(actualYearData[0].dividend/actualYearData[0].cena.map(x=> x.value)[9])* 100 + '%'}
                                              Suma dywidend od debiutu: {} Stopa zwrótu z samych dywidend od debiutu: {}</div></div>
          </div>
          <div className="col-xs-6">
              <div className="element"><div>  <h1></h1></div></div>
          </div>
          <div className="col-xs-6">
            <section className="element"> </section>
          </div>
          <div className="col-xs-12">
            <footer><span className="line">
              {this.state.yearsToShow.length > 0 ? this.state.yearsToShow.map(year => <button key={year} value={year} onClick={e=>this.handleClick(e)} className="circle">{year}</button>) : ""}
            </span></footer>
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
      stockData: '',
      selectedStockData: '',
      selectedCompany: '',
      stockNames: [],
      clearable: true,
      searchable:true,
    }
  }

componentDidMount() {
  this.setState({
    citeNo: getRandomIntInclusive(0,3),
  })
    fetch(`https://api.myjson.com/bins/l9t8b`)
        .then(res => res.json())
        .then(data => {
          let stockNames = data.stocks.map(x=>x.name);
          this.setState({stockNames, 
                         stockData: data});
          });
}

  handleChange = selectedCompany => {
    let selectedStockData = this.state.stockData.stocks.filter(x=>x.name === selectedCompany.value);
    this.setState({ selectedCompany: selectedCompany.value, selectedStockData});
  };

  render() {
    if (!this.state.selectedCompany && !this.state.selectedStockData) {
      let options = this.state.stockNames.map(function (stockName) {
        return { value: stockName, label: stockName };
      })
        return ( <>
                  <Cites citeNo={this.state.citeNo}/>
                  <div>
                    <Select
                      name="companyNameSelector"
                      value={this.state.selectedCompany.value}
                      onChange={this.handleChange}
                      clearable={this.state.clearable}
                      searchable={this.state.searchable}
                      options={options}                  
                    />
                  </div>
                </>);
            } else {
      return <Main stock={this.state.selectedCompany} stockData={this.state.selectedStockData}/> 
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
