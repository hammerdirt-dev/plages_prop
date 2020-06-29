import React, {Component} from 'react'
import '../../shared/css/grids.css'
import '../../shared/css/main.css'
import '../../shared/css/blocks.css'
import Button from '../../shared/components/button/buttons'


class ServerReplyModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            seeModal:false,
        }
    }
    componentDidMount(){
        this._isMounted = true
    }
    componentDidUpdate(prevProps, prevState){
        console.log("surveys received some new props")
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render(){
        const dimsResponse = () => {
            if(this.props.dimsDataResponse && this.props.dimsDataResponse.ok){
                var message = "Dimensional data saved to server"
            }else if(this.props.dimsDataResponse && !this.props.dimsDataResponse.ok){
                if(this.props.dimsDataResponse.status === 401){
                    message = "Request refused. try logging in again."
                }else if(this.props.dimsDataResponse.status === 500){
                    message = "There was a server error, is this a duplicate record?"
                }else{
                    message = "There was an undefined error, make sure to save to local"}
            }else{
                message = "Dims data not sent to server"
            }
            return message
        }
        const surveyResponse = () => {
            if(this.props.surveyDataResponse && this.props.surveyDataResponse.ok){
                var message = "Object data saved to server"
            }else if(this.props.surveyDataResponse && !this.props.surveyDataResponse.ok){
                if(this.props.surveyDataResponse.status === 401){
                    message = "Request refused. try logging in again."
                 }else if(this.props.surveyDataResponse.status === 500){
                    message = "There was a server error, is this a duplicate record?"
                }else{
                    message = "There was an undefined error, make sure to save to local"
                }
            }else{
                message = "Object data not sent to server"
            }
            return message
        }
        const indexedResponse = () => {
            var message;
            if(this.props.postToLocal){
                message = this.props.postToLocal

            }else{
                message = "Not saved locally"
            }
            return message



        }

        const saveForLater = () => {
            if(this.props.surveyDataResponse && this.props.dimsDataResponse){
                if(!this.props.surveyDataResponse.ok || !this.props.dimsDataResponse.ok){
                    return (

                            <p>
                                If logging in doesn't help, save to local and contact admin.
                            </p>
                        )
                    }
                }
            }
        return(

            <div className="modal-column-full-width pad-one-rem">
                <div className="pad-one-rem border-all-gray">
                    <h6 className="no-wrap">
                        Processing the request...
                    </h6>
                </div>
                <p>
                <strong>Dimensional data: &nbsp;</strong>
                {
                    dimsResponse()
                }
                </p>
                <p>
                <strong>Survey data: &nbsp;</strong>
                {
                    surveyResponse()
                }
                </p>
                <p>
                <strong>Local copy: &nbsp;</strong>
                {
                    indexedResponse()
                }
                </p>
                {
                    saveForLater()
                }
                <div className="submit-div">
                    <Button
                        buttonclass="formButton"
                        id="seeMe"
                        value="seeMe"
                        callback={this.props.callback}
                        label="Close"
                    />

                </div>
            </div>
        )
    }

}

export default ServerReplyModal
