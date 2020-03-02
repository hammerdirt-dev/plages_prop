import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/main.css'
import Card from '../../shared/components/card/card'
import ContentBlock from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'
import CalendarBlock from '../../shared/components/blocks/calendarBlock'
import { Frame, Scroll } from "framer"



class Home extends Component{
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
        const calendarProps = {
            title:"Our activities",
            content:"Visit us in the field, contact info@hammerdirt.ch to accompany us on a survey.",
            summary: <strong>Office hours: monday-saturday, 8am-12.</strong>,
            calendarProps:this.props.events
        }

        const buttonProps = {
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"A button id",
            label:"Read Me!",
        };
        const cardProps = {
            cardTitle:"A card title",
            cardDescription:"A short summary that is ten words or less please..."
        };
        const blockProps = [{
            content:<p>The 'Home' component is centered</p>,
            className:"block-wrapper-50"
            },{
                content:<p>This is another block</p>,
                className:"block-wrapper-50"
            },{
                content:<p>This is a third block</p>,
                className:"block-wrapper-75"
            }
        ];
        const sectionProps =
            {
                content:"Field and Dev notes",
                className:"rubik pad-one-p bkgrnd-dark-grey text-white"
            };
        const sectionTwoProps =
            {
                content:"Recent surveys",
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
        console.log(this.props)


        return(
            <AnimatePresence initial={true}>
                <motion.div className="motion-cont" style={{border:"thin solid black"}} animate="open" exit="closed" variants={slideIn}>
                    <div className="outer-row">
                        <div className="column-one" style={{backgroundColor:"#fff"}}>
                            <motion.div variants={slideDown} initial={false} animate={this.state.seenotes ? "open":"closed"} className="column-collapse">
                                <div className="flex-cent" >
                                    <p>
                                        This is a survey in the home component
                                    </p>
                                </div>
                            </motion.div>
                            <div className="flex-cent" >
                                <TitleBlock {...titleProps} />
                                <CalendarBlock {...calendarProps} />



                                {
                                    blockProps.map((obj, i) => <ContentBlock key={i} {...obj} />)
                                }
                            </div>
                        </div>
                        <div className="column-two pad-one-p">
                            <ContentBlock key={7} {...sectionProps} />
                            <Card key={1} {...buttonProps} {...cardProps}/>
                            <Card key={2} {...buttonProps} {...cardProps}/>
                            <ContentBlock key={8} {...sectionTwoProps} />
                            <Card key={3} {...buttonProps} {...cardProps}/>
                            <Card key={4} {...buttonProps} {...cardProps}/>
                            <Card key={5} {...buttonProps} {...cardProps}/>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    }
}

export default Home
