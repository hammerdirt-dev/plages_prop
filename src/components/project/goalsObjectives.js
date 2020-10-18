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
                      <div className="block-row pad-point3-rem">
                          <div className="inline-block-50-left pad-one-rem">
                              <h6>Goal</h6>
                              <p className="">
                                Collect the data and develop the necessary infrastructure to accurately assess the composition and
                                abundance of trash along selected Swiss rivers and lakes. Present those findings in a consolidated report and
                                a web based application.
                              </p>
                              <p className="">
                                To achieve this goal the project has mulitple objectives in three different areas:
                              </p>
                              <ol className="list-block">
                                <li>Field operations and outreach</li>
                                <li>Application development</li>
                                <li>Data storage and analysis</li>
                              </ol>
                              <p className="">
                                These objectives can be further divided into three distinct groups:
                              </p>
                              <ol className="list-block">
                                <li>Preparation - the first 90 days</li>
                                <li>Data collection - the following 12 months </li>
                                <li>Reporting - the last 3 months</li>
                              </ol>
                              <p className="">
                                This project requires a variety of skils and experience in the fields of hydrology, geography, mathematics, project management, application development and database management.
                              </p>
                              <span className="rubik marg-top-bot-point-five"> Symbol legend:</span>
                              <ul className="list-block">
                                <li>Completed: <Check size="24" color="green" /></li>
                                <li>In progress: <Inprogress size="24" color="blue" /></li>
                                <li>Not started: <Close size="24" color="red" /></li>
                              </ul>
                          </div>
                            <div className="inline-block-50-left pad-one-rem">
                              <h6 >Field ops: first 90 days</h6>
                              <p >
                                  <Check size="24" color="green" />Define sampling methods and protocols. The sampling methods and protocols are based
                                  on several national and international programs used to assess trash loads on beaches in the marine environment.
                              </p>
                              <p >
                                  <Check size="24" color="green" />Define safety and training requirements. The public is invited to particpate. However, to ensure
                                  the reliability of the data and consistent results a training program and methodology must be in place. Field surveys have a certain amount of risk, handling
                                  trash presents specific challenges for the participants and the public.
                              </p>
                              <p >
                                  <Check size="24" color="green" />Select survey locations within agreed geogpraphic scope. The location of the survey sites need to be accesible
                                  to the public and representative of other locations in the region. The topography of the location should not require special equipment to negotiate and the shoreline should be as long as possible.
                              </p>
                              <p >
                                  <Check size="24" color="green" />Create a standard document for municipalities. Ultimately the local municpalities are responsible for the maintenance
                                  of public areas within their domain. The purpose of this document is informing them of our operations and requesting information about maintenance schedules for the locations concerned.
                              </p>
                          </div>
                      </div>
                      <div className="block-row pad-point3-rem">
                          <div className="inline-block-50-left pad-one-rem">
                            <h6 >App dev: first 90 days</h6>
                            <p >
                                <Inprogress size="24" color="blue" />Create a mobile application with different modules. The application needs to be suitable for mobile phones and available offline. Although the current application
                                is deployed the concept of <strong>continuous development</strong> dictates that this objective is never truly "complete".
                            </p>
                            <p >
                                <Check size="24" color="green" />Create a module for data entry. Surveyors need to be able enter and save survey data thorugh their mobile phones. Furthermore, surveyors need to be able to save and retrieve
                                incomplete surveys on their device.
                            </p>
                            <p >
                                <Check size="24" color="green" />Create a method to create and display project documents natively. An online text editor allows staff members to create field notes and transfer
                                project documents to the application natively -- no .pdf files.
                            </p>
                            <p >
                                <Check size="24" color="green" />Create an authentication module. Authentication and permissions are set by the remote server. Surveyors need to be able to login through the
                                mobile app.
                            </p>
                            <p >
                                <Check size="24" color="green" />Create a data display module. Allow stakeholders to search and view survey results dynamically. The module needs to be scalable and easy to modify
                                according to the needs of stakeholders.
                            </p>
                            <p >
                                <Check size="24" color="green" />Create a data access module. Give stakeholders the tools necesary to develop analysis methods using this data. Make the tools available to all persons
                                interested in the subject. Stakeholders needs may vary, staff need to accomodate a variety of requests.
                            </p>
                        </div>
                        <div className="inline-block-50-left pad-one-rem">
                            <h6>Data storage: first 90 days</h6>
                            <p >
                                <Inprogress size="24" color="blue" />Create an automated interface for storage and access. In order for the survey results to be accesible they need to available through a web interface and accesible
                                programmatically. Just like the mobile application this objective is completely functional but never really "complete".
                            </p>
                            <p >
                                <Check size="24" color="green" />Define sorting methods and criteria.The data must be provided in a structured way that allows for quick sorting and grouping with predicitable results. While certain access points will remain stable
                                for the duration of the project, others will be created or terminated based on the use case.
                            </p>
                            <p >
                                <Check size="24" color="green" />Define and create authentication and permissions structure. Surveyors need to post survey results to the server. Staff need to create field notes and articles. Access is a security
                                and transparency issue that is under constant development.
                            </p>
                            <p >
                                <Check size="24" color="green" />Create a set of repositories for access and analysis. Project contributors should be working with a common set of tools and a unique location to collaborate. The primary fields of analysis
                                have been consolidated into three repositories on Github. Data access and analysis tools are available and maintained through this portal.
                            </p>
                        </div>
                      </div>
                      <div className="block-row pad-point3-rem">
                          <div className="inline-block-50-left pad-one-rem">
                              <h6>Data collect: 12 months</h6>
                              <p >
                                  <Inprogress size="24" color="blue" />Collect at least 240 samples. There are 20 survey sites on seven lakes that will be sampled once a month for a twelve month period.
                              </p>
                              <p >
                                  <Inprogress size="24" color="blue" />Collect samples at random locations. In addition to the established 20 survey sites, individual samples will be collected along the selected river basins.
                              </p>
                              <p >
                                  <Inprogress size="24" color="blue" />Create an interim report. The interim report is designed to give a proposed structure and invite stakeholders to particpate in the design and content of the final report.
                              </p>
                              <p >
                                  <Inprogress size="24" color="blue" />Provide custom reports and output. Interested stakeholders can request reports that address a particular need.
                              </p>
                              <p >
                                  <Inprogress size="24" color="blue" />Provide outreach services. Interested individuals or groups can particpate in surveys or adopt a survey site for the duration of the project. Furthermore, municpalities or
                                  regional adiminstrations may request presentations and status updates.
                              </p>
                          </div>
                          <div className="inline-block-50-left pad-one-rem">
                              <h6 >Reporting: last 90 days</h6>
                              <p >
                                  <Inprogress size="24" color="blue" />Create a printed report of survey results and analysis. The content and format of the final document is a collaborative effort with other stakeholders.
                              </p>
                              <p >
                                  <Inprogress size="24" color="blue" />Consolidate the code base. This application is opensource and is destined to be the property of the "community".
                              </p>
                              <p >
                                  Questions? contact roger or shannon @hammerdirt.ch!
                              </p>

                          </div>
                      </div>
                  </div>
            </motion.div>

        )
    }
}

export default GoalsObjectives
