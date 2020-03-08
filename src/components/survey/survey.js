import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import Card from '../../shared/components/card/card'
import {ContentBlock} from '../../shared/components/blocks/contentBlock'
import Button from '../../shared/components/button/buttons'
import BeachDate from './formComponents/beachDate'
import SelectCodes from './formComponents/selectCodes'
import EmptyModal from '../../shared/components/modal/emptyModal'
import { LoremIpsum} from 'react-lorem-ipsum';



class Survey extends Component{
    constructor(props){
        super(props);
        this.state = {
            seeModal:false,
            action:null,
            actionLabel:null,
        }
        this.seeModal = this.seeModal.bind(this)
        this.logData = this.logData.bind(this)

    };
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    seeModal(e){
        e.preventDefault()
        this.setState({
            seeModal:!this.state.seeModal,
            selectedComponent:e.target.value
        })
    }
    selectDate(e){
        e.preventDefault()
        this.setState({
            date:e.target.value
        })
    }
    logData(e){
        e.preventDefault()
        console.log(e.target)
        this.setState({
            [e.target.id]:e.target.value
        })
    }


    render(){
        // modalControlProps={{callback:this.seeModal, buttonclass:"navButton", label:"Close"}}
        // modalCallBackProps={{callback:this.logSelection, buttonclass:"navButton", label:this.state.actionLabel}}
        // showMe={this.state.seeModal}
        // modalTitleProps={{className:"section-block rubik no-wrap", content:<h6 className="text-white pad-one-rem">{titleProps(fakeObject)}</h6>}}
        // modalContentProps={{className:"inputDiv pad-one-rem", content:contentProps(fakeObject)}}
        const availableComponents = {
            BeachDate:<BeachDate logData={this.logData} seeModal={this.seeModal}/>,
            SelectCodes:<SelectCodes logData={this.logData} seeModal={this.seeModal}/>
        }

        return(
            <motion.div
                className="motion-cont"
                display="block"
                initial="open" exit="closed"
                variants={slideIn}
                >
                    <EmptyModal
                        showMe={this.state.seeModal}
                        component={availableComponents[this.state.selectedComponent]}

                    />
                    <AnimatePresence initial={true}>
                        <motion.div
                            className="outer-row"
                            initial="open"  exit="closed"
                            variants={slideIn}
                            >
                            <div className="column-full-width" >
                                <div className="title-block-row">
                                    <div className="inner-column">
                                        <div className="inner-column-div">
                                            <div className="form-section-header">
                                                <h6 className="text-white text-center">Location and date </h6>
                                            </div>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Select a beach: </h6>
                                                <Button
                                                    buttonclass="navButton"
                                                    id="selectComponent"
                                                    value="BeachDate"
                                                    callback={this.seeModal}
                                                    label="Find a beach"
                                                     />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Selected location:</h6>
                                                <p>
                                                    {
                                                        this.state.selectedBeach ? (this.state.selectedBeach):("No beach selected")
                                                    }
                                                </p>
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Select a date:</h6>
                                                <input
                                                    className=""
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={this.state.date}
                                                    onChange={this.logData}
                                                />
                                             </label>
                                        </div>
                                    </div>
                                    <div className="inner-column">
                                        <div className="inner-column-div">
                                            <div className="form-section-header">
                                                <h6 className="text-white text-center">People and time</h6>
                                            </div>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Staff members:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="numberOfStaff"
                                                    name="numberOfStaff"
                                                    value={this.state.numberOfStaff}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Volunteers:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="numberOfVolunteers"
                                                    name="numberOfVolunteers"
                                                    value={this.state.numberOfVolunteers}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Time in minutes:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="timeInMinutes"
                                                    name="timeInMinutes"
                                                    value={this.state.timeInMinutes}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-row">
                                    <div className="inner-column">
                                        <div className="inner-column-div">
                                            <div className="form-section-header">
                                                <h6 className="text-white text-center">Weights and measures</h6>
                                            </div>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Beach length:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="beachLength"
                                                    name="beachLength"
                                                    value={this.state.beachLength}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Beach area:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="beachArea"
                                                    name="beachArea"
                                                    value={this.state.beachArea}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Weight micro-plas:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="microWeight"
                                                    name="microWeight"
                                                    value={this.state.microWeight}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Weight macro-plas:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="macroWeight"
                                                    name="macroWeight"
                                                    value={this.state.macroWeight}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Weight estimated:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="estimatedWeight"
                                                    name="estimatedWeight"
                                                    value={this.state.estimatedWeight}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Total weight:</h6>
                                                <input
                                                    className=""
                                                    type="number"
                                                    id="totalWeight"
                                                    name="totalWeight"
                                                    value={this.state.totalWeight}
                                                    onChange={this.logData}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="inner-column">
                                        <div className="inner-column-div">
                                            <div className="form-section-header">
                                                <h6 className="text-white text-center">Add objects to survey</h6>
                                            </div>
                                            <label className="display-block label-position label-format">
                                                <h6 className="">Select codes: </h6>
                                                <Button
                                                    buttonclass="navButton"
                                                    id="selectComponent"
                                                    value="SelectCodes"
                                                    callback={this.seeModal}
                                                    label="Select a code"
                                                     />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="title-block-row">
                                    <div className="inner-column">
                                        <div className="inner-column-div">

                                        </div>
                                    </div>
                                    <div className="inner-column">
                                    <div className="inner-column-div">
                                        <h6>Add codes</h6>
                                        <LoremIpsum p={1} />
                                    </div>
                                    </div>
                                </div>*/}
                                <div className="inner-column-row">
                                    <div className="inner-column-div">
                                        <h6>Survey items</h6>
                                        <LoremIpsum p={1} />
                                        <LoremIpsum p={1} />
                                    </div>
                                </div>
                                <div className="block-row">
                                    <div className="inner-column">
                                        <div className="inner-column-div">
                                            <label className="display-block label-position label-format">
                                                <h6>Post to server</h6>
                                                <LoremIpsum p={1} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="inner-column">
                                        <div className="inner-column-div">
                                            <label className="display-block label-position label-format">
                                                <h6>Post to local</h6>
                                                <LoremIpsum p={1} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

        )
    }
}

export default Survey
