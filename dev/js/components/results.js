import React, { Component } from "react";


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

export { Results };