
import React, { Component } from "react";
import { addSpace } from './utils.js';
import { toThousand } from './utils.js';

class Summary extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        debugger;
        const valueDiff = (this.props.data[1].price[11].value - this.props.priceIPO);
        const withDividens = (valueDiff + this.props.dividend) / this.props.priceIPO;
        const accNumEquit = parseFloat(this.props.data[1].equites) - parseFloat(this.props.data[this.props.data.length - 1].equites);

        return (<>
            <h2>Podsumowanie na GPW</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Stopa zwrotu od debiutu</th>
                        <td>{(valueDiff / this.props.priceIPO * 100).toFixed(2) + "%"}</td>
                    </tr>
                    <tr>
                        <th>Licząc dywidendy</th>
                        <td>{(withDividens * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>Na giełdzie od:</th>
                        <td>{(this.props.data.length - 1) * 12} miesięcy</td>
                    </tr>
                    <tr>
                        <th>Emisje akcji</th>
                        <td>{accNumEquit == 0 ? 'brak emisji' : accNumEquit > 0 && accNumEquit + 'szt.'}</td>
                    </tr>
                    <tr>
                        <th>Skup akcji</th>
                        <td>{accNumEquit == 0 ? 'brak skupów' : accNumEquit < 0 && accNumEquit + 'szt.'}</td>
                    </tr>
                    <tr>
                        <th>Liczba akcji</th>
                        <td>{addSpace(toThousand(parseFloat(this.props.data[1].equites)))} tys. szt.</td>
                    </tr>
                </tbody>
            </table>
        </>)
    }
}




export { Summary };