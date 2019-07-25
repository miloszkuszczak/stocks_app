
import React, { Component } from "react";
import { Results } from './components/results.js';
import { LineGraph } from './components/linegraph.js';
import { Shares } from './components/shares.js';
import { Dividends } from './components/dividends.js';
import { FinFactor } from './components/finfactor.js';
import { StockInfo } from './components/stockinfo.js';

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

    componentWillMount() {
        document.body.style.overflow = "auto";
        document.body.style.position = "absolute";
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
                    <div className="col-xs-7 col-m-6 col-l-4">
                        <div className="element">
                            <div><FinFactor actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
                        </div>
                    </div>
                    <div className="col-xs-5 col-m-6 col-l-4">
                        <div className="element">
                            <Shares shares={shares} holders={holders} /></div>
                    </div>
                    <div className="col-xs-12 col-m-6 col-l-4">
                        <div className="element">
                            <div><Results actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="stick-footer"><div className="navigation">{yearsToShow.length > 0 ? yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className="circle">{year}</button>) : ""}</div></div>
            </footer>
        </>
        )
    }
}

export { Main };