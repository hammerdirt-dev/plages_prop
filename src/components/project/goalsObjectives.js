import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import {Close, Check, Inprogress} from '../../shared/components/icons/icon'


class GoalsObjectives extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
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
    }

    render(){

        return(
            <motion.div
                className="outer-row"
                initial="closed"
                animate="open"
                exit="closed"
                variants={slideIn}
                >
                  <div className="column-full-width background-white">
                      <div className="block-row">
                          <div className="inline-block-50-left">
                              <h6>Goal</h6>
                              <p className="pad-point3-rem">
                                Collect the data and develop the necessary infrastructure to accurately assess the composition and
                                abundance of trash along selected Swiss rivers and lakes. Present those findings in a consolidated report and
                                a web based application.
                              </p>
                              <p className="pad-point3-rem">
                                To achieve this goal the project has mulitple objectives in three different areas:
                              </p>
                              <ol className="list-block">
                                <li>Field operations and outreach</li>
                                <li>Application development</li>
                                <li>Data storage and analysis</li>
                              </ol>
                              <p className="pad-point3-rem">
                                These objectives can be further divided into three distinct groups:
                              </p>
                              <ol className="list-block">
                                <li>Preparation - the first 90 days</li>
                                <li>Data collection - the following 12 months </li>
                                <li>Reporting - the last 3 months</li>
                              </ol>
                              <p className="pad-point3-rem">
                                This project requires a variety of skils and experience in the fields of hydrology, geography, mathematics, project management, application development and database management.
                              </p>
                              <span className="rubik text-bold pad-point3-rem"> Symbol legend:</span>
                              <ul className="list-block">
                                <li>Completed: <Check size="24" color="green" /></li>
                                <li>In progress: <Inprogress size="24" color="blue" /></li>
                                <li>Not started: <Close size="24" color="red" /></li>
                              </ul>
                          </div>
                          <div className="inline-block-50-left">
                              <h6 className="border-bottom">Field ops: first 90 days</h6>
                              <p className="pad-point3-rem">
                                  <Check size="24" color="green" /><span className="rubik text-bold"> Objective: define sampling methods and protocols.</span> The sampling methods and protocols are based
                                  on several national and international programs used to assess trash loads on beaches in the marine environment.
                              </p>
                              <p className="pad-point3-rem">
                                  <Check size="24" color="green" /><span className="rubik text-bold"> Objective: define safety and training requirements.</span> The public is invited to particpate. However, to ensure
                                  the reliability of the data and consistent results a training program and methodology must be in place. Field surveys have a certain amount of risk, handling
                                  trash presents specific challenges for the participants and the public.
                              </p>
                              <p className="pad-point3-rem">
                                  <Check size="24" color="green" /><span className="rubik text-bold"> Objective: select survey locations within agreed geogpraphic scope.</span> The location of the survey sites need to be accesible
                                  to the public and representative of other locations in the region. The topography of the location should not require special equipment to negotiate and the shoreline should be as long as possible.
                              </p>
                              <p className="pad-point3-rem">
                                  <Check size="24" color="green" /><span className="rubik text-bold"> Objective: create a standard document for municipalities.</span> Ultimately the local municpalities are responsible for the maintenance
                                  of public areas within their domain. The purpose of this document is informing them of our operations and requesting information about maintenance schedules for the locations concerned.
                              </p>
                          </div>
                      </div>
                      <div className="block-row">
                        <div className="inline-block-50-left">
                            <h6 className="border-bottom">App dev: first 90 days</h6>
                            <p className="pad-point3-rem">
                                <Inprogress size="24" color="blue" /><span className="rubik text-bold"> Objective: create a mobile application with different modules.</span> The application needs to be suitable for mobile phones and available offline. Although the current application
                                is deployed the concept of <strong>continuous development</strong> dictates that this objective is never truly "complete".
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: create a module for data entry.</span> Surveyors need to be able enter and save survey data thorugh their mobile phones. Furthermore, surveyors need to be able to save and retrieve
                                incomplete surveys on their device.
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: create a method to create and display project documents natively.</span> An online text editor allows staff members to create field notes and transfer
                                project documents to the application natively -- no .pdf files.
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: create an authentication module.</span> Authentication and permissions are set by the remote server. Surveyors need to be able to login through the
                                mobile app.
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: create a data display module.</span> Allow stakeholders to search and view survey results dynamically. The module needs to be scalable and easy to modify
                                according to the needs of stakeholders.
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: create a data access module.</span> Give stakeholders the tools necesary to develop analysis methods using this data. Make the tools available to all persons
                                interested in the subject. Stakeholders needs may vary, staff need to accomodate a variety of requests.
                            </p>
                        </div>
                        <div className="inline-block-50-left">
                            <h6 className="border-bottom">Data storage: first 90 days</h6>
                            <p className="pad-point3-rem">
                                <Inprogress size="24" color="blue" /><span className="rubik text-bold"> Objective: create an automated interface for storage and access.</span> In order for the survey results to be accesible they need to available through a web interface and accesible
                                programmatically. Just like the mobile application this objective is completely functional but never really "complete".
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: define sorting methods and criteria.</span>The data must be provided in a structured way that allows for quick sorting and grouping with predicitable results. While certain access points will remain stable
                                for the duration of the project, others will be created or terminated based on the use case.
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: define and create authentication and permissions structure.</span> Surveyors need to post survey results to the server. Staff need to create field notes and articles. Access is a security
                                and transparency issue that is under constant development.
                            </p>
                            <p className="pad-point3-rem">
                                <Check size="24" color="green" /><span className="rubik text-bold"> Objective: create a set of repositories for access and analysis.</span> Project contributors should be working with a common set of tools and a unique location to collaborate. The primary fields of analysis
                                have been consolidated into three repositories on Github. Data access and analysis tools are available and maintained through this portal.
                            </p>
                        </div>
                      </div>
                      <div className="block-row">
                          <div className="inline-block-50-left">
                              <h6 className="border-bottom">Data collect: 12 months</h6>
                              <p className="pad-point3-rem">
                                  <Inprogress size="24" color="blue" /><span className="rubik text-bold"> Objective: collect at least 240 samples.</span> There are 20 survey sites on seven lakes that will be sampled once a month for a twelve month period.
                              </p>
                              <p className="pad-point3-rem">
                                  <Inprogress size="24" color="blue" /><span className="rubik text-bold"> Objective: collect samples at random locations.</span> In addition to the established 20 survey sites, individual samples will be collected along the selected river basins.
                              </p>
                              <p className="pad-point3-rem">
                                  <Close size="24" color="red" /><span className="rubik text-bold"> Objective: create an interim report.</span> The interim report is designed to give a proposed structure and invite stakeholders to particpate in the design and content of the final report.
                              </p>
                              <p className="pad-point3-rem">
                                  <Inprogress size="24" color="blue" /><span className="rubik text-bold"> Objective: provide custom reports and output.</span> Interested stakeholders can request reports that address a particular need.
                              </p>
                              <p className="pad-point3-rem">
                                  <Inprogress size="24" color="blue" /><span className="rubik text-bold"> Objective: provide outreach services.</span> Interested individuals or groups can particpate in surveys or adopt a survey site for the duration of the project. Furthermore, municpalities or
                                  regional adiminstrations may request presentations and status updates.
                              </p>
                          </div>
                          <div className="inline-block-50-left">
                              <h6 className="border-bottom">Reporting: last 90 days</h6>
                              <p className="pad-point3-rem">
                                  <Close size="24" color="red" /><span className="rubik text-bold"> Objective: create a printed report of survey results and analysis.</span> The content and format of the final document is a collaborative effort with other stakeholders.
                              </p>
                              <p className="pad-point3-rem">
                                  <Close size="24" color="red" /><span className="rubik text-bold"> Objective: consolidate the code base.</span> This application is opensource and is destined to be the property of the "community".
                              </p>
                              <p className="pad-point3-rem">
                                  <span className="rubik text-bold">Questions?</span> contact roger or shannon @hammerdirt.ch!
                              </p>

                          </div>
                      </div>
                  </div>
            </motion.div>

        )
    }
}

export default GoalsObjectives
