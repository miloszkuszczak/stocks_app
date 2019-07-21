
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
import { Dividends, LineGraph, Shares, Results, FinFactor, StockInfo } from './components/stock.js';



class Cites extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<><h2><cite>{this.props.cite}</cite></h2> <h3>{this.props.author}</h3></>)
  }
}



class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<>
      <h1>{this.props.stock.name}</h1>
      <h2>Ticker: {this.props.stock.ticker}</h2>
      <h3>Cena debiutu: {this.props.stock.price_IPO}</h3>
      <h3>Data debiutu: {this.props.stock.date_IPO}</h3>
      <Search options={this.props.options} handler={this.props.handler} /></>)
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
              <Dividends dividend={dividendsFromIPO} price={this.props.stockData[0].price_IPO} actualYear={actualYearData[0]} />
            </div>

          </div>
          <div className="col-xs-4 col-m-12">
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
      <div className="stick-footer"><footer><div className="navigation"><span className='line'>{yearsToShow.length > 0 ? yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className="circle">{year}</button>) : ""}</span></div></footer>
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


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCompany: '',
      clearable: true,
      searchable: true,
    }
  }
  render() {
    return <Select
      className='selector inHeader'
      name="companyNameSelector"
      placeholder='Wybierz spółkę'
      value=''
      onChange={this.props.handler}
      clearable={this.state.clearable}
      searchable={this.state.searchable}
      options={this.props.options}
    />
  }
}



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


  randomCite() {
    const cite = [
      { author: "Warren Buffet", cites: ["Na giełdzie kapitał płynie od aktywnych do cierpliwych", "Wall Street to miejsce, gdzie ludzie przyjeżdżający limuzynami proszą o rady tych przyjeżdżających metrem",] },
      { author: "dr Alexander Elder", cites: ["Rynek potrafi być dłużej irracjonalny niż inwestor wypłacalny", "Trend is your friend"] },
      { author: "George Soros", cites: ["Bitcoin jest super", "Lubię oszukiwać ludzi na spekulacji"] }];

    const citesArray = cite.map(element => [element.author, element.cites]);
    const authorNo = getRandomIntInclusive(0, citesArray.length - 1);
    const exactCite = citesArray[authorNo][1].map(element => element);
    return ({
      author: citesArray[authorNo][0],
      cite: exactCite[getRandomIntInclusive(0, exactCite.length - 1)],
    });
  }

  componentDidMount() {
    fetch(`https://api.myjson.com/bins/gm49r`)
      .then(res => res.json())
      .then(data => {
        let stockNames = data.stocks.map(x => x.name);
        let sessionCompany = sessionStorage.getItem("sessionSelectedCompany");
        let selectedStockData = "";
        let randomCite = this.randomCite();
        if (sessionCompany) {
          selectedStockData = data.stocks.filter(x => x.name === sessionCompany);
        }

        this.setState({
          stockNames,
          stockData: data,
          selectedCompany: sessionCompany ? sessionCompany : "",
          selectedStockData: selectedStockData ? selectedStockData : "",
          author: randomCite.author,
          cite: randomCite.cite,
        });
      });
  }



  handleChange = selectedCompany => {
    sessionStorage.setItem('sessionSelectedCompany', selectedCompany.value);
    let selectedStockData = this.state.stockData.stocks.filter(x => x.name === selectedCompany.value);
    this.setState({ selectedCompany: selectedCompany.value, selectedStockData });
  };

  render() {
    if (!this.state.stockData) {
      return (<><Lines /></>);
    } else {
      let options = this.state.stockNames.map(function (stockName) {
        return { value: stockName, label: stockName };
      })

      if (!this.state.selectedCompany && !this.state.selectedStockData) {
        return (<>
          <div className="entryImg">

            <div className='centerDiv'>
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
              </div>
              <Cites author={this.state.author} cite={this.state.cite} />
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


ReactDOM.render(<App />, document.getElementById("app"))