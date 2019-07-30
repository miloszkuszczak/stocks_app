import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';


class ProfitGraph extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        debugger;
        const rev_data = this.props.data.reverse();
        const profits = rev_data.map(item => [parseFloat(item.operative_profit)]);
        const incomes = rev_data.map(item => [parseFloat(item.incomes)]);
        const labels = rev_data.map(item => [parseFloat(item.year)]);

        const data = {
            datasets: [{
                label: 'Zysk operacyjny',
                type: 'line',
                data: incomes,
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: 'rgba(184,63,191,0.63)',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2'
            }, {
                type: 'bar',
                label: 'Przychody',
                data: profits,
                fill: false,
                backgroundColor: 'rgba(133,191,63,0.63)',
                borderColor: '#0099FF',
                hoverBackgroundColor: '#00CCFF',
                hoverBorderColor: '#0099FF',
                yAxisID: 'y-axis-1'
            }]
        };

        const options = {
            responsive: true,
            tooltips: {
                mode: 'label'
            },
            elements: {
                line: {
                    fill: false
                }
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: false
                        },
                        labels: labels,
                    },
                ],
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true
                        }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true
                        }
                    }
                ]
            }
        };

        // const plugins = [{
        //     afterDraw: (chartInstance, easing) => {
        //         const ctx = chartInstance.chart.ctx;
        //         ctx.fillText("This text drawn by a plugin", 100, 100);
        //     }
        // }];

        // export default React.createClass({
        //     displayName: 'MixExample',

        //     render() {
        return (<div>
            <h2>Przychody do zysku operacyjnego</h2>
            <div style={{ width: '95%', height: '95%' }}>
                <Bar
                    data={data}
                    options={options}
                    height={300}

                />
            </div>
        </div>
        )
    };

}

export { ProfitGraph };