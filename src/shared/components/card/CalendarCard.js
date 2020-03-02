import React, {Component} from 'react'
import '../../css/cards.css'
import '../../css/buttons.css'
import Button from '../button/buttons'


class CalendarCard extends Component{
    constructor(props){
        super(props);
    };
    render(){
        const {date, summary, description} = this.props
        console.log(this.props)
        return(
            <div className="calendar-card-row-content">
                <div className="calendar-card-title">
                    <strong>{date.toDateString()}</strong>
                </div>
                <div className="calendar-card-summary">
                    {summary}
                </div>
                <div className="calendar-card-desc">
                    {description}
                </div>
            </div>
        )
    }
}

export default CalendarCard
