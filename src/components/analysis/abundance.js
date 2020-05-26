import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import lac_leman_common from '../../shared/images/lac_leman_common.png'
import quantityTime from '../../shared/images/quantityTime.svg'


class Abundance extends Component{
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
                            <h6>Analysis of the quantity of objects indentified</h6>
                            <p >
                              This section is concerned with understanding how the quantities of specific objects are related. Specifically
                              we will provide answers to the following questions.
                            </p>
                            <ol className="list-block">
                              <li>What are the most common objects? By region? By location?</li>
                              <li>Do relative quantities change within a region?</li>
                              <li>What objects are common in all regions?</li>
                            </ol>
                            <p >
                              In this section we will introduce the topics and provide sample output.
                              </p>
                        </div>
                          <div className="inline-block-50-left pad-one-rem">
                            <h6 className="border-bottom">Data access, analysis and methods.</h6>
                            <p >
                              The data and analysis methods are available in the repository on Github dedicated to
                              "Abundance":
                              <a href="https://github.com/hammerdirt-analyst/abundance-2021" rel="noopener noreferrer" target="_blank"> Abundance repository</a>.
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
                          <h6 className="border-bottom">Most common objects from previous projects</h6>
                          <p >
                            Many of the survey locations in this project have data from previous projects. Aggregating the previous data allows us to compare results from the current project to the previous
                            results.
                          </p>
                          <p >
                           The app gives you the cumulative results of all surveys. Here we set the limit to December 31, 2019.
                          </p>
                          <p>
                            Charts are free to use, there is one chart for each lake in the current project. The title is <span className="font-italics">lake-name</span>-common-2015-2019. The charts can
                            be found in the repository folder <span className="font-italics">charts</span>, located <a href="https://github.com/hammerdirt-analyst/abundance-2021/tree/master/charts" rel="noopener noreferrer" target="_blank">here</a>.
                          </p>
                        </div>
                        <div className="inline-block-50-left pad-one-rem">
                          <img src={lac_leman_common} alt="Stacked bar chart of the most common items on lake geneva" />
                        </div>
                    </div>
                    <div className="block-w-100 pad-one-rem marg-top-bot-point-five">
                        <h6 className="border-bottom marg-one-rem">Survey metrics</h6>
                        <img src={quantityTime} alt="Stacked bar chart of the most common items on lake geneva" />
                    </div>
                    <div className="block-row pad-point3-rem">
                        <div className="inline-block-50-left pad-one-rem">
                          <p>
                            The survey results give us lots of detailed information. The challenge is to use these results to find
                            similarities between locations. One way to do that is to look at the variety of the objects found in relation to
                            the number of objects found or the length of the shoreline.
                          </p>
                          <p >
                           In this repo we start the process of looking at the survey metrics from the current results of this project. Why do some locations
                           have a consistenly high number of objects, increased variety and greater than average pieces per meter? Looking at the image, patterns
                           are already starting to emerge.
                          </p>
                        </div>
                        <div className="inline-block-50-left pad-one-rem">
                          <p>
                            The charts in this repo are scatter charts of all the locations using different properties on the x or y axis. The title is <span className="font-italics">xaxisname-yaxisname</span>-daterange. The charts can
                            be found in the repository folder <span className="font-italics">summary_dims or summary_scatter</span>, located <a href="https://github.com/hammerdirt-analyst/survey_qc/tree/master/charts" rel="noopener noreferrer" target="_blank">here</a>.
                          </p>
                        </div>
                    </div>
                  </div>
                </motion.div>

        )
    }
}

export default Abundance
