import React, {Component} from 'react'
import '../../css/cards.css'

class CalendarCard extends Component{
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render(){
      const {date, summary, description, location} = this.props
        return(
            <div className="calendar-card-row-content">
                <div className="calendar-card-title">
                    <strong>{date}</strong>
                </div>
                <div className="calendar-card-summary">
                    {summary}
                </div>
                <div className="calendar-card-summary">
                    {location}
                </div>
                <div className="calendar-card-desc">
                    {description}
                </div>
            </div>
        )
    }
}

export default CalendarCard
