import React, { Component } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);

class PieChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            options:{
                chart: {
                    type: 'pie',
                    animation:false,
                    renderTo:this.props.id,
                    backgroundColor:null,
                    plotBorderWidth:0,
                    spacingBottom:20,
                    spacingTop:5,
                    style: {
                      fontFamily: 'sans-serif',
                    },
                },
                credits: {
                    text: 'by hammerdirt',
                    href: 'https://www.hammerdirt.ch'
                },
                title: {
                    enabled:true,
                    text: "Material as % of total",
                    align:"center",
                    style: {
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize:"1rem",
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series:[{
                    name: 'Materials',
                    data:this.props.data
                }]
            }
        }
    }
    componentDidMount() {
        this._isMounted=true
    }
    componentWillUnmount(){
        this._isMounted=false
    }
    render() {
        return (
            <div id={this.props.id}>
                <HighchartsReact
                    key={`pieChart${Math.floor(Math.random() * 100)}`}
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            </div>
        )
    }
}
export default PieChart;
