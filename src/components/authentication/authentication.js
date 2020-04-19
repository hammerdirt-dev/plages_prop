import React, {Component} from 'react'
import {motion} from 'framer-motion'
import Button from '../../shared/components/button/buttons'
import '../../shared/css/grids.css'
import '../../shared/css/blocks.css'
// import {getSomeData, returnSomeData} from '../api/httpMethods.js'
import {TOKEN_AUTH, REFRESH_TOKEN} from '../api/apiUrls'
import {slideDown} from '../../shared/utilities/framer/variants'



class LogIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:""
        }
        this.responseStatus = this.responseStatus.bind(this)
        this.authLogin = this.authLogin.bind(this)
        this.refreshTheToken = this.refreshTheToken.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.postRequest = this.postRequest.bind(this)
    };
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.token !== prevState.token){
            this.props.reportStatus({token:this.state.token})
        }
    }
    authLogin(){
        //makes a post request for JWT auth
        //returns to two tokens
        //handles 400, 401 and other errors
        console.log("authentication requested")
        const username = this.state.userName
        const password = this.state.password
        if(username && password){
            let data = `{"username": "${this.state.userName}", "password": "${this.state.password}"}`
            const makeRequest = fetch(TOKEN_AUTH, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: data,
            })
            makeRequest.then(response => response.json()
                .then(data => ({status: response.status, body: data})))
                .then(obj => {
                    var responseDetail, token, refreshToken, loggedIn, tokenChecked, userName
                    if(obj.status === 200){
                        responseDetail = "Logged in!"
                        token = obj.body.access
                        refreshToken = obj.body.refresh
                        loggedIn = true
                        tokenChecked = true
                        userName = username
                    }else if(obj.status === 400){
                        responseDetail ="Fill in both fields"
                    }else if(obj.status === 401){
                        responseDetail = "Wrong credentials"
                    }else if(obj.status !== 400 && obj.status !== 401 && obj.status !== 200 ){
                        responseDetail = "There was a network error"
                    }
                    this.setState({
                        response:obj.status,
                        responseDetail:responseDetail,
                        token:token,
                        refreshToken: refreshToken ? refreshToken:"",
                        loggedIn:loggedIn ? loggedIn:false,
                        tokenChecked: tokenChecked ? tokenChecked:false,
                        userName:userName ? userName:"Not logged in"
                    }, this.refreshTheToken(refreshToken))
                    this.props.reportStatus({loggedin:loggedIn, token:token})
                })
            }else{
                this.setState({
                    responseDetail:"Fill in both fields to login"
                })
            }
    }
    refreshTheToken(refreshToken){
        // call to use refresh token
        // extends logged in status of user
        const makeRequest = () => fetch(REFRESH_TOKEN, {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body:  `{"refresh": "${refreshToken}"}`
        })
        .then(response => response.json())
        .then(data => {
            this.setState({token:data.access, refreshToken:""})
        })
        makeRequest()
    }
    responseStatus(e){
        e.preventDefault()
        this.setState({
            seenotes:!this.state.seenotes
        })
    }
    handleChange({target:{name, value}}){
        this.setState({
            [name]:value
        })
    }
    postRequest(e){
        e.preventDefault()
        if(this.state.userName && this.state.password){
            this.setState({
                responseDetail:"Sending request..."
            },this.authLogin())
        }else{
            this.setState({
                responseDetail:"Fill in both fields"
            })
        }
    }
    render(){
        const logInProps={};
        const active_style = {};
        const buttonProps= {
            buttonclass: "navButton",
            id:"LogMeIn",
            active: false,
            style:active_style,
            callback:this.props.callBack,
            label:"Close"
        };
        const postRequest= {
            buttonclass: "navButton",
            id:"postRequest",
            active: false,
            style:active_style,
            callback:this.postRequest,
            label:"Send credentials"
        }

        return(
            <motion.div
                initial={false}
                className="drop-down-modal-cont"
                variants={slideDown}
                style={logInProps}
                animate={this.props.logMeIn ? "open":"closed"}
                >
                <div className="modal-content-block">
                    <div className="section-block text-center">
                        <p className="text-white rubik no-wrap">
                            Trouble logging in ?
                        </p>
                        <p className="text-white no-wrap">
                            Contact your admin.
                        </p>
                    </div>
                    <div className="input-div">
                        <input
                            type="text"
                            value={this.state.userName}
                            onChange={this.handleChange}
                            name="userName"
                            />
                    </div>
                    {
                        this.state.responseDetail ? (
                            <div className="section-block text-white text-center">
                                <p className="text-white rubik no-wrap">
                                    {this.state.responseDetail}
                                </p>
                            </div>
                        ):null
                    }
                    <div className="input-div">
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password"
                            />
                    </div>
                    <div className="submit-div">
                        <Button {...postRequest} />
                        <Button {...buttonProps} />
                    </div>
                </div>
            </motion.div>
        )
    }
}

export default LogIn
