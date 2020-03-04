import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import Card from '../../shared/components/card/card'
import Button from '../../shared/components/button/buttons'
import ContentBlock from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'
import Icon from '../../shared/components/icons/icon'
import{ICONS} from '../../shared/components/icons/allIcons'
import { LoremIpsum } from 'react-lorem-ipsum';



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
        const protocolDocs = [
            {
                cardTitle:"A protocol doc",
                cardDescription:"A project short summary that is ten words or less please...",
                callback:this.showEvent,
                buttonclass: "cardButton",
                id:"prortocol-one",
                label:"protocol one",
            },{
                cardTitle:"A protocol2 doc",
                cardDescription:"A project short summary that is ten words or less please...",
                callback:this.showEvent,
                buttonclass: "cardButton",
                id:"prortocol-two",
                label:"protocol two",
            }
        ]
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
            label:"Read field notes2",
            cardTitle:"Recent Field notes",
            cardDescription:"The first ten words of the relevant doc...",
        }]
        const analysisNotes = [{
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"a-field-slug",
            label:"Read Analysis notes",
            cardTitle:"Recent Analysis notes",
            cardDescription:"The first ten words of the relevant doc..."
        },{
            callback:this.showEvent,
            buttonclass: "cardButton",
            id:"a-dev-slug",
            label:"Read Analysis notes2",
            cardTitle:"Recent Analysis notes",
            cardDescription:"The first ten words of the relevant doc...",
        }]
        const sectionProps =
            {
                content:"Protocols",
                className:"section-block"
            };
        const sectionTwoProps =
        {
            content:"Field notes",
            className:"section-block"
        };
        const sectionThreeProps =
        {
            content:"Analysis notes",
            className:"section-block"
        };
        const titleSummary = "This is a very brief summary of the contentst of this section. This is actually the '<ContentBlock />' component with this paragraph as the content prop, and class names from the classNames prop."
        const titleProps =
            {
                title:<div><h4>Project 20-21</h4><p>Objectives, protocols and documents</p></div>,
                titleBlock:"title-block",
                titleSum:<p>{titleSummary}</p>,
                titleSumBlock:"title-sum-block"

            };
        const iconProps = {
            icon:ICONS.books,
            size :30,
            styles:{
                svg:{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                },
                path: {
                  fill: '#000',
                }
            }
        }
        const iconPropsx = {
            icon:ICONS.envelop,
            size :30,
            styles:{
                svg:{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                },
                path: {
                  fill: '#000',
                }
            }
        }

        return(

                <motion.div
                    className="motion-cont"
                    initial="open"
                    exit="closed"
                    variants={slideIn}
                    >
                    <motion.div
                        variants={slideDown}
                        initial={false}
                        animate={this.state.seenotes ? "open":"closed"} className="column-collapse"
                        >
                        <div className="flex-cent ">
                            <Button {...buttonProps} />
                            <p>
                                <Icon {...iconProps} /> This an "Article" in the project component <Icon {...iconPropsx} />
                            </p>
                            <LoremIpsum p={5} />
                            <Icon {...iconPropsx} />
                            <Button {...buttonProps} />
                        </div>
                    </motion.div>
                    <motion.div
                        className="outer-row"
                        animate="open"
                        exit="closed"
                        variants={slideIn}
                        >
                        <div className="column-one" >
                            <TitleBlock {...titleProps} />
                        </div>
                        <div className="column-two pad-one-p">

                            <ContentBlock key={8} {...sectionTwoProps} />
                            {
                                fieldDevNotes && fieldDevNotes.map((note,i) => <Card key={i} {...note} />)
                            }
                            <ContentBlock key={7} {...sectionProps} />

                            {
                                protocolDocs && protocolDocs.map((note,i) => <Card key={i} {...note} />)
                            }
                            <ContentBlock key={9} {...sectionThreeProps} />
                            {
                                analysisNotes && analysisNotes.map((note,i) => <Card key={i} {...note} />)
                            }
                        </div>
                    </motion.div>
                </motion.div>

        )
    }
}

export default Project
