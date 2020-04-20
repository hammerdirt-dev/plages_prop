import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import leman_boxplots_2017_2018 from '../../shared/images/leman_boxplots_2017_2018.png'


class Probability extends Component{
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
                <div className="block-row pad-point3-rem">
                    <div className="inline-block-50-left pad-one-rem">
                        <h6>Determining what we are likely to find.</h6>
                        <p >
                          This section is concerned with understanding how the quantities of objects are distributed. Specifically
                          along the shoreline over a standard unit of one meter. By putting all the results into a single unit and
                          normalizing the data to one meter we can compare results from one location or region to another. Even if the
                          total quantities are signifigantly different.
                        </p>
                        <ol className="list-block">
                          <li>What is the amount we are likely to find? By region? By location?</li>
                          <li>What are the environmental factors that cause increases or decreases of survey results?</li>
                          <li>What are the relevant geographic factors?</li>
                        </ol>
                        <p >
                          In this section we will introduce the topics and provide sample output.
                          </p>
                    </div>
                    <div className="inline-block-50-left pad-one-rem">
                        <h6 className="border-bottom">Data access, analysis and methods.</h6>
                        <p >
                          The data and analysis methods are available in the repository on Github dedicated to
                          "probability":
                          <a href="https://github.com/hammerdirt-analyst/probability-2021" rel="noopener noreferrer" target="_blank"> Probability repository</a>.
                        </p>
                        <p >
                          Divided in three sections each repository holds the charts, the data used to generate those charts and the utility functions in python to
                          sort and group the data appropriately.
                        </p>
                        <p >
                          All charts used in this section are available to download through the repository. If you would like to contribute contact analyst@hammerdirt.ch
                        </p>
                    </div>
                </div>
                <div className="block-row pad-point3-rem">
                    <div className="inline-block-50-left pad-one-rem">
                      <h6 className="border-bottom">Distribution of results from previous projects</h6>
                      <p >
                        Many of the survey locations in this project have data from previous projects. Aggregating the previous data allows us to compare results from the current project to the previous
                        results.
                      </p>
                      <p >
                       The app gives you the cumulative results of all surveys. Here we set the date range to the dates of the Swiss Litter Report: April 2017 - May 2018.

                      </p>
                      <p>
                        Charts are free to use, there is one chart for each lake in the current project. The title is <span className="font-italics">lake-name</span>-boxplots-2017-2018. The charts can
                        be found in the repository folder <span className="font-italics">charts</span>, located <a href="https://github.com/hammerdirt-analyst/probability-2021/tree/master/charts" rel="noopener noreferrer" target="_blank">here</a>.

                      </p>

                  </div>
                  <div className="inline-block-50-left pad-one-rem">
                      <img src={leman_boxplots_2017_2018} alt="Box plot of the survey results Lake Geneva" />

                  </div>

                </div>





                </div>
                    </motion.div>

        )
    }
}

export default Probability
