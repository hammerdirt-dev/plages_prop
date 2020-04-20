import React, { Component } from 'react'
import '../../css/blocks.css'
import '../../css/grids.css'
import '../../css/main.css'
import '../../css/cards.css'
import CalendarCard from '../card/CalendarCard'

class CalendarBlock extends Component {
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render(){
        const titleProps = {
            title:this.props.title,
            content:this.props.content,
            summary:this.props.summary
        }
        const makeCardProps = () => {
            if(this.props.calendarProps){
              return this.props.calendarProps.reverse()
            }else{
              var aNewDate = new Date()

              return ([
                  {
                      date:aNewDate.getDate(),
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
