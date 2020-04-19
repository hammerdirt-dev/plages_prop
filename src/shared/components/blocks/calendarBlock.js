import React, { Component } from 'react'
import '../../css/blocks.css'
import '../../css/grids.css'
import '../../css/main.css'
import '../../css/cards.css'
import CalendarCard from '../card/CalendarCard'



class CalendarBlock extends Component {
    constructor(props){
        super(props)
        this.queryBuilder = this.queryBuilder.bind(this)
        this.queryCalendar = this.queryCalendar.bind(this)
    };
    componentDidMount(){
        this._isMounted = true
    }
    queryBuilder(days){
        var today = new Date();
        let less_than = today.setDate(today.getDate() + days);
        today = new Date()
        let greater_than = today.setDate(today.getDate() -1);
        return [greater_than, today,less_than];
    }
    queryCalendar(query,events){
        let days = []
        // console.log(events)
        events.forEach(function(day){
            if(day.status === 'confirmed'){
              // console.log(day.summary)
              // console.log(day.start.date)
              // console.log(day.location)
              const date = Date.parse(day.start.date)
              const beforeDate = Date.parse(new Date(query[0]))
              const afterDate = Date.parse(new Date(query[2]))
              if(date < afterDate && date > beforeDate){
                  days.push(day)
            }
          }
        })
        days.sort(function(a,b){
            return  new Date(a.start.date) - new Date(b.start.date)
        })
        const calendarProps = days.map(day => ({date:new Date(day.start.date), summary:day.summary, description:day.description, location:day.location}))
        return calendarProps
    }
    render(){
        const titleProps = {
            title:this.props.title,
            content:this.props.content,
            summary:this.props.summary
        }
        const makeCardProps = () => {
            if(this.props.calendarProps){
                const x = this.queryCalendar(this.queryBuilder(20), this.props.calendarProps)
                return x
            }else{
                return ([
                    {
                        date:new Date(),
                        summary:"Do you have a network connection? Give it a second to see if it updates!",
                        content:this.props.title,
                        className:this.props.titleBlock
                    }
                ])
            }
        }
        const cardProps = makeCardProps()
        return(
            <div className="calendar-card-row" >
                <div className="calendar-card-row-content" key="oneX" >
                    <div className="calendar-card-title">
                        <strong>{titleProps.title}</strong>
                    </div>
                    <div className="calendar-card-summary font-point-nine">
                        <p className="font-point-ninefive">{titleProps.content}</p>
                        <p className="font-point-ninefive">{titleProps.summary}</p>
                    </div>
                </div>
                {
                    cardProps && cardProps.map((day,i) => <CalendarCard key={i} {...day}/>)
                }
            </div>

        )
    }
}

export default CalendarBlock
