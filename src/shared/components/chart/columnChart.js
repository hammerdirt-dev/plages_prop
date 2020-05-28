import React, { Component } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

class ColumnChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            options:{
                chart: {
                    type: 'column',
                    animation:false,
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
                    text: this.props.title,
                    align:"center",
                    style: {
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize:"1rem",
                    }
                },
                yAxis: {
                    min: 0,
                    max: this.props.yMax ? this.props.yMax:null,
                    title: {
                        text: 'Pieces of trash per 100m'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.name}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} p/100m</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                series:this.props.data
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
                <HighchartsReact
                    key={`barChart${Math.floor(Math.random() * 100)}`}
                    highcharts={Highcharts}
                    options={this.state.options}
                />
        )
    }
}
export default ColumnChart;
