
import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';

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
        return (<div><h2>Akcjonariat</h2><Doughnut options={{ maintainAspectRatio: true }} data={chartData} /></div>
        )
    }
}

export { Shares };