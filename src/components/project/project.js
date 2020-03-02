import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import Card from '../../shared/components/card/card'
import ContentBlock from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'



class Project extends Component{
    constructor(props){
        super(props);
        this.state = {
            seenotes:false,
            seesurvey:false,
        }
        this.showEvent = this.showEvent.bind(this)
    };
    showEvent(e){
        e.preventDefault()
        console.log("clicked showEvent")
        this.setState({
            seenotes:!this.state.seenotes
        })
    }
    render(){
        const buttonProps = {
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"A button id",
            label:"Read Me!",

        };
        const cardProps = {
            cardTitle:"A project card title",
            cardDescription:"A project short summary that is ten words or less please..."
        }
        const sectionProps =
            {
                content:"Protocols",
                className:"rubik pad-one-p bkgrnd-dark-grey text-white"
            };
        const sectionTwoProps =
        {
            content:"Field notes",
            className:"rubik pad-one-p bkgrnd-dark-grey text-white"
        };
        const sectionThreeProps =
        {
            content:"Analysis notes",
            className:"rubik pad-one-p bkgrnd-dark-grey text-white"
        };
        const titleSummary = "This is a very brief summary of the project, it could be a picture of another component. This is actually the '<ContentBlock />' component with this paragraph as the content prop, and class names from the classNames prop."
        const titleProps =
            {
                title:<div><h4>Beached litter 20-21</h4><p>A survey of Swiss rivers and lakes</p></div>,
                titleBlock:"title-block",
                titleSum:<p>{titleSummary}</p>,
                titleSumBlock:"title-sum-block"

            };
        return(
            <AnimatePresence initial={true}>
                <motion.div className="motion-cont" style={{border:"thin solid black"}} animate="open" exit="closed" variants={slideIn}>
                    <div className="outer-row">
                        <div className="column-one" style={{backgroundColor:"blue"}} >
                            <motion.div variants={slideDown} initial={false} animate={this.state.seenotes ? "open":"closed"} className="column-collapse">
                                <div className="flex-cent">
                                    <p>
                                        This an "Article" in the project component
                                    </p>
                                </div>
                            </motion.div>
                            <motion.div variants={slideDown} initial={false} animate={this.state.seesurvey ? "open":"closed"} className="column-collapse">
                                <div className="flex-cent">
                                    <p>
                                        This is a survey in the project component
                                    </p>
                                </div>
                            </motion.div>
                            <div className="flex-cent" >
                                <TitleBlock {...titleProps} />
                                <p>
                                    The project component is not centered
                                </p>
                            </div>
                        </div>
                        <div className="column-two pad-one-p">
                            <ContentBlock key={7} {...sectionProps} />
                            <Card key={1} {...buttonProps} {...cardProps}/>
                            <Card key={2} {...buttonProps} {...cardProps}/>
                            <ContentBlock key={8} {...sectionTwoProps} />
                            <Card key={3} {...buttonProps} {...cardProps}/>
                            <Card key={4} {...buttonProps} {...cardProps}/>
                            <ContentBlock key={9} {...sectionThreeProps} />
                            <Card key={5} {...buttonProps} {...cardProps}/>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

        )
    }
}

export default Project
