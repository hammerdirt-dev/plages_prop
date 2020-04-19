import React, {Component} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import GoalsObjectives from './goalsObjectives'
import Locations from './locations'
import Resources from './resources'
import Methods from './methods'
import Card from '../../shared/components/card/card'
import Button from '../../shared/components/button/buttons'
import {ContentBlock} from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'
import ViewerContainer from '../../shared/components/articleViewer/viewerContainer'
import {getFilteredDocs} from '../../shared/utilities/jsHelper/helperMethods'
import {closeArticleButtonProps, ProjectSections, section_active_style} from '../../shared/globals/variablesToEdit'
import NavBar from '../navigation/navBar'



class Project extends Component{
    constructor(props){
        super(props);
        this.state = {
            seenotes:false,
            seesurvey:false,
            showMenu:true,
            currentSection:"GoalsObjectives",
            showSubMenu:true,
        }
        this.showEvent = this.showEvent.bind(this)
        this.requestedSection = this.requestedSection.bind(this)
        this.projectSectionsToLoad = this.projectSectionsToLoad.bind(this)
        this.showSubMenu = this.showSubMenu.bind(this)
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
        const selectedArticle = this.props.currentArticles.filter(obj => obj.slug === e.target.id)
        if (this.state.seenotes){
            window.scrollTo(0,this.state.yOffset)
            this.setState({
                seenotes:!this.state.seenotes
            })
        }else{
            const offset = window.pageYOffset
            this.setState({
                seenotes:!this.state.seenotes,
                yOffset:offset,
                selectedArticle:selectedArticle,
            },window.scrollTo(0,0))
        }
    }
    showSubMenu(e){
        e.preventDefault()
        this.setState({
            showSubSection:!this.state.showSubSection,
        })
    }
    requestedSection(e){
        e.preventDefault()
        this.setState({
            currentSection:e.target.id
        }, this.showSubMenu(e))
        console.log("requesting")
    }
    projectSectionsToLoad(){
        return ({
            GoalsObjectives:<GoalsObjectives showMe={this.showSubMenu}/>,
            Locations:<Locations showMe={this.showSubMenu} indexedData={this.props.indexedData} beaches={this.props.beaches} surveyData={this.props.dailyTotals} users={this.props.users}/>,
            Methods:<Methods showMe={this.showSubMenu} indexedData={this.props.indexedData} codes={this.props.codes}/>,
            Resources:<Resources showMe={this.showSubMenu} />
        })
    }
    render(){
        const sectionsToLoad = this.projectSectionsToLoad()
        const protocols = getFilteredDocs(this.props.currentArticles, "Survey protocols", this.showEvent)
        const proposal = getFilteredDocs(this.props.currentArticles, "Survey proposal", this.showEvent)
        const titleSummary = `Implementation of a standardized survey protocol using an international coding system to quantify the most common trash items found on the
        shores of seven different lakes in Switzerland.`
        const titleProps =
            {
                title:<div><h4 className="pad-point3-rem">Project 20-21</h4><p className=" pad-point3-rem font-italics">Objectives, protocols and documents.</p></div>,
                titleBlock:"title-block",
                titleSum:<p className="pad-point3-rem">{titleSummary}</p>,
                titleSumBlock:"title-sum-block"
            }
        const navButtonProps = ProjectSections.map(obj => (
            {
                buttonclass:"sectionNavButton",
                active: this.state.currentSection === obj.id ? true:false,
                id:obj.id,
                style:section_active_style,
                callback:this.requestedSection,
                label:obj.label
            }
        ) )
        return(

                <motion.div
                    className="motion-cont"
                    initial="open"
                    exit="closed"
                    variants={slideIn}
                    >

                    <motion.div
                        className="outer-row"
                        animate="open"
                        exit="closed"
                        variants={slideIn}
                        >
                        <div className="column-one" >
                            <motion.div
                                variants={slideDown}
                                initial={false}
                                animate={this.state.seenotes ? "open":"closed"} className="column-collapse"
                                >
                                {
                                    this.state.selectedArticle ?
                                        (
                                            <div className="article-wrapper">
                                                <Button {...closeArticleButtonProps(this.showEvent)} />
                                                <ViewerContainer name="project-doc" content={this.state.selectedArticle[0].article} />
                                                <Button {...closeArticleButtonProps(this.showEvent)} />
                                            </div>
                                        ):<div>No dice</div>
                                }
                            </motion.div>
                            <TitleBlock {...titleProps} />
                            <div className="section-header-wrapper">
                                <NavBar navButtonProps={navButtonProps} />
                            </div>
                            <AnimatePresence initial="true" >
                                {
                                    sectionsToLoad[this.state.currentSection]
                                }
                            </AnimatePresence>
                        </div>
                        <div className="column-two pad-one-p">
                            <ContentBlock
                                content="Project protocols"
                                className="section-block"
                                />
                                {
                                    protocols && protocols.map((note,i) => <Card key={i} {...note} />)
                                }
                            <ContentBlock
                                content="Proposal docs"
                                className="section-block"
                                />
                                {
                                    proposal && proposal.map((note,i) => <Card key={i} {...note} />)
                                }
                        </div>
                    </motion.div>
                </motion.div>
        )
    }
}

export default Project
