
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import { Line, Doughnut, Bar } from 'react-chartjs-2';



class Results extends Component {
  constructor() {
    super();
  }
  render() {

    return (<><h2>Wyniki finansowe</h2>
      <table>
        <thead>
          <tr>
            <th>Wynik</th>
            <th>Wartość</th>
            <th>Dynamika</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Przychody</th>
            <td>{parseFloat(this.props.actualYear.incomes).toFixed(2)} PLN</td>
            <td>{((this.props.actualYear.incomes - this.props.previousYear.incomes) / this.props.previousYear.incomes * 100).toFixed(2) + '%'}</td>
          </tr>
          <tr>
            <th>Zysk operacyjny</th>
            <td>{parseFloat(this.props.actualYear.operative_profit).toFixed(2)} PLN</td>
            <td>{((this.props.actualYear.operative_profit - this.props.previousYear.operative_profit) / this.props.previousYear.operative_profit * 100).toFixed(2) + '%'}</td>
          </tr>
          <tr>
            <th>Zysk netto</th>
            <td>{parseFloat(this.props.actualYear.net_profit).toFixed(2)} PLN</td>
            <td>{((this.props.actualYear.net_profit - this.props.previousYear.net_profit) / this.props.previousYear.net_profit * 100).toFixed(2) + '%'}</td>
          </tr>
          <tr>
            <th>Zobowiązania</th>
            <td>{parseFloat(this.props.actualYear.debts).toFixed(2)} PLN</td>
            <td>{((this.props.actualYear.debts - this.props.previousYear.debts) / this.props.previousYear.debts * 100).toFixed(2) + '%'}</td>
          </tr>
          <tr>
            <th>Koszty zarządu</th>
            <td>{parseFloat(this.props.actualYear.cost_of_board).toFixed(2)} PLN</td>
            <td>{((this.props.actualYear.cost_of_board - this.props.previousYear.cost_of_board) / this.props.previousYear.cost_of_board * 100).toFixed(2) + '%'}</td>
          </tr>
        </tbody>
      </table>
    </>)
  }
}

class FinFactor extends Component {
  constructor() {
    super();
  }
  render() {
    const currCapital = (parseFloat(this.props.actualYear.equites) * this.props.actualYear.price.map(x => x.value)[11]).toFixed(2);
    const prevCapital = (parseFloat(this.props.previousYear.equites) * this.props.previousYear.price.map(x => x.value)[11]).toFixed(2);
    const currAccVal = (parseFloat(this.props.actualYear.acc_value) * this.props.actualYear.equites);
    const prevAccVal = (parseFloat(this.props.previousYear.acc_value) * this.props.previousYear.equites);
    const lastPrice = this.props.actualYear.price.map(x => x.value)[11];
    const priceToProfit = parseFloat(lastPrice / (currAccVal / this.props.actualYear.equites)).toFixed(2);
    const priceToValue = parseFloat(lastPrice / (this.props.actualYear.net_profit / this.props.actualYear.equites)).toFixed(2);
    return (<><h2>Wskaźniki finansowe</h2>
      <table>
        <thead>
          <tr>
            <th>Wskaźnik</th>
            <th>Wartość</th>
            <th>Zmiana r / r</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kapitalizacja</td>
            <td>{currCapital} PLN</td>
            <td>{((currCapital - prevCapital) / prevCapital * 100).toFixed(2) + '%'}</td>
          </tr>
          <tr>
            <th>C/Z</th>
            <td>{priceToProfit}</td>
            <td>{'%'}</td>
          </tr>
          <tr>
            <th>C/WK</th>
            <td>{priceToValue}</td>
            <td>{'%'}</td>
          </tr>
          <tr>
            <th>Wskaźnik W. Buffeta</th>
            <td>{(priceToProfit * priceToValue).toFixed(2) > 20 || (priceToProfit * priceToValue).toFixed(2) < 0 ? <span style={{ color: 'orange' }}>{(priceToProfit * priceToValue).toFixed(2)}</span> : <span style={{ color: 'green' }}>{(priceToProfit * priceToValue).toFixed(2)}</span>}</td>
            <td>{}</td>
          </tr>
          <tr>
            <th>Liczba akcji</th>
            <td>{this.props.actualYear.equites / 1000} tys. szt.</td>
            <td>{(this.props.actualYear.equites - this.props.previousYear.equites) / 1000} tys. szt.</td>
          </tr>
        </tbody>
      </table>
    </>)
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
            '#867ADD',
            '#FFF8DD',
            '#5FBA7D',
            '#B4B5C6'
          ]
        }]
    }
    return (<div><h2>Akcjonariat</h2><Doughnut width={100} options={{ maintainAspectRatio: false }} data={chartData} /></div>
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

    return (<><h2 style={{ paddingBottom: '5px' }}>Historia dywidendowa</h2><div style={{ height: '40%' }}><Bar data={data} width={50} options={{ legend: { display: false }, maintainAspectRatio: false, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }} /></div>
      <div style={{ height: '55%' }}>
        <table className="striped">

          <tbody>
            <tr>
              <td>Dywidenda</td>
              <td>{(this.props.actualYear.dividend)} PLN</td>
            </tr>
            <tr>
              <td>Stopa dywidendy</td>
              <td><strong>{((this.props.actualYear.dividend / this.props.actualYear.price.map(x => x.value)[3]) * 100).toFixed(2) + '%'}</strong></td>
            </tr>
            <tr>
              <td>Suma dywidend od debiutu</td>
              <td>{this.props.dividend.toFixed(2)} PLN</td>
            </tr>
            <tr>
              <td>Stopa zwrotu od debiutu</td>
              <td><strong>{((this.props.dividend / this.props.price) * 100).toFixed(2) + '%'}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>);
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
          label: 'Kurs akcji',
          fill: true,
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

    return (<>
      <Line data={data} width={100} options={{ legend: { display: false }, maintainAspectRatio: false }} />
    </>
    )
  }
}


class StockInfo extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    debugger;
    return (<>
      <table>
        <tbody>
          {this.props.info.map((event, index) => <tr key={index}><td>{event}</td></tr>)}
        </tbody>
      </table>
    </>)
  }
}

export { Dividends, LineGraph, Shares, Results, FinFactor, StockInfo };