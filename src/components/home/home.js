import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import {slideDown, slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import Card from '../../shared/components/card/card'
import {ContentBlock} from '../../shared/components/blocks/contentBlock'
import TitleBlock from '../../shared/components/blocks/titleBlock'
import CalendarBlock from '../../shared/components/blocks/calendarBlock'
import Button from '../../shared/components/button/buttons'
import ViewerContainer from '../../shared/components/articleViewer/viewerContainer'
import {sumOfObjects, truncate} from '../../shared/utilities/jsHelper/helperMethods'
import {codeLookUp} from '../../shared/utilities/jsHelper/stats'


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            seenotes:false,
            seesurvey:false,
            latestDailyTotals:false,
            codes:false,
            fieldNotes:false,
            devNotes:false,
            currentArticles:false,
        }
        this.showEvent = this.showEvent.bind(this)
        this.latestSurveys = this.latestSurveys.bind(this)
        this.selectASurvey = this.selectASurvey.bind(this)
        this.closeSurvey = this.closeSurvey.bind(this)


    };
    componentDidMount(){
        this._isMounted = true
        this.setState({
          ...this.props
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props !== prevProps){
          this.setState({
            ...this.props
          })
        }else if(!this.state.lookUpCodes && this.props.codes){
          this.setState({
            lookUpCodes:codeLookUp(this.state.codes)
          })
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    showEvent(e){
        e.preventDefault()
        if (this.state.seenotes){
            window.scrollTo({left:0,top:this.state.yOffset, behavior:'smooth'})
            this.setState({
                seenotes:!this.state.seenotes
            })
        }else{
            const offset = window.pageYOffset
            this.setState({
                seenotes:!this.state.seenotes,
                selectedArticle:this.state[e.target.id],
                seesurvey:false,
                yOffset:offset
            },window.scrollTo({top:0,left:0, behavior:'smooth'}))
        }
    }
    closeSurvey(e){
      e.preventDefault()
      this.setState({
        seesurvey:false,
        selectedSurvey:false,
        selectedLocation:false,
        selectedDate:false,
        selectedTotal:false,
        selectedPcsM:false,
      })
      window.scrollTo({top:0,left:0, behavior:'smooth'})
    }

    selectASurvey(e){
      e.preventDefault()
      let locationData = this.props.surveyDetails.filter(obj => obj.location === e.target.value)
      let surveyData = locationData[0].dailyTotals.filter(result => result.date === e.target.id)
      this.setState({
        seenotes:false,
        selectedSurvey:surveyData,
        selectedLocation:e.target.value,
        selectedDate:e.target.id,
        selectedTotal:sumOfObjects(surveyData, "quantity"),
        selectedPcsM:sumOfObjects(surveyData, "pcs_m"),
        seesurvey:true,
      })
      window.scrollTo({top:0,left:0, behavior:'smooth'})
    }
    latestSurveys(data){
      var theLatestSurveys = data.map( obj => {
        return({
          callback:this.selectASurvey,
          buttonclass: "cardButton",
          value:obj.location,
          id:obj.date,
          jsDate:new Date(obj.date),
          label:"See survey results",
          cardTitle:obj.location,
          cardDescription:obj.date
        })
      })
      theLatestSurveys = theLatestSurveys.sort((a,b) => new Date(a.jsDate) - new Date(b.jsDate))
      return theLatestSurveys.reverse()
    }

    render(){
      let theMostRecent = () => {
        if(this.state.latestDailyTotals){
          return this.latestSurveys(this.state.latestDailyTotals)
        }
      }
      const theLastThree = theMostRecent()

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
          label:"Close",
      };
      const closeSurveyButton = {
          callback:this.closeSurvey,
          buttonclass: "cardButton",
          id:"A button id",
          label:"Close",
      };
      const titleSummary = 'The collection of data on beach litter provides information on amounts, trends and sources of the trash in swiss waterways. '+
                           'This information can be used to identify effective mitigating techniques and to test the effectiveness of existing strategies.'
      const titleProps =
          {
              title:<div><h4 className="pad-point3-rem">Litter surveyor</h4><p className="pad-point3-rem font-italics">Beach-litter surveys of Swiss rivers and lakes.</p></div>,
              titleBlock:"title-block",
              titleSum:<p className="pad-point3-rem">{titleSummary}</p>,
              titleSumBlock:"title-sum-block"
          };
        return(

                <motion.div
                    className="motion-cont"
                    display="block"
                    initial="open" exit="closed"
                    variants={slideIn}
                    >

                    <AnimatePresence initial={true}>
                        <motion.div
                            className="outer-row"
                            initial="open"  exit="closed"
                            variants={slideIn}
                            >
                            <div className="column-one" >
                            <motion.div
                                variants={slideDown}
                                initial={false}
                                animate={this.state.seesurvey ? "open":"closed"}
                                className="column-collapse"
                                >
                                  <div className="article-wrapper pad-one-p" >
                                    <Button {...closeSurveyButton} />
                                    {
                                    this.state.selectedLocation ?
                                    (<div className="results-div">
                                      <div className="t-row-header-label">
                                          {`Survey data for: ${this.state.selectedLocation}`}
                                      </div>
                                      <div className="t-row-data">
                                          <div className="t-row-label">
                                              Date
                                          </div>
                                          <div className="t-row-quantity">
                                              {this.state.selectedDate}
                                          </div>
                                      </div>
                                      <div className="t-row-data">
                                          <div className="t-row-label">
                                              Survey length - meters
                                          </div>
                                          <div className="t-row-quantity">
                                              {(this.state.selectedTotal/this.state.selectedPcsM).toFixed(0)}
                                          </div>
                                      </div>
                                      <div className="t-row-data">
                                          <div className="t-row-label">
                                              Total pieces
                                          </div>
                                          <div className="t-row-quantity">
                                              {this.state.selectedTotal}
                                          </div>
                                      </div>
                                      <div className="t-row-data">
                                          <div className="t-row-label">
                                              Pieces per meter
                                          </div>
                                          <div className="t-row-quantity">
                                              {this.state.selectedPcsM.toFixed(2)}
                                          </div>
                                      </div>
                                      <div className="t-row-column-labels">
                                        <div className="t-row-code">
                                            Objects
                                        </div>
                                        <div className="t-row-code-quantity">
                                            qty
                                        </div>
                                        <div className="t-row-code-quantity">
                                            pcs/m
                                        </div>
                                      </div>
                                      <div className="t-row-row">

                                      </div>
                                        {
                                          this.state.selectedSurvey.map((obj,i)=> {
                                            return(
                                              <div key={`${i}${obj.code}`} className="t-row-row">
                                                  <div className="t-row-code">
                                                      {`${obj.code}: ${this.state.lookUpCodes[obj.code].description}`}
                                                  </div>
                                                  <div className="t-row-code-quantity">
                                                      {obj.quantity}
                                                  </div>
                                                  <div className="t-row-code-quantity">
                                                      {obj.pcs_m.toFixed(2)}
                                                  </div>
                                              </div>
                                            )
                                          })
                                        }
                                    </div>):null
                                  }
                                    <Button {...closeSurveyButton} />
                                  </div>

                            </motion.div>
                            <motion.div
                                variants={slideDown}
                                initial={false}
                                animate={this.state.seenotes ? "open":"closed"}
                                className="column-collapse"
                                >
                                {
                                    this.state.selectedArticle ?
                                        (
                                            <div className="article-wrapper">
                                                <Button {...buttonProps} />
                                                  <ViewerContainer name="selectedNote" content={this.state.selectedArticle.article} />
                                                <Button {...buttonProps} />
                                            </div>
                                        ):<div>There was an error that we did not account for... sorry</div>
                                }
                            </motion.div>
                                <TitleBlock {...titleProps} />
                                <CalendarBlock {...calendarProps} />
                            </div>
                            <div className="column-two pad-one-p">
                                <ContentBlock key={"homefieldanddevnotes"} {...{content:"Field and Dev notes", className:"section-block"}} />
                                {
                                  this.state.fieldNotes ? (
                                    <Card key={this.state.fieldNotes.slug} {
                                      ...{
                                        cardTitle:this.state.fieldNotes.title,
                                        cardDescription:truncate(this.state.fieldNotes.summary, 7),
                                        callback:this.showEvent,
                                        buttonclass: "cardButton",
                                        id:"fieldNotes",
                                        label:this.state.fieldNotes.title
                                      }}
                                      />):<div>Waiting on data...</div>
                                }
                                {
                                  this.state.devNotes ? (
                                    <Card key={this.state.devNotes.slug} {
                                      ...{
                                        cardTitle:this.state.devNotes.title,
                                        cardDescription:truncate(this.state.devNotes.summary, 7),
                                        callback:this.showEvent,
                                        buttonclass: "cardButton",
                                        id:"devNotes",
                                        label:this.state.devNotes.title
                                      }}
                                      />):<div>Waiting on data...</div>
                                }

                                <ContentBlock key={"homerecentsurveys"} {...{content:"Recent surveys", className:"section-block"}} />
                                  {
                                    theLastThree ?
                                      theLastThree.map(survey => <Card key={survey.id} {...survey} />)
                                    :
                                        <div>Waiting on data...</div>

                                  }
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

        )
    }
}

export default Home
