/* global gapi */
import React, {Component} from 'react'
import './apiUrls.js'
import {getSomeData, returnSomeData} from './httpMethods.js'
import {GOOGLE_API_CAL,CALENDAR_PATH} from '../api/apiUrls'


class FetchData extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.responseStatus = this.responseStatus.bind(this)
        this.getEvents = this.getEvents.bind(this)
    };
    async componentDidMount(){
        let some_data = await returnSomeData(getSomeData(this.props.url), this.props.label);
        this.props.callback(some_data)
        this.getEvents()
    }
    getEvents(){
        let that = this;
        const timeMin= new Date()
        const yesterday = new Date(timeMin.setDate(timeMin.getDate() -1))
        const timeLater = new Date
        const future = new Date(timeLater.setDate(timeLater.getDate() + 15))
        function start() {
            gapi.client.init({
                'apiKey': GOOGLE_API_CAL
            }).then(function() {
                return gapi.client.request({
                    'path': CALENDAR_PATH,
                    'params': {
                        'timeMin':yesterday.toISOString(),
                        'timeMax':future.toISOString()
                    }
                })
            }).then( (response) => {
                    that.props.calendarCallback(response.result.items)
            }, reason => that.props.calendarError(reason) )
        }
        gapi.load('client', start)
    }

    responseStatus(e){
        e.preventDefault()
        this.setState({
            seenotes:!this.state.seenotes
        })
    }
    render(){
        return(
            null
        )
    }
}

export default FetchData
