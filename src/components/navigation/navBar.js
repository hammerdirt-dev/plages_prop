import React, {Component} from 'react'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/navigation.css'
import Button from '../../shared/components/button/buttons'
import {active_style} from '../../shared/globals/variablesToEdit'

class NavBar extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const styleNavBar = props => {
                return ({})
        }
        let navbar_style = styleNavBar(this.props)
        const navButtonProps = [
            {
                buttonclass:"navButton",
                active: this.props.currentapp === "Home" ? true:false,
                id:"Home",
                style:active_style,
                callback:this.props.requestedApp,
                label:"Home"
            },
            {
                buttonclass: "navButton",
                id:"Project",
                active: this.props.currentapp === "Project" ? true:false,
                style:active_style,
                callback:this.props.requestedApp,
                label:"Project"
            },
            {
                buttonclass: "navButton",
                id:"LogMeIn",
                active: this.props.currentapp === "LogMeIn" ? true:false,
                style:active_style,
                callback:this.props.requestedApp,
                label:"Login"
            },
            {
                buttonclass: "navButton",
                id:"updateDB",
                active: this.props.currentapp === "LogMeIn" ? true:false,
                style:active_style,
                callback:this.props.requestedApp,
                label:"Update DB"
            }
        ]
        return(
            <div className="nav-container">
                <div className="nav-item">
                    {
                        navButtonProps && navButtonProps.map((obj,i) => <Button key={i} {...obj} />)
                    }
                </div>
            </div>
        )
    }
}
export default NavBar
