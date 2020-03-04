import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import Card from '../../shared/components/card/card'
import ContentBlock from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'
import CalendarBlock from '../../shared/components/blocks/calendarBlock'
import Button from '../../shared/components/button/buttons'
import { LoremIpsum} from 'react-lorem-ipsum';



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
        if (this.state.seenotes){
            console.log('closing')
            console.log(this.state.yOffset)
            window.scrollTo(0,this.state.yOffset)
            this.setState({
                seenotes:!this.state.seenotes
            })
        }else{
            console.log("opening")
            const offset = window.pageYOffset
            this.setState({
                seenotes:!this.state.seenotes,
                yOffset:offset
            },window.scrollTo(0,0))
        }
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
        const sectionProps =
            {
                content:"Field and Dev notes",
                className:"section-block"
            };
        const sectionTwoProps =
            {
                content:"Recent surveys",
                className:"section-block"
            };
        const titleSummary = "This is a very brief summary of the project, it could be a picture of another component. This is actually the '<ContentBlock />' component with this paragraph as the content prop, and class names from the classNames prop."
        const titleProps =
            {
                title:<div><h4>Beached litter 20-21</h4><p>A survey of Swiss rivers and lakes</p></div>,
                titleBlock:"title-block",
                titleSum:<p>{titleSummary}</p>,
                titleSumBlock:"title-sum-block"
            };
        const fieldDevNotes = [{
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"a-field-slug",
            label:"Read field notes",
            cardTitle:"Recent field notes",
            cardDescription:"The first ten words of the relevant doc..."
        },{
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"a-dev-slug",
            label:"Read dev notes",
            cardTitle:"Recent dev notes",
            cardDescription:"The first ten words of the relevant doc...",
        }]
        const surveyResults = [{
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"a-location-slug",
            label:"See survey results",
            cardTitle:"A query date",
            cardDescription:"A location and a date"
        },{
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"a-location-slug-one",
            label:"See survey results",
            cardTitle:"A query date",
            cardDescription:"A location and a date"
        }]
        return(

                <motion.div
                    className="motion-cont"
                    display="block"
                    initial="open" exit="closed"
                    variants={slideIn}
                    >
                    <motion.div
                        variants={slideDown}
                        initial={false}
                        animate={this.state.seenotes ? "open":"closed"}
                        className="column-collapse"
                        >
                        <div className="flex-cent pad-one-p" >
                            <Button {...buttonProps} />
                            <LoremIpsum p={3} />
                            <LoremIpsum p={3} />
                            <Button {...buttonProps} />
                        </div>
                    </motion.div>
                    <AnimatePresence initial={true}>
                        <motion.div
                            className="outer-row"
                            initial="open"  exit="closed"
                            variants={slideIn}
                            >
                            <div className="column-one" >
                                <TitleBlock {...titleProps} />
                                <CalendarBlock {...calendarProps} />
                                <LoremIpsum p={1} />
                            </div>
                            <div className="column-two pad-one-p">
                                <ContentBlock key={7} {...sectionProps} />
                                {
                                    fieldDevNotes && fieldDevNotes.map((note,i) => <Card key={i} {...note} />)
                                }
                                <ContentBlock key={8} {...sectionTwoProps} />
                                {
                                    surveyResults && surveyResults.map((note,i) => <Card key={i} {...note} />)
                                }
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

        )
    }
}

export default Home
