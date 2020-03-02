import React, {Component} from 'react'
import '../../css/buttons.css'



class Button extends Component{
    constructor(props){
        super(props);
    }
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
            <button  className={`${this.props.buttonclass}`} id={this.props.id} style={active_style} onClick={this.props.callback} >
                {this.props.label}
            </button>
        )
    }
}

export default Button
