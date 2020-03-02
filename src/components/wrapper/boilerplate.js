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
import {getSomeData, returnSomeData} from '../api/httpMethods'
import {
    checkForDb,
    openDB,
    startDBTrans,
    } from '../../shared/utilities/indexeddb/indexeddb'
import {ARE_WE_ONLINE, FAKE_URL, GOOGLE_API_CAL, GOOGLE_CALENDAR_ID} from '../api/apiUrls'

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
        this.changeApp = this.changeApp.bind(this)
        this.dataBaseState = this.dataBaseState.bind(this)
        this.networkStatus = this.networkStatus.bind(this)
        this.getEvents = this.getEvents.bind(this)
    };
    async componentDidMount(){
        this.getEvents()
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
    getEvents(){
        let that = this;


        function start() {
            gapi.client.init({
                'apiKey': GOOGLE_API_CAL
            }).then(function() {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events/`,
                    'params': {
                        'timeMin':"2020-02-20T00:00:00Z",
                        'timeMax':"2020-02-25T23:59:59Z"
                    }
                })
                }).then( (response) => {
                    // let events = response.result.items
                    // console.log(events)
                    that.setState({
                        events:response.result.items
                    }, ()=>{console.log(that.state.events);}
                )
            }, function(reason) {
                console.log(reason);
            });
        }
        gapi.load('client', start)
    }
    changeApp(appName){
        const availableApps = appsToLoad(this.state)
        return(
                [availableApps[appName]]
        )
    }
    render(){
        let displayThis = this.changeApp(this.state)
        const headerProps = {currentapp:this.state.currentapp, requestedApp:this.requestedApp}
        return(
            <div className="the-container">
            <Header {...headerProps} />
            <FetchData url={ARE_WE_ONLINE} label={"Network"} callback={this.networkStatus} />


                    {
                        this.changeApp(this.state.currentapp).map(obj => obj)
                    }

            </div>
        )
    }
}

export default AppWrapper
