import React, {Component} from 'react'
import '../../css/cards.css'
import '../../css/buttons.css'
import Button from '../button/buttons'


class Card extends Component{
    render(){
        const {cardDescription, cardTitle, ...buttonProps} = this.props
        return(
            <div className="card">
                <div className="card-title font-one-point-two">
                    {cardTitle}
                </div>
                <Button {...buttonProps} />
                <div className="card-desc font-point-ninefive">
                    {cardDescription}
                </div>
            </div>
        )
    }
}

export default Card
