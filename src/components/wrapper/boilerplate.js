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
import {
    checkForDb,
    openDB,
    startDBTrans,
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
            currentapp:"Home",
            userdata:false,
            locationdata:false,
        }
        this.requestedApp = this.requestedApp.bind(this)
        this.dataBaseState = this.dataBaseState.bind(this)
        this.networkStatus = this.networkStatus.bind(this)
        this.calendarCallback = this.calendarCallback.bind(this)
        this.calendarError = this.calendarError.bind(this)
    };
    async componentDidMount(){
        this.setState({
            indexed:checkForDb(window)
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.indexed !== prevState.indexed){
            startDBTrans("BeachLitterOne", 12, this.dataBaseState)
        }
    }
    dataBaseState(obj){
        this.setState({
            indexedData:obj.status
        })
    }
    networkStatus(obj){
        this.setState({
            network:obj.status,
        })
    }
    requestedApp(e){
        e.preventDefault()
        this.setState({
            currentapp:e.target.id
        })
    }
    calendarCallback(days){
        this.setState({
            events:days,
        })
    }
    calendarError(error){
        console.log(error)
        this.setState({
            calendarError:error,
        })
    }
    render(){
        const availableApps = appsToLoad(this.state)
        const headerProps = {currentapp:this.state.currentapp, requestedApp:this.requestedApp}
        return(
            <div className="the-container">
                <Header {...headerProps} />
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
            </div>
        )
    }
}

export default AppWrapper
