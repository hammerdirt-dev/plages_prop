import React, {Component} from 'react'
import '../../css/grids.css'
import '../../css/header.css'
import NavBar from '../../../components/navigation/navBar'
import ContentBlock from '../blocks/contentBlock'
import Icon from '../icons/icon'
import {ICONS} from '../icons/allIcons'
import {openClose} from '../../utilities/framer/variants'
import Button from '../button/buttons'
import{ motion} from 'framer-motion'

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu:true,
        }
        this.seeMenu = this.seeMenu.bind(this)
    }
    seeMenu(e){
        e.preventDefault()
        this.setState({
            showMenu:!this.state.showMenu
        })
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
            className: "header-label",
            content:"Plages propres 2020-2021"
        }
        let header_style = styleHeader(this.props)
        const iconProps = {
            icon:this.state.showMenu ? ICONS.arrowUp:ICONS.arrowDown,
            size :40,
            styles:{
                svg:{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                },
                path: {
                  fill: '#fff',
                }
            }
        }
        const buttonProps = {
            callback:this.seeMenu,
            buttonclass: "headerButton",
            id:"see-nav-menu",
            label:<Icon {...iconProps}/>,
        };
        return(
            <div  className="header-wrapper" id={this.props.id} style={header_style} onClick={this.props.callback} >
                <motion.div variants={openClose} animate={this.state.showMenu ? "open":"closed"} className="header-section-one">
                    <NavBar {...navBarProps} />
                </motion.div>
                <div className="header-section-two">
                    <div className="header-button-wrapper">
                        <Button {...buttonProps}  />
                    </div>
                    <div className="header-label">
                    <ContentBlock {...sectionTwoProps} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
