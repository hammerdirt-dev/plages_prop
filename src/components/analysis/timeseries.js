import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import lac_leman_timeseries_2015_2019 from '../../shared/images/lac_leman_timeseries_2015_2019.png'

class Timeseries extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){

    }
    showEvent(e){
        e.preventDefault()
    }

    render(){

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
                        <h6>Identifying trends</h6>
                        <p className="pad-point3-rem">
                          This section is concerned with understanding how the distribution of objects changes over time. We can look at
                          the daily totals of all objects or of a single object. Time can refer to seasonal changes, days of the week or simply
                          the chronological progression of daily totals.
                        </p>
                        <ol className="list-block">
                          <li>Are there seasonal differences? By region? By location?</li>
                          <li>Are there seasonal differences? By object? By source?</li>
                          <li>Are the differences between regions stable from one time period to another?</li>
                        </ol>
                        <p className="pad-point3-rem">
                          In this section we will introduce the topics and provide sample output.
                          </p>
                    </div>
                    <div className="inline-block-50-left">
                        <h6 className="border-bottom">Data access, analysis and methods.</h6>
                        <p className="pad-point3-rem">
                          The data and analysis methods are available in the repository on Github dedicated to
                          "Timeseries":
                          <a href="https://github.com/hammerdirt-analyst/timeseries-2021" rel="noopener noreferrer" target="_blank"> Timeseries repository</a>.
                        </p>
                        <p className="pad-point3-rem">
                          Divided in three sections each repository holds the charts, the data used to generate those charts and the utility functions in python to
                          sort and group the data appropriately.
                        </p>
                        <p className="pad-point3-rem">
                          All charts used in this section are available to download through the repository. If you would like to contribute contact analyst@hammerdirt.ch
                        </p>
                    </div>
                </div>
                <div className="block-row">

                  <div className="inline-block-50-left">
                      <h6 className="border-bottom">Daily totals of survey results from previous projects</h6>
                      <p className="pad-point3-rem">
                        Many of the survey locations in this project have data from previous projects. Aggregating the previous data allows us to compare results from the current project to the previous
                        results.
                      </p>                     

                  </div>
                  <div className="inline-block-50-left">

                      <img src={lac_leman_timeseries_2015_2019} alt="Box plot of the survey results Lake Geneva" />

                  </div>

                </div>





                </div>
                    </motion.div>

        )
    }
}

export default Timeseries
