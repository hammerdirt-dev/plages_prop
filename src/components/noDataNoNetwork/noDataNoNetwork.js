import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'

class NoDataNoNetwork extends Component{
    constructor(props){
        super(props);
        this.state = {

        }

    }
    componentDidMount(){
        this._isMounted = true
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    componentDidUpdate(prevProps, prevState){

    }

    render(){

        return(

                <motion.div
                    className="motion-cont"
                    initial="open"
                    exit="closed"
                    variants={slideIn}
                    >

                    <motion.div
                        className="outer-row"
                        animate="open"
                        exit="closed"
                        variants={slideIn}
                        >
                        <div className="column-full-width" >
                        <div className="align-self">
                          <h6>Access to indexedDB is denied</h6>
                          <p>
                            The application has no access to the database. Without this the application will not function off-line or on-line.
                          </p>
                          <h6>What database?</h6>
                          <p>
                            IndexedDB is a database that is included in modern browsers. It allows us to store data that can be used by our apllication. IndexedDB has
                            been in use for quite some time.
                          </p>
                          <h6>Why do we need indexedDB ?</h6>
                          <p>
                            Using indexedDB reduces network traffic and makes the application run faster on your device. Furthermore it allows the apllication to function offline and it allows surveyors
                            to store their work on the device and get back to it later.
                          </p>
                          <h6>How to fix this?</h6>
                          <ul>
                          <li>When prompted, allow the use of persistent sotrage.</li>
                          <li>Click/press on the "Update data" button after closing and opening the browser.</li>
                          <li>Close the browser entirely, all tabs.</li>
                          <li>Reopen the browser, update data one more time.</li>
                          <li>You should be good to go.</li>
                          </ul>
                          <p>
                            You can read about indexedDB here <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" rel="noopener noreferrer" target="_blank"> Mozilla Developers </a>.
                          </p>
                          <p>
                            The only data stored on your device is the data from litter surveys. We do not collect any information about users of this application.
                          </p>
                          <p>
                            If you have any more questions contact dev at hammeridrt.ch
                          </p>

                        </div>



                        </div>
                    </motion.div>
                </motion.div>
            )
    }
}

export default  NoDataNoNetwork
