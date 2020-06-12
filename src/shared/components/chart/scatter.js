import React, { Component } from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import '../../css/blocks.css'

class ScatterPlot extends Component {
    constructor(props){
        super(props)
        this.state = {
            options:{
                chart: {
//                    type: 'scatter',
                    animation:false,
                    renderTo:this.props.id,
                    backgroundColor:null,
                    plotBorderWidth:0,
                    spacingBottom:20,
                    spacingTop:20,
                    zoomType: 'x',
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
                    text: "Survey totals by date - pcs/m",
                    align:"center",
                    style: {
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize:"1rem",
                    }
                },
                legend: {
                    enabled:false,
                },
                xAxis: {
                    visible:true,
                    type: 'datetime',
                    tickInterval:3600*1000*24*28*2,
                    labels: {
                      style: {
                        color:'#000'
                      }
                    },
                    gridLineColor:'rgba(70,70,70, .6)',
                    gridLineDashStyle:'longdash',
                    gridLineWidth:1,
                    offset:10,
                    dateTimeLabelFormats: {
                      month: '%b - %Y',
                    },
                },
                yAxis: {
                    title: {
                        align: 'low',
                        offset: 45,
                        text: 'Pieces of trash per meter',
                        style:{
                          fontSize: '14px',
                          color:'#464646',
                        },
                    },
                    offset:6,
                    gridLineColor:'rgba(70,70,70, .6)',
                    labels: {
                      style: {
                        color:'#000',
                        fontSize:'14px',
                      }
                    },
                    tickInterval: 4,
                    min: 0,
                },
                plotOptions: {
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                },
                tooltip: {
                    formatter: function() {
                        return  this.series.name + ': <br/>' +
                            Highcharts.dateFormat('%e - %b', new Date(this.x))
                        + ' , ' + this.y + 'pcs/m';
                    }
                },
                series:this.props.data,
            }
        }
    }
    componentDidMount() {
        this._isMounted=true
        console.log("Mounting time series")
    }
    componentWillUnmount(){
        this._isMounted=false
    }
    render() {
        return (
            <div id={this.props.id} className="chart-block">
                <HighchartsReact
                    key={`scatter${Math.floor(Math.random() * 100)}`}
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            </div>

        )
    }
}
export default ScatterPlot;
