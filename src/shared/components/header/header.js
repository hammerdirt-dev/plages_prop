import React, {Component} from 'react'
import '../../css/grids.css'
import '../../css/header.css'
import NavBar from '../../../components/navigation/navBar'
import {ContentBlock} from '../blocks/contentBlock'
import {Icon} from '../icons/icon'
import {ICONS} from '../icons/allIcons'
import {DbStatus, ServerStatus, Love} from '../icons/icon'
import {openClose} from '../../utilities/framer/variants'
import Button from '../button/buttons'
import{ motion} from 'framer-motion'
import { AppSections } from '../../globals/variablesToEdit'
import {active_style} from '../../globals/variablesToEdit'


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showMenu:true,
        }
        this.seeMenu = this.seeMenu.bind(this)
        this.makeNavButtons = this.makeNavButtons.bind(this)
    }
    componentDidMount(){
        this._isMounted = true
        let windowSize = window.matchMedia("(min-width: 780px)")
        this.setState({
          showMenu:windowSize.matches,
          navButtonProps:this.makeNavButtons()
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){
      if(this.props.loggedin !== prevProps.loggedin){
        this.setState({
          navButtonProps:this.makeNavButtons()
        })
      }if(this.props.updateComponent !== prevProps.updateComponent){
        this.setState({
          navButtonProps:this.makeNavButtons()
        })
      }if(this.props.network !== prevProps.network){
        this.setState({
          navButtonProps:this.makeNavButtons()
        })
      }if(this.props.currentapp !== prevProps.currentapp){
        this.setState({
          navButtonProps:this.makeNavButtons()
        })
      }
    }
    seeMenu(e){
        e.preventDefault()
        this.setState({
            showMenu:!this.state.showMenu
        })
    }
    makeNavButtons(){
      var navButtonProps
      if(this.props.loggedin && this.props.network  && this.props.updateComponent){
        navButtonProps = AppSections.map(obj =>
          ({
              buttonclass:"navButtonHeader",
              active: this.props.currentapp === obj.id ? true:false,
              id:obj.id,
              style:active_style,
              callback:this.props.requestedApp,
              disabled:false,
              label:obj.label
            })
          )
      }else if (!this.props.loggedin && this.props.network && this.props.updateComponent){
        navButtonProps = []
        AppSections.forEach(obj => {
          if(obj.label === "Survey"){
            navButtonProps.push(
              {
                  buttonclass:"navButtonHeader",
                  active: this.props.currentapp === obj.id ? true:false,
                  id:obj.id,
                  style:active_style,
                  callback:this.props.requestedApp,
                  disabled:true,
                  label:obj.label
                }
            )
          }else{
            navButtonProps.push(
              {
                  buttonclass:"navButtonHeader",
                  active: this.props.currentapp === obj.id ? true:false,
                  id:obj.id,
                  style:active_style,
                  callback:this.props.requestedApp,
                  disabled:false,
                  label:obj.label
                }
            )
          }
        })
      }else if(!this.props.network && this.props.updateComponent){
        console.log("no network")
        navButtonProps = []
        AppSections.forEach(obj => {
          if(obj.label === "Login" || obj.label === "Update DB" || obj.label === 'Survey'){
            navButtonProps.push(
              {
                  buttonclass:"navButtonHeader",
                  active: this.props.currentapp === obj.id ? true:false,
                  id:obj.id,
                  style:active_style,
                  callback:this.props.requestedApp,
                  disabled:true,
                  label:obj.label
                }
            )
          }else{
            navButtonProps.push(
              {
                  buttonclass:"navButtonHeader",
                  active: this.props.currentapp === obj.id ? true:false,
                  id:obj.id,
                  style:active_style,
                  callback:this.props.requestedApp,
                  disabled:false,
                  label:obj.label
                }
            )
          }
        })

      }else if(this.props.network && !this.props.indexedData && this.props.indexed){
        console.log("no network")
        navButtonProps = []
        AppSections.forEach(obj =>{

          if(obj.id === "updateDB"){
            let a_button = {
              buttonclass:"navButtonHeader",
              active: this.props.currentapp === obj.id ? true:false,
              id:obj.id,
              style:active_style,
              callback:this.props.requestedApp,
              disabled:false,
              label:obj.label
            }
            navButtonProps.push(a_button)
          }
        })
      }
      return navButtonProps
    }
    render(){
        const sectionTwoProps = {
            className: "header-label",
            content:"Litter surveyor 2020-2021"
        }
        const headerIconProps = {
            icon:ICONS.menu,
            size :50,
            styles:{
                svg:{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                },
                path: {
                  fill: '#000',
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
            <div  className="header-wrapper header-wrapper-border" id={this.props.id} onClick={this.props.callback} >
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
                <motion.div variants={openClose} animate={this.state.showMenu ? "open":"closed"} className="header-section-one">
                    <NavBar navButtonProps={this.state.navButtonProps} />
                    <div className="closeMobileNav">
                    <Button
                      callback={this.seeMenu}
                      label="Close"
                      buttonclass="cardButton"
                      id="closeNavMenuMobile"
                      />
                      </div>
                </motion.div>
            </div>
        )
    }
}

export default Header
