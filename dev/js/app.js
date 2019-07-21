
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
import { Dividends, LineGraph, Shares, Results, FinFactor, StockInfo } from './components/stock.js';


class Cites extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const citeNo = this.props.citeNo
    const aaa = [
      { author: "Warren Buffet", cites: ["Na giełdzie kapitał płynie od aktywnych do cierpliwych", "Wall Street to miejsce, gdzie ludzie przyjeżdżający limuzynami proszą o rady tych przyjeżdżających metrem",] },
      { author: "", cites: ["Rynek potrafi być dłużej irracjonalny niż inwestor wypłacalny", "Trend is your friend"] }]
    const cites = ['"Kupuj kiedy leje się krew"', '"Hossa wspina sie po ścianie strachu"', '"Bój się kiedy inni sa chytrzy"', '"Trend is your friend"'];
    return (<>
      <h1>{cites[citeNo]}</h1>
    </>
    )
  }
}


class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<>Nazwa spółki: {this.props.stock.name}, {this.props.stock.ticker}, Cena debiutu: {this.props.stock.price_IPO}, Data debiutu: {this.props.stock.date_IPO}, Wyszukaj nową spółkę:</>)
  }

}


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

  GetYearsToShow(years) {
    const yearsToShow = years.map(item => { return item.year }).sort((a, b) => { a > b });
    return yearsToShow;
  }

  componentDidMount() {

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

    const actualYearData = this.state.stockData.years.filter((elem) => { return elem.year == this.state.selectedYear });

    const allDataFromStartToToday = this.state.stockData.years.filter((elem) => { return elem.year <= this.state.selectedYear });

    const previousYearData = this.state.stockData.years.filter(elem => { return elem.year == this.state.selectedYear - 1 });

    const dividendsFromIPO = allDataFromStartToToday.map(item => parseFloat(item.dividend)).reduce((a, b) => (a + b));

    const shares = actualYearData[0].shareholders.map(x => [x.share]);

    const holders = actualYearData[0].shareholders.map(x => [x.holder]);

    const info = actualYearData[0].events.map(x => [x]);

    return (<><div className="stick-header"><header><Header stock={this.state.stockData} /></header></div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">

          </div>
          <div className="col-xs-3">
            <div className="element info">
              <>
                <h2>Informacje</h2>
                <StockInfo info={info} />
              </>
            </div></div>
          <div className="col-xs-6">
            <div className="element">
              <LineGraph data={actualYearData[0].price} />
            </div>
          </div>
          <div className="col-xs-3">
            <div className="element">
              <Dividends dividend={dividendsFromIPO} price={this.state.stockData.price_IPO} actualYear={actualYearData[0]} />
            </div>

          </div>
          <div className="col-xs-4">
            <div className="element">
              <div><FinFactor actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="element">
              <Shares shares={shares} holders={holders} /></div>
          </div>
          <div className="col-xs-4">
            <div className="element">
              <div><Results actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="stick-footer"><footer><div className="navigation"><span className='line'>{this.state.yearsToShow.length > 0 ? this.state.yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className="circle">{year}</button>) : ""}</span></div></footer>
      </div>
    </>
    )
  }
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(0);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeSite: false,
      citeNo: 0,
      stockData: '',
      selectedStockData: '',
      selectedCompany: '',
      stockNames: [],
      clearable: true,
      searchable: true,
    }
  }



  componentDidMount() {
    this.setState({
      citeNo: getRandomIntInclusive(0, 3),
    })
    fetch(`https://api.myjson.com/bins/gm49r`)
      .then(res => res.json())
      .then(data => {
        let stockNames = data.stocks.map(x => x.name);
        this.setState({
          stockNames,
          stockData: data

        });
      });
  }

  handleChange = selectedCompany => {
    let selectedStockData = this.state.stockData.stocks.filter(x => x.name === selectedCompany.value);
    this.setState({ selectedCompany: selectedCompany.value, selectedStockData });
  };

  render() {
    if (!this.state.selectedCompany && !this.state.selectedStockData) {
      let options = this.state.stockNames.map(function (stockName) {
        return { value: stockName, label: stockName };
      })
      return (<><div className='centerDiv'>

        <div>
          <Select
            className='selector'
            name="companyNameSelector"
            value={this.state.selectedCompany.value}
            onChange={this.handleChange}
            clearable={this.state.clearable}
            searchable={this.state.searchable}
            options={options}
          />
        </div>
        <Cites citeNo={this.state.citeNo} />
      </div>
      </>);
    } else {
      return <Main stock={this.state.selectedCompany} stockData={this.state.selectedStockData} />
    }
  }
}


ReactDOM.render(<App />, document.getElementById("app"))