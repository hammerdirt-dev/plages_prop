/* global gapi */
import {Component} from 'react'
import './apiUrls.js'
import {getSomeData, returnSomeData} from './httpMethods.js'
import {GOOGLE_API_CAL,CALENDAR_PATH} from './apiUrls'


class FetchData extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
        this.getEvents = this.getEvents.bind(this)
    };
    async componentDidMount(){
        let some_data = await returnSomeData(getSomeData(this.props.url), this.props.label);
        this.props.callback(some_data)
    }
    componentDidUpdate(prevProps, prevState){
      if(this.props.network && this.props.network !== prevProps.network){
        this.getEvents()
      }
    }
    getEvents(){
        //Queries the google calendar api
        let that = this;
        const timeMin= new Date()
        const yesterday = new Date(timeMin.setDate(timeMin.getDate() -1))
        const timeLater = new Date()
        const future = new Date(timeLater.setDate(timeLater.getDate() + 30))
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
    render(){
        return(
            null
        )
    }
}

export default FetchData
