import React, { Component } from "react";
import Highcharts from 'highcharts';
import treemap from 'highcharts/modules/treemap';
import HighchartsReact from 'highcharts-react-official'
treemap(Highcharts)

class TreeMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            options:{
            chart: {
                type: 'treemap',
                animation:false,
                renderTo:this.props.id,
                backgroundColor:null,
                plotBorderWidth:1,
                spacingBottom:20,
                spacingTop:5,
                style: {
                  fontFamily: 'sans-serif',
                },
            },
            credits: {
                text: 'by hammerdirt',
                href: 'https://www.hammerdirt.ch',
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
            plotOptions:{
                treemap:{
                    animation:false,
                }
            },
            series:[{
                type:'treemap',
                animation:false,
                allowTraversingTree:true,
                layoutAlgorithm:'squarified',
                borderWidth: 1,
                borderDashStyle:'shortDashDot',
                borderColor:"#000",
                dataLabels: {
                    enabled: false
                },
                levelIsConstant: false,
                levels: [{
                    level: 1,
                    dataLabels: {
                        enabled: true,
                        style:{
                            color:'#000'
                        }
                    },
                    borderWidth: 1,
                    borderDashStyle:'shortDashDot',
                    borderColor:"#000",
                }],
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
                    key={`treemap${Math.floor(Math.random() * 100)}`}
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            </div>
        )
    }
}
export default TreeMap;
