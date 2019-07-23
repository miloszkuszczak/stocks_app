import React, { Component } from "react";
import Select from 'react-select';

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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(0);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomCite = () => {
    const cite = [
        { author: "Warren Buffet", cites: ["Na giełdzie kapitał płynie od aktywnych do cierpliwych", "Wall Street to miejsce, gdzie ludzie przyjeżdżający limuzynami proszą o rady tych przyjeżdżających metrem",] },
        { author: "dr Alexander Elder", cites: ["Rynek potrafi być dłużej irracjonalny niż inwestor wypłacalny", "Trend is your friend"] },
        { author: "George Soros", cites: ["Bitcoin jest super", "Lubię oszukiwać ludzi na spekulacji"] },
        { author: "Albert Rokicki", cites: ['Pierwszy dzień tygodnia wskazuje fałszywy kierunek tygodnia', 'Z inwestorskim pozdrowieniem'] }];

    const citesArray = cite.map(element => [element.author, element.cites]);
    const authorNo = getRandomIntInclusive(0, citesArray.length - 1);
    const exactCite = citesArray[authorNo][1].map(element => element);
    return ({
        author: citesArray[authorNo][0],
        cite: exactCite[getRandomIntInclusive(0, exactCite.length - 1)],
    });
}
export default randomCite;

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

class Cites extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<><h2><cite>{this.props.cite}</cite></h2> <h3>{this.props.author}</h3></>)
    }
}

export { Search, Header, Cites };