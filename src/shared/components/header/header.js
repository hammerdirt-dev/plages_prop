import React, {Component} from 'react'
import '../../css/grids.css'
import '../../css/header.css'
import NavBar from '../../../components/navigation/navBar'
import ContentBlock from '../blocks/contentBlock'




class Header extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const styleHeader = props => {
            return ({})
        }
        const navBarProps =  {
            currentapp:this.props.currentapp,
            requestedApp:this.props.requestedApp
        }
        const sectionTwoProps = {
            className: "font-one-point-two",
            content:"Litter surveillance 2020-2021"
        }
        let header_style = styleHeader(this.props)

        return(
            <div  className="header-wrapper" id={this.props.id} style={header_style} onClick={this.props.callback} >
                <div className="header-section-one">
                    <NavBar {...navBarProps} />
                </div>
                <div className="header-section-two">
                    <ContentBlock {...sectionTwoProps} />
                </div>
            </div>
        )
    }
}

export default Header
