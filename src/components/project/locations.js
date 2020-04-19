import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import SurveyMap from '../results/mapTall'
import {mapBounds, MAP_API_KEY} from '../results/mapUtilities/mapUtilities'

class Locations extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
        this.are2021Beaches = this.are2021Beaches.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        if(this.props.indexedData){
          let geoData = this.are2021Beaches()
          let beachList = [{beaches:geoData.map(obj => obj.slug)}]
          this.setState({
            mapMarkers:mapBounds(geoData,beachList, this.props.surveyData, this.props.users)
          })

        }

    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){

    }
    showEvent(e){
        e.preventDefault()
    }
    // mapBounds(geoData, listOfBeaches, surveyData, users)
    are2021Beaches(){
      const projectBeach = this.props.beaches.filter(obj => obj.is_2020)
      return projectBeach
    }

    render(){
      console.log(this.state)

        return(
            <motion.div
                className="outer-row"
                initial="closed"
                animate="open"
                exit="closed"
                variants={slideIn}
                >

                    <div className="column-full-width background-white">
                        <div className="block-row">
                          <div className="inline-block-50-left">
                              <h6>Survey sites</h6>
                              <p className="pad-point3-rem">
                                  The location of designated project survey sites. Some locations have data from prior projects, others have been newly designated.
                              </p>
                              <p className="pad-point3-rem">
                                  As sites are added they will appear here, this includes surveys of random locations within the designated river basins.
                              </p>
                          </div>
                          <div className="inline-block-50-center">
                              <p className="pad-point3-rem">
                                  <span className="rubik text-bold"> Would you like to suggest a survey site? contact shannon or roger @hammerdirt.ch</span>
                              </p>
                          </div>
                        </div>

                            <div className="block-row-map">
                            {
                                this.state.mapMarkers ? (
                                    <SurveyMap
                                        key={Math.floor(Math.random() * 100)}

                                        api_key={MAP_API_KEY}
                                        bounds={this.state.mapMarkers.bounds}
                                        markers={this.state.mapMarkers.markers}

                                        />
                                ):null
                            }

                            </div>



                    </div>
                    </motion.div>

        )
    }
}

export default Locations
