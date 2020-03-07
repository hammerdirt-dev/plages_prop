/* global gapi */
import React, {Component} from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import '../../shared/css/grids.css'
import '../../shared/css/navigation.css'
import {
    appsToLoad,
    active_style
    } from '../../shared/globals/variablesToEdit'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/main.css'
import Button from '../../shared/components/button/buttons'
import FetchData from '../api/fetchData'
import Header from '../../shared/components/header/header'
import LogIn from '../authentication/authentication'
import Footer from '../../shared/components/footer/footer'
import GetNewData from '../indexed/AddDataToDataBase'
import Modal from '../../shared/components/modal/modal'
import {
    name,
    version,
    checkForDb,
    openDB,
    startDBTrans,
    indexGetAllFromStore,
    } from '../../shared/utilities/indexeddb/indexeddb'
import {ARE_WE_ONLINE, FAKE_URL} from '../api/apiUrls'

class AppWrapper extends Component{
    constructor(){
        super();
        this.state = {
            loggedin:false,
            network:false,
            indexed:false,
            indexedData:false,
            updateDB:false,
            lastUpdate:[],
            currentapp:"Home",
            userdata:false,
            locationdata:false,
            authData:true,
        }
        this.requestedApp = this.requestedApp.bind(this)
        this.dataBaseState = this.dataBaseState.bind(this)
        this.networkStatus = this.networkStatus.bind(this)
        this.calendarCallback = this.calendarCallback.bind(this)
        this.calendarError = this.calendarError.bind(this)
        this.requestLogIn = this.requestLogIn.bind(this)
        this.loginStatus = this.loginStatus.bind(this)
        this.dataBaseCallBack = this.dataBaseCallBack.bind(this)
        this.authData = this.authData.bind(this)
        this.updateDB = this.updateDB.bind(this)
        this.lastUpdate = this.lastUpdate.bind(this)
    };
    async componentDidMount(){
        this.setState({
            indexed:checkForDb(window)
        })
    }
    componentDidUpdate(prevProps, prevState){
        let now = new Date()
        if(this.state.indexed && this.state.indexed !== prevState.indexed){
            // if there is an indexedDB check the last update
            // and upgrade the db if needed.
            indexGetAllFromStore("lastUpdate", "BeachLitterOne", 12, this.dataBaseState,this.dataBaseCallBack)
        }
    }
    dataBaseState(obj){
        console.log(obj)
        this.setState({
            indexedData:obj.status
        })
    }
    dataBaseCallBack(obj){
        this.setState({
            [obj.name]:obj.result
        })
    }
    networkStatus(obj){
        this.setState({
            network:obj.status,
        })
    }
    requestLogIn(){
        this.setState({
            logMeIn:!this.state.logMeIn
        })
    }
    loginStatus(obj){
        this.setState(
            obj
        )
    }
    requestedApp(e){
        e.preventDefault()
        console.log(e.target.id)
        if(e.target.id === "LogMeIn"){
            this.requestLogIn()
        }else if(e.target.id === "updateDB"){
            this.authData()
        }else{
            console.log("setting app state")
            this.setState({
                currentapp:e.target.id
            })
        }
    }
    authData(){
        this.setState({
            authData:!this.state.authData
        })
    }
    updateDB(){
        this.setState({
            updateDB:true,
        })
    }
    lastUpdate(obj){
        this.setState({
            lastUpdate:obj
        })
    }
    calendarCallback(days){
        this.setState({
            events:days,
        })
    }
    calendarError(error){
        this.setState({
            calendarError:error,
        })
    }
    render(){
        const new_date = new Date()
        console.log(this.state)
        const availableApps = appsToLoad(this.state)
        const headerProps = {
            currentapp:this.state.currentapp,
            requestedApp:this.requestedApp,
            loggedin:this.state.loggedin,
            network:this.state.network,
            indexedData:this.state.indexedData,
            indexed:this.state.indexed,
            updateDb:this.authData,
        }
        const dataBaseUpdateContent = () => {
            if(!this.state.lastUpdate[0]){
                return (
                    <>
                        <p>You have no project data on your device. Click "update data" to use this app.</p>
                        <p>Certain portions of this app will not be available if you do not.</p>
                    </>
                    )
                }else{
                    return(
                        <p>Your last update was on this day. Click "Update data" to get the latest surveys</p>
                    )
                }
        }
        return(
            <div className="the-container">
                <LogIn
                    logMeIn={this.state.logMeIn}
                    callBack={this.requestLogIn}
                    reportStatus={this.loginStatus}
                />
                <Modal
                    modalControlProps={{callback:this.authData, buttonclass:"navButton", label:"Close"}}
                    modalCallBackProps={{callback:this.updateDB, buttonclass:"navButton", label:"Update data"}}
                    showMe={this.state.authData}
                    modalTitleProps={{className:"section-block rubik no-wrap", content:<h6 className="text-white pad-one-rem">Update the data on device</h6>}}
                    modalContentProps={{className:"inputDiv pad-one-rem", content:dataBaseUpdateContent()}}
                />
                <Header {...headerProps} />
                <GetNewData
                    getData={this.state.updateDB}
                    lastUpdate={this.lastUpdate}
                />
                <FetchData url={ARE_WE_ONLINE}
                    label={"Network"}
                    callback={this.networkStatus}
                    calendarCallback={this.calendarCallback}
                    calendarError = {this.calendarError}
                />
                <AnimatePresence initial={true}>
                {
                    availableApps[this.state.currentapp]
                }
                </AnimatePresence>
                <Footer {...headerProps} />
            </div>
        )
    }
}

export default AppWrapper
