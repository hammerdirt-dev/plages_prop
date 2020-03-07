import React, {Component} from 'react'
import '../../css/grids.css'
import '../../css/header.css'
import NavBar from '../../../components/navigation/navBar'
import {ContentBlock} from '../blocks/contentBlock'
import {Icon} from '../icons/icon'
import {ICONS} from '../icons/allIcons'
import {AnonUser,RegUser, DbStatus, ServerStatus, Love} from '../icons/icon'
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
            requestedApp:this.props.requestedApp,
            authData:this.props.authData
        }
        const sectionTwoProps = {
            className: "header-label",
            content:"Plages propres 2020-2021"
        }
        const headerIconProps = {
            icon:this.state.showMenu ? ICONS.arrowUp:ICONS.arrowDown,
            size :50,
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
            label:<Icon {...headerIconProps}/>,
        };
        const dataBaseState = () => {
            if (!this.props.indexed && !this.props.indexedData){
                return("red")
            }else if (this.props.indexed && !this.props.indexedData){
                return("yellow")
            }else if(this.props.indexed && this.props.indexedData){
                return("green")
            }

        }
        return(
            <div  className="header-wrapper" id={this.props.id} style={styleHeader()} onClick={this.props.callback} >
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
                    <div className="header-section-three">
                        <div className="icon-wrapper">
                            {
                                this.props.loggedin ? <Love size={20} color="red" />:<Love size={20} color="#807174" />
                            }
                        </div>
                        <div className="icon-wrapper">
                            {
                                this.props.network ? <ServerStatus size={20} color={"green"} />:<ServerStatus size={20} color="red" />
                            }
                        </div>
                        <div className="icon-wrapper">
                            <DbStatus size={20} color={dataBaseState()} />                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
