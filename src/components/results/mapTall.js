import React, {Component} from 'react'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import {icon, MAP_API_KEY} from './mapUtilities/mapUtilities'



class SurveyMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectLocation:false,
            mapBounds:[]
        }
    }
    componentDidMount(){
        console.log("mounting maps")
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){
    }
    render(){
        return(
            <div className="mapContainer border-all-gray">
                {
                    this.props.markers ? (
                        <Map
                            key={Math.floor(Math.random() * 100)}
                            style={{
                                width:"100%",
                                position:"relative",
                                height:600,
                                // minHeight:"800px",
                                zIndex:"0"
                            }}
                            zoomControl={true}
                            bounds={this.props.bounds}
                            maxZoom={20}
                            boundsOptions={{
                                padding: [50,50]
                            }}
                            >

                            <TileLayer
                              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url={`https://api.mapbox.com/styles/v1/hammerdirt/ckgf23mlm7oyy19nwnqmix0pb/tiles/{z}/{x}/{y}?access_token=${MAP_API_KEY}`}
                              id='mapbox.streets'
                              accessToken={this.props.api_key}
                            />
                            {
                                this.props.markers.map((aBeach,i) =>{
                                    return (
                                        <Marker key={i} position={[aBeach.lat, aBeach.lon]} icon={icon(aBeach.color)}>
                                          <Popup>
                                            Beach name: {aBeach.name} <br/>
                                            City: {aBeach.city}<br/>
                                            Last sample: {aBeach.last}, {aBeach.result} pcs/m<br/>
                                            First sample: {aBeach.first}<br/>
                                            N<sup>o</sup> of samples: {aBeach.number}<br/>
                                            Manager: {aBeach.manager}<br/>
                                            Lat:{aBeach.lat}<br/>
                                            Lon: {aBeach.lon}
                                          </Popup>
                                        </Marker>
                                    )
                                })
                            }
                        </Map>
                    ):<h6>Setting the map...</h6>
            }
            </div>
        )
    }
}

export default SurveyMap
