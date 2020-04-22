
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
    makeIsoDate = () => {
      var today = new Date()
      return(
        today.toISOString()
      )
    }
    getEventObjects = (anEvent) => {
      // formatting for the calendar blocks prop
      if(anEvent.status === 'confirmed'){
        let toDisplay={}
        if(anEvent.start && anEvent.start.date && anEvent.status === 'confirmed' && anEvent.summary){
          toDisplay.status = anEvent.status
          toDisplay.date = anEvent.start.date
          toDisplay.unixDate = Date.parse(anEvent.start.date)
          toDisplay.location = anEvent.location
          toDisplay.summary = anEvent.summary
          toDisplay.description = anEvent.description
          return toDisplay
        }else if(anEvent.start && anEvent.start.dateTime && anEvent.status === 'confirmed' && anEvent.summary){
          let toDisplay={}
          toDisplay.date = anEvent.start.dateTime.slice(0,10)
          toDisplay.unixDate = Date.parse(toDisplay.date)
          toDisplay.location = anEvent.location
          toDisplay.summary = anEvent.summary
          toDisplay.description = anEvent.description
          return toDisplay
        }
      }

    }
    getEvents(){
      //Queries the google calendar api
      let a = new Date()
      let b = new Date()
      let c = b.setDate(b.getDate() + 30)
      let timeMax = new Date(c).toISOString()
      let timeMin = a.toISOString()
      var apiCall = `${CALENDAR_PATH}?key=${GOOGLE_API_CAL}&timeMax=${timeMax}&timeMin=${timeMin}&singleEvents=true`
      fetch(apiCall).then(response => response.json())
        .then(data => {return data.items.filter(obj => obj.status === 'confirmed')}).then(filtered => filtered.map(obj => this.getEventObjects(obj)))
        .then(anArray => {return this.props.calendarCallback(anArray)})

    }
    render(){
        return(
            null
        )
    }
}

export default FetchData
