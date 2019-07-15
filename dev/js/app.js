
import React, { Component } from "react";
import Select from 'react-select';
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import Stockdata from '../stocks.json';
import { Line, Doughnut, Bar } from 'react-chartjs-2';


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


class Shares extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const chartData = {
      labels: this.props.holders,
      datasets: [
        {
          data: this.props.shares,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#000000'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            "#FFFFFF"
          ]
        }]
    }
    return (<div style={{ height: '200px', width: '400px' }}><Doughnut options={{ maintainAspectRatio: false }} data={chartData} /></div>
    )
  }
}


class Dividends extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const data = {
      labels: ['Dywidendy', 'Cena debiutu'],
      datasets: [
        {
          label: 'Zwrot z inwestycji',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [this.props.dividend, this.props.price]
        }
      ]
    };

    return (
      <div>
        <h2>Bar Example (custom size)</h2>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}

        />
      </div>
    );
  }
}


class LineGraph extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const chartData = this.props.data.map(x => [x.value]);
    const chartLabel = this.props.data.map(x => [x.month]);
    const data = {
      labels: chartLabel,
      datasets: [
        {
          label: 'Kurs',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartData,
        }
      ]
    }
    const lineChart = (
      <div
        style={{
          // width: "400px",
          height: "100%"
        }}
      >
        <Line data={data} />
      </div>
    );

    return (<>
      {lineChart}
    </>
    )
  }
}

class StockInfo extends Component {

}

class Financial extends Component {

}

class Equites extends Component {

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

    const actualYearData = this.state.stockData.years.filter((elem) => { return elem.year == this.state.selectedYear });

    const allDataFromStartToToday = this.state.stockData.years.filter((elem) => { return elem.year <= this.state.selectedYear });

    const dividendsFromIPO = allDataFromStartToToday.map(item => parseFloat(item.dividend)).reduce((a, b) => (a + b));
    debugger;
    let shares = actualYearData[0].shareholders.map(x => [x.share]);
    let holders = actualYearData[0].shareholders.map(x => [x.holder]);

    return (<>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <header>{this.state.stockCompany} </header>
          </div>
          <div className="col-xs-3">
            <div className="element info"> {actualYearData[0].events.map((event, index) => <li key={index}>{event}</li>)} </div>
          </div>
          <div className="col-xs-6">
            <div className="element">
              <div style={{ height: '100%' }} ><LineGraph data={actualYearData[0].price} /></div>
            </div>
          </div>
          <div className="col-xs-3">
            <div className="element"><div>Dywidenda {actualYearData[0].dividend} PLN </div><div>Stopa dywidendy: {(actualYearData[0].dividend / actualYearData[0].price.map(x => x.value)[9]) * 100 + '%'}
              <div>Suma dywidend od debiutu: {dividendsFromIPO} PLN</div><div> Stopa zwrótu z samych dywidend od debiutu: {(dividendsFromIPO / this.state.stockData.price_IPO) * 100 + '%'}</div></div></div>
            <Dividends dividend={dividendsFromIPO} price={this.state.stockData.price_IPO} />
          </div>
          <div className="col-xs-6">
            <div className="element"><div> </div></div>
          </div>
          <div className="col-xs-6">
            <div className="element"> <div style={{ height: '100%' }}><Shares shares={shares} holders={holders} /></div></div>
          </div>
          <div className="col-xs-12">
            <footer><span className="line">
              {this.state.yearsToShow.length > 0 ? this.state.yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className="circle">{year}</button>) : ""}
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
      <Cites />
      <StockSearch />
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
      return (<>
        <Cites citeNo={this.state.citeNo} />
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
      return <Main stock={this.state.selectedCompany} stockData={this.state.selectedStockData} />
    }
  }


}


ReactDOM.render(<App />, document.getElementById("app"))