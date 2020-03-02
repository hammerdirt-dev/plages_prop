import React, {Component} from 'react'
import '../../css/cards.css'
import '../../css/buttons.css'
import Button from '../button/buttons'


class Card extends Component{
    constructor(props){
        super(props);
    };
    render(){
        const {cardDescription, cardTitle, ...buttonProps} = this.props
        return(
            <div className="card">
                <div className="card-title">
                    {cardTitle}
                </div>
                <Button {...buttonProps} />
                <div className="card-desc">
                    {cardDescription}
                </div>
            </div>
        )
    }
}

export default Card
