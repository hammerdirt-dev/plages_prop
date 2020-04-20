import React, {Component} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import Abundance from './abundance'
import Timeseries from './timeseries'
import Probability from './probability'
import Card from '../../shared/components/card/card'
import Button from '../../shared/components/button/buttons'
import {ContentBlock} from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'
import ViewerContainer from '../../shared/components/articleViewer/viewerContainer'
import {getFilteredDocs} from '../../shared/utilities/jsHelper/helperMethods'
import {closeArticleButtonProps, AnalysisSections, section_active_style} from '../../shared/globals/variablesToEdit'
import NavBar from '../navigation/navBar'


class Analysis extends Component{
    constructor(props){
        super(props);
        this.state = {
            seenotes:false,
            seesurvey:false,
            articleSearchList:false,
            showMenu:true,
            currentSection:"Abundance",
            showSubMenu:true,
        }
        this.showEvent = this.showEvent.bind(this)
        this.requestedSection = this.requestedSection.bind(this)
        this.analysisSectionsToLoad = this.analysisSectionsToLoad.bind(this)
        this.showSubMenu = this.showSubMenu.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.articleSearchList !== prevProps.articleSearchList){
            this.setState({
                articleSearchList : this.props.articleSearchList
            })
        }
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
    analysisSectionsToLoad(){
        return ({
            Abundance:<Abundance showMe={this.showSubMenu}/>,
            Timeseries:<Timeseries showMe={this.showSubMenu}/>,
            Probability:<Probability showMe={this.showSubMenu}/>,
        })
    }
    render(){
      
        const sectionsToLoad = this.analysisSectionsToLoad()
        const devNotes = getFilteredDocs(this.props.currentArticles, "Dev notes", this.showEvent)
        const titleSummary = "Exploration of the survey data in the context of time and geography. Here we introduce the different methods as they develop over the course of the project. For details see the Dev notes or the repository concerned."
        const titleProps =
            {
                title:<div><h4 className="pad-point3-rem">Analysis</h4><p className="pad-point3-rem font-italics">Data access, analysis and common tools.</p></div>,
                titleBlock:"title-block",
                titleSum:<p className="pad-point3-rem">{titleSummary}</p>,
                titleSumBlock:"title-sum-block"
            }
        const navButtonProps = AnalysisSections.map(obj => (
            {
                buttonclass:"sectionNavButton",
                active: this.state.currentSection === obj.id ? true:false,
                id:obj.id,
                style:section_active_style,
                callback:this.requestedSection,
                label:obj.label
            }
        ))
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
                    <motion.div
                        className="outer-row"
                        animate="open"
                        exit="closed"
                        variants={slideIn}
                        >
                        <div className="column-one" >
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
                              content="Dev notes"
                              className="section-block"
                              />
                              {
                                  devNotes && devNotes.map((note,i) => <Card key={i} {...note} />)
                              }
                        </div>
                    </motion.div>
                </motion.div>
            )
    }
}

export default Analysis
