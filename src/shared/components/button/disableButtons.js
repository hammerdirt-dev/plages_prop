import React, {Component} from 'react'
import '../../css/buttons.css'


class DisableButton extends Component{
    render(){
        const styleButton = props => {
            if (this.props.active){
                return (this.props.style)
            }else{
                return ({})
            }
        }
        let active_style = styleButton(this.props)
        return(

            <button  className={`${this.props.buttonclass}`} value={this.props.value} name={this.props.name} id={this.props.id} style={active_style} onClick={this.props.callback} disabled={this.props.disabled} >
                {this.props.label}
            </button>
        )
    }
}

export default DisableButton
