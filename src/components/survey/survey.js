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
            seeModal:!this.state.seeModal
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


        return(

                <motion.div
                    className="motion-cont"
                    display="block"
                    initial="open" exit="closed"
                    variants={slideIn}
                    >
                    <EmptyModal
                        showMe={this.state.seeModal}
                        component={<BeachDate logData={this.logData}
                                seeModal={this.seeModal}
                                />}



                    />
                    <AnimatePresence initial={true}>
                        <motion.div
                            className="outer-row"
                            initial="open"  exit="closed"
                            variants={slideIn}
                            >
                            <div className="column-full-width" >
                                <div className="title-block-row">
                                    <div className="title-block">

                                        <h6>Select a beach</h6>
                                        <Button
                                            buttonclass="navButton"
                                            id="fake-button"
                                            callback={this.seeModal}
                                             />

                                    </div>
                                    <div className="title-block">
                                        <h6>People and time</h6>
                                        <LoremIpsum p={1} />
                                    </div>
                                </div>
                                <div className="title-block-row">
                                    <div className="title-block">
                                        <h6>Weights and measures</h6>
                                        <LoremIpsum p={1} />
                                    </div>
                                    <div className="title-block">
                                        <h6>Blank</h6>
                                        <LoremIpsum p={1} />
                                    </div>
                                </div>
                                <div className="title-block-row">
                                    <div className="title-block">
                                        <h6>Search objects</h6>
                                        <LoremIpsum p={1} />
                                    </div>
                                    <div className="title-block">
                                        <h6>Add codes</h6>
                                        <LoremIpsum p={1} />
                                    </div>
                                </div>
                                <div className="title-block-row">
                                    <h6>Survey items</h6>
                                    <LoremIpsum p={1} />
                                    <LoremIpsum p={1} />
                                </div>
                                <div className="title-block-row">
                                    <div className="title-block">
                                        <h6>Post to server</h6>
                                        <LoremIpsum p={1} />
                                    </div>
                                    <div className="title-block">
                                        <h6>Post to local</h6>
                                        <LoremIpsum p={1} />
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
