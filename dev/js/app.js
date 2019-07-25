import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import Select from 'react-select';
import { Lines } from 'react-preloaders';
import { Results } from './components/results.js';
import { LineGraph } from './components/linegraph.js';
import { Shares } from './components/shares.js';
import { Dividends } from './components/dividends.js';
import { FinFactor } from './components/finfactor.js';
import { StockInfo } from './components/stockinfo.js';
import { Cites, Header } from './components/layout.js';
import randomCite from './components/layout.js';
// const iex = require('iexcloud_api_wrapper');

// require('dotenv').config();

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)
    this.state = {
      changeSite: false,
      author: '',
      cite: '',
      stockData: '',
      selectedStockData: '',
      selectedCompany: '',
      stockNames: [],
      clearable: true,
      searchable: true,
    }
  }

  handler(searchCompany) {
    sessionStorage.setItem("sessionSelectedCompany", searchCompany.value);
    let selectedStockData = "";
    if (searchCompany.value) {
      selectedStockData = this.state.stockData.stocks.filter(x => x.name === searchCompany.value);
    }
    this.setState({
      selectedCompany: searchCompany.value,
      selectedStockData: selectedStockData ? selectedStockData : "",

    })
  }


  componentDidMount() {
    const rand = randomCite();
    // fetch(`https://cloud.iexapis.com/stable/ref-data/region/US/symbols?token=pk_789b38e7087c425081f92a10ec76bfd3`) - pobiera wszystkei symbole z US
    fetch(`https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=pk_789b38e7087c425081f92a10ec76bfd3`)
      .then(res => res.json())
      .then(data => {
        debugger;
        let stockNames = data.map(function (x) {
          return { value: x.symbol, label: x.companyName };
        })
        let randomCite = rand;
        this.setState({
          stockNames,
          author: randomCite.author,
          cite: randomCite.cite,
        });
      });
  }


  // componentDidMount() {
  //   const rand = randomCite();
  //   fetch(`https://api.myjson.com/bins/gm49r`)
  //     .then(res => res.json())
  //     .then(data => {
  //       let stockNames = data.stocks.map(x => x.name);
  //       let sessionCompany = sessionStorage.getItem("sessionSelectedCompany");
  //       let selectedStockData = "";
  //       let randomCite = rand;
  //       if (sessionCompany) {
  //         selectedStockData = data.stocks.filter(x => x.name === sessionCompany);
  //       }

  //       this.setState({
  //         stockNames,
  //         stockData: data,
  //         selectedCompany: sessionCompany ? sessionCompany : "",
  //         selectedStockData: selectedStockData ? selectedStockData : "",
  //         author: randomCite.author,
  //         cite: randomCite.cite,
  //       });
  //     });
  // }


  handleChange = selectedCompany => {
    sessionStorage.setItem('sessionSelectedCompany', selectedCompany.value);
    // fetch(`https://cloud.iexapis.com/stable/stock/` + selectedCompany.value + `/quote?token=pk_789b38e7087c425081f92a10ec76bfd3`)
    /stock/aapl / news / last / 1
    fetch(`https://cloud.iexapis.com/stable/stock/` + selectedCompany.value + `/chart/max?token=pk_789b38e7087c425081f92a10ec76bfd3`)// dane za max lat
      .then(res => res.json())
      .then(data => {
        debugger;
        let aaa = new Stock();
        aaa.id = data.asdasd;



        //mapowanie data na stocks json

        // let selectedStockData = this.state.stockData.stocks.filter(x => x.name === selectedCompany.value);
        this.setState({ selectedCompany: aaa.label });
      });

  };

  // handleChange = selectedCompany => {
  //   sessionStorage.setItem('sessionSelectedCompany', selectedCompany.value);
  //   let selectedStockData = this.state.stockData.stocks.filter(x => x.name === selectedCompany.value);
  //   this.setState({ selectedCompany: selectedCompany.value, selectedStockData });
  // };
class StockData {
  date: Date,
  value: int
}

class Sock {
  id: int,
  name: string,
  history: Array(StockData),
    constructor(id){
  this.id = id;
}
}



render() {
  debugger;
  if (this.state.stockNames.length == 0) {
    return (<><Lines /></>);
  } else {
    let options = this.state.stockNames;
    debugger;
    if (!this.state.selectedCompany) {
      return (<>
        <div className="entryImg">
          <div className="centerDiv">
            <div className="backDiv"></div>
            <div>
              <Select
                className='selector'
                name="companyNameSelector"
                placeholder='Wybierz spółkę'
                value={this.state.selectedCompany.value}
                onChange={this.handleChange}
                clearable={this.state.clearable}
                searchable={this.state.searchable}
                options={options}
              />
              <Cites author={this.state.author} cite={this.state.cite} />
            </div>
          </div>
        </div>
      </>);
    } else {
      debugger;
      let currOptions = options.filter(item => { return item.value != sessionStorage.getItem('sessionSelectedCompany') })
      return (<><div className="stick-header"><header><Header stock={this.state.selectedStockData[0]} options={currOptions} handler={this.handler} /></header></div>
        <Main stock={this.state.selectedCompany} stockData={this.state.selectedStockData} />
      </>)
    }
  }
}
}

const currYear = new Date().getFullYear();


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockCompany: this.props.stock,
      stockData: this.props.stockData[0],
      selectedYear: this.GetYearsToShow(this.props.stockData[0].years)[0],
      yearsToShow: [],
    }
  }

  // componentWillMount() {
  //   document.body.style.overflow = "auto";
  //   document.body.style.position = "absolute";
  // }

  componentWillReceiveProps(newProps) {
    debugger;
    this.setState({
      selectedYear: this.GetYearsToShow(newProps.stockData[0].years)[0],
    })
  }

  GetYearsToShow(years) {
    const yearsToShow = years.map(item => { return item.year }).sort((a, b) => { a > b });
    return yearsToShow;
  }

  componentDidMount() {
    debugger;
    let yearsToShow = this.GetYearsToShow(this.state.stockData.years);
    let selectedYear = yearsToShow[0];
    this.setState({ yearsToShow, selectedYear });
  }


  handleClick(e) {
    this.setState({
      selectedYear: e.target.value,
    })
  }


  render() {
    debugger;
    const yearsToShow = this.GetYearsToShow(this.props.stockData[0].years);
    const actualYear = this.state.selectedYear;
    const actualYearData = this.props.stockData[0].years.filter((elem) => { return elem.year == actualYear });
    const allDataFromStartToToday = this.props.stockData[0].years.filter((elem) => { return elem.year <= actualYear });
    const previousYearData = this.props.stockData[0].years.filter(elem => { return elem.year == (actualYear - 1) });
    const dividendsFromIPO = allDataFromStartToToday.map(item => parseFloat(item.dividend)).reduce((a, b) => (a + b));
    const shares = actualYearData[0].shareholders.map(x => [x.share]);
    const holders = actualYearData[0].shareholders.map(x => [x.holder]);
    const info = actualYearData[0].events.map(x => [x]);

    return (<>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-m-4 col-l-3">
            <div className="element info">
              <>
                <h2>Informacje</h2>
                <StockInfo info={info} />
              </>
            </div></div>
          <div className="col-xs-12 col-m-8 col-l-6">
            <div className="element">
              <LineGraph data={actualYearData[0].price} />
            </div>
          </div>
          <div className="col-xs-12 col-m-6 col-l-3">
            <div className="element">
              <Dividends dividend={dividendsFromIPO} price={this.props.stockData[0].price_IPO} actualYear={actualYearData[0]} />
            </div>
          </div>
          {currYear == actualYear ? null : <div className="col-xs-7 col-m-6 col-l-4">
            <div className="element">
              <div><FinFactor actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
            </div>
          </div>}
          <div className="col-xs-5 col-m-6 col-l-4">
            <div className="element">
              <Shares shares={shares} holders={holders} /></div>
          </div>
          {currYear == actualYear ? null : <div className="col-xs-12 col-m-6 col-l-4">
            <div className="element">
              <div><Results actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
            </div>
          </div>}
        </div>
      </div>}
        <footer>
        <div className="stick-footer"><div className="navigation">{yearsToShow.length > 0 ? yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className={year == currYear ? 'currYear' : "circle"}>{year == currYear ? 'O firmie' : year}</button>) : ""}</div></div>
      </footer>
    </>
    )
  }
}

class App extends Component {

  render() {
    return (<HashRouter>
      <>
        <Route exact path='/' component={LandingPage} />
        <Route path='/main' component={Main} />
      </>
    </HashRouter>
    )
  }
}



ReactDOM.render(<App />, document.getElementById("app"))