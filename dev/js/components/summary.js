
import React, { Component } from "react";
import { capitalFirst } from './utils.js'



class Summary extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<>
            <h2>Podsumowanie na GPW</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Stopa zwrotu od debiutu</td>
                        <td> PLN</td>
                    </tr>
                    <tr>
                        <th>Licząc dywidendy</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Na giełdzie od:</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Emisje akcji</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Liczba akcji</th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>)
    }
}




export { Summary };