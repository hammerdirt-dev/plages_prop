import React, {Component} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import CommonObjects from './commonObjects'
import RegionalData from './regionalData'
import AnalyzeCompare from './analyzeCompare'
import Card from '../../shared/components/card/card'
import Button from '../../shared/components/button/buttons'
import {ContentBlock} from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'
import ViewerContainer from '../../shared/components/articleViewer/viewerContainer'
import {getFilteredDocs} from '../../shared/utilities/jsHelper/helperMethods'
import {closeArticleButtonProps, ResultSections, section_active_style} from '../../shared/globals/variablesToEdit'
import NavBar from '../navigation/navBar'
import {
    indexGetAllFromStore,
    indexGetOneFromStore
} from '../../shared/utilities/indexeddb/indexeddb'
import {
    name,
    version
} from '../../shared/globals/variablesToEdit'
import {
    codeLookUp,
    getKeys,
} from '../../shared/utilities/jsHelper/stats'


class Results extends Component{
    constructor(props){
        super(props);
        this.state = {
            seenotes:false,
            articleSearchList:false,
            currentSection:"RegionalData",
            showSubMenu:true,
            codes:false

        }
        this.showEvent = this.showEvent.bind(this)
        this.requestedSection = this.requestedSection.bind(this)
        this.resultSectionsToLoad = this.resultSectionsToLoad.bind(this)
        this.showSubMenu = this.showSubMenu.bind(this)
        this.dataBaseCallBack = this.dataBaseCallBack.bind(this)
        this.txState = this.txState.bind(this)
        this.getOneFromStore = this.getOneFromStore.bind(this)
        this.getAllFromStore = this.getAllFromStore.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount(){
        this._isMounted = true

        this.setState({
            codeKeys:codeLookUp(this.props.codes),
            sourceKeys:getKeys(this.props.codes, 'source'),
            materialKeys:getKeys(this.props.codes, 'material'),


        })
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
            window.scrollTo({left:0,top:this.state.yOffset, behavior:'smooth'})
            this.setState({
                seenotes:!this.state.seenotes
            })
        }else{
            const offset = window.pageYOffset
            this.setState({
                seenotes:!this.state.seenotes,
                yOffset:offset,
                selectedArticle:selectedArticle,
            },window.scrollTo({top:0,left:0, behavior:'smooth'}))
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
    }
    handleChange(e){
        e.preventDefault()
        this.setState({
            [e.target.name]:e.target.id
        })
    }
    resultSectionsToLoad(){
        return ({
            RegionalData:<RegionalData
                            showMe={this.showSubMenu}
                            indexedData={this.props.indexedData}
                            users={this.props.users}
                            cities={this.props.beachCategories.filter(obj => obj.category === 'cities')[0].results}
                            lakes={this.props.beachCategories.filter(obj => obj.category === 'lakes')[0].results}
                            rivers={this.props.beachCategories.filter(obj => obj.category === 'rivers')[0].results}
                            handleChange={this.handleChange}
                            beaches={this.props.beaches}
                            dailyTotals={this.props.dailyTotals}
                            surveyDetails={this.props.surveyDetails}
                            codes={this.props.codes}
                            waterBodyCodeTotals={this.props.waterBodyCodeTotals}
                            cityCodeTotals={this.props.cityCodeTotals}
                            beachesByCategory={this.props.beachesByCategory}
                            codeKeys={this.state.codeKeys}
                            sourceKeys={this.state.sourceKeys}
                            materialKeys={this.state.materialKeys}

                            />,
            AnalyzeCompare:<AnalyzeCompare
                            showMe={this.showSubMenu}
                            indexedData={this.props.indexedData}
                            lakes={this.props.beachCategories.filter(obj => obj.category === 'lakes')[0].results}
                            rivers={this.props.beachCategories.filter(obj => obj.category === 'rivers')[0].results}
                            handleChange={this.handleChange}
                            surveyDetails={this.props.surveyDetails}
                            codes={this.props.codes}
                            waterBodyCodeTotals={this.props.waterBodyCodeTotals}
                            beachesByCategory={this.props.beachesByCategory}
                            codeKeys={this.state.codeKeys}
                            sourceKeys={this.state.sourceKeys}
                            materialKeys={this.state.materialKeys}
                            />,
            CommonObjects:<CommonObjects
                            showMe={this.showSubMenu}
                            indexedData={this.props.indexedData}
                            lakes={this.props.beachCategories.filter(obj => obj.category === 'lakes')[0].results}
                            rivers={this.props.beachCategories.filter(obj => obj.category === 'rivers')[0].results}
                            handleChange={this.handleChange}
                            surveyDetails={this.props.surveyDetails}
                            codes={this.props.codes}
                            waterBodyCodeTotals={this.props.waterBodyCodeTotals}
                            beachesByCategory={this.props.beachesByCategory}
                            codeKeys={this.state.codeKeys}
                            sourceKeys={this.state.sourceKeys}
                            materialKeys={this.state.materialKeys}
                            />

        })
    }
    getOneFromStore(store, key){
        indexGetOneFromStore(store,key, name,version,this.txState, this.dataBaseCallBack)
    }
    getAllFromStore(store){
        indexGetAllFromStore(store, name,version,this.txState, this.dataBaseCallBack)
    }
    dataBaseCallBack(obj){
        this.setState({
            [obj.name]:obj.result
        })
    }
    txState(obj){
        this.setState({
            [obj.store]:obj.status
        })
    }
    render(){
      const sectionsToLoad = this.resultSectionsToLoad()
      const fieldNotes = getFilteredDocs(this.props.currentArticles, "Field notes", this.showEvent)
      const titleSummary = `Explore the survey results. The survey data for every Lake, river, city or
      location can be consulted. The data for lakes and rivers is also grouped by use categroy and the six most common objects identified.`
      const titleProps =
          {
              title:<div ><h4 className="pad-point3-rem">Results</h4><p className="pad-point3-rem font-italics">Data from the current and past projects.</p></div>,
              titleBlock:"title-block",
              titleSum:<p className="pad-point3-rem">{titleSummary}</p>,
              titleSumBlock:"title-sum-block"
          }
      const navButtonProps = ResultSections.map(obj => (
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
                          content="Field notes"
                          className="section-block"
                          />
                          {
                              fieldNotes && fieldNotes.map((note,i) => <Card key={i} {...note} />)
                          }
                      </div>
                  </motion.div>
              </motion.div>
          )
    }
}

export default Results
