import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import lac_leman_common from '../../shared/images/lac_leman_common.png'


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





                    </div>
                    </motion.div>

        )
    }
}

export default Abundance
