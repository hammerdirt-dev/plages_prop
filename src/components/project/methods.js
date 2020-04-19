import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import trash_to_data from '../../shared/images/trash_to_data.svg'
import {ThisAccordion} from '../accordion/Accordion'

class Methods extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
        this.groupCodes = this.groupCodes.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        this.setState({
            sourceGroups:this.groupCodes(this.props.codes, 'source'),
            materialGroups:this.groupCodes(this.props.codes, 'material')
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){

    }
    showEvent(e){
        e.preventDefault()
    }
    groupCodes(data, cat){
        let categories = {}
        let what_i_want = []
        data.forEach(obj => {
            if(categories[obj[cat]]){
              categories[obj[cat]].push(obj)
            }else{
              categories[obj[cat]]=[obj]
            }
        })
        let cats = Object.keys(categories)
        cats.forEach(key =>{
            what_i_want.push({name:key, data:categories[key]})
        })
        return what_i_want
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
                            <h6>The basic unit of measurement</h6>
                            <p className="pad-point3-rem">
                                The base unit is 1 piece of trash. Surveyors gather the trash and then group
                                the objects according to the MSFD master list of litter-codes(see the "Collection protocols").
                            </p>
                            <p className="pad-point3-rem">
                                The "code" is used to reference the objects in the database. When the surveyor categorizes the objects,
                                they are also adding location, distance and time data. This gives us multiple variables from the same
                                object that we can use to sort or group results.
                            </p>
                            <p className="pad-point3-rem">
                                Figure one illustrates what happens when a surveyor records their findings in the application.
                            </p>
                        </div>
                        <div className="inline-block-50-left">
                            <h6>What is a code?</h6>
                            <div>
                                <span className="text-blue font-one-rem marg-left-half-rem">Figure 1: The base unit of data: turning trash into data.</span>
                            </div>
                            <img className="w-100-p" src={trash_to_data} alt="How a piece of trash is represented in the database"/>
                        </div>
                    </div>
                    <div className="block-row">
                        <div className="inline-block-50-left">
                            <h6>Tabulating results</h6>
                            <p>
                                Suppose a surveyor completes a survey at Vidy on the 2020-01-01 and finds one plastic bottle
                                on 20 meters of shoreline. They would then enter that data into the database as shown in figure 1.
                            </p>
                            <p>
                                If they found 2 bottles, then they would change the quantity to 2. The surveyor repeats this for
                                each code that they have identified durring the survey.
                            </p>
                            <p>
                                We also note the surface area of the survey, weight of all plastic objects less than 5mm, the weight of all other plastic objects
                                and the total weight.
                            </p>
                            <p>
                                There are over 200 codes that group the items that we encounter. One way to sort the objects is by material type. For example, in figure 2, the codes are sorted by
                                material type.
                            </p>
                            <p>
                                Click or tap the category name to see the component objects.
                            </p>
                        </div>
                        <div className="inline-block-50-left">
                        <div>
                            <span className="text-blue font-one-rem">Figure 2: codes sorted by material type.</span>
                        </div>
                        {
                          this.state.materialGroups ? <ThisAccordion data={this.state.materialGroups} />: null
                        }
                        </div>
                    </div>
                    <div className="block-row">
                        <div className="inline-block-50-left">
                            <h6>Sources</h6>
                            <p>
                                Each code also has a source property. This propperty comes from the MSFD master list.
                                The source property of a code reflects the use case of the object in general. In figure 3
                                the codes are grouped by use.
                            </p>
                            <p>
                                Depending on the need we can add properties to the code that would permit a more detailed identification of
                                the object or 'connect' the object to other data sources.
                            </p>
                            <p>
                                For this project we will assign other properties to the code. These added properties can be statistically derived
                                or they could be categories of economic or geographic signifigance.
                            </p>
                            <h6>Location</h6>
                            <p>
                                The location property holds all the relevant geo information for the survey location. This includes city,
                                postal-code, longitude, latitude and name of river or lake.
                            </p>
                            <h6>Stay in touch</h6>
                            <p>
                                As the project advances the content will grow. Check back to get the latest.
                            </p>
                            <p>
                                Questions? contact roger or shannon @hammerdirt.ch
                            </p>

                        </div>
                        <div className="inline-block-50-left">
                            <div>
                                <span className="text-blue font-one-rem">Figure 3: codes sorted by use or source.</span>
                            </div>
                            {
                              this.state.sourceGroups ? <ThisAccordion data={this.state.sourceGroups} />: null
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
        )
    }
}

export default Methods
