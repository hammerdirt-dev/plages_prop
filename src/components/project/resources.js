import React, {Component} from 'react'
import {motion} from 'framer-motion'
import {slideIn} from '../../shared/utilities/framer/variants'
import '../../shared/css/grids.css'
import '../../shared/css/header.css'
import '../../shared/css/main.css'
import asl from '../../shared/images/asl.png'
import epfl from '../../shared/images/epfl.png'
import hackuarium from '../../shared/images/hackuarium.jpg'
import summit from '../../shared/images/summit.png'
import precious from '../../shared/images/precious.jpg'
import unige_rose from '../../shared/images/unige_rose.jpg'
import {truncate} from '../../shared/utilities/jsHelper/helperMethods'
import hammerdirt2 from '../../shared/images/hammerdirt2.png'
import dev_guy225 from '../../shared/images/dev_guy225.jpg'
import shannon from '../../shared/images/shannon.jpg'
import profile_hk from '../../shared/images/profile_hk.jpg'
import ecoleint from '../../shared/images/ecoleint.jpg'

class Resources extends Component{
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
    showEvent(e){
        e.preventDefault()
    }

    render(){
      const associations = [
        {
          name:"Association pour la sauvegarde du Léman",
          image:asl,
          link:"https://asleman.org/",
          function:"Surveyors"
        },{
          name:"Precious plastic Léman",
          image:precious,
          link:"https://preciousplasticleman.ch/",
          function:"Surveyors"
        },{
          name:"Summit foundation",
          image:summit,
          link:"https://www.summit-foundation.org/en/",
          function:"Mountain surveyors"
        },{
          name:"Hackuarium",
          image:hackuarium,
          link:"http://wiki.hackuarium.ch/w/Main_Page",
          function:"Surveyors, microscopy"
        },{
          name:"Ecole International de Genève",
          image:ecoleint,
          link:"https://www.ecolint.ch/beyond-classroom/stem-centre",
          function:"Surveyors"
        }, {
          name:"Université de Genève",
          image:unige_rose,
          link:"https://www.unige.ch/forel/en/",
          function:"XRF spectromtery",
        },
        {
          name:"École polytechnique fédérale",
          image:epfl,
          link:"https://www.epfl.ch/labs/gr-cel/staff/",
          function:"FTIR spectroscopy"
        }

      ]
      const openAccess = [
        {
          name:"numpy",
          use:"N-dimensional arrays",
          link:"https://numpy.org/index.html",
          language:"python"
        },
        {
          name:"matplotlib",
          use:"Static data visualisations",
          link:"https://matplotlib.org/",
          language:"python",
        },
        {
          name:"scipy.stats",
          use:"Probability distributions",
          link:"https://docs.scipy.org/doc/scipy/reference/stats.html",
          language:"python"
        },
        {
          name:"pandas",
          use:"Data analysis",
          link:"https://pandas.pydata.org/",
          language:"python",
        },
        {
          name:"jupyter",
          use:"Developing and documenting code",
          link:"https://jupyter.org/",
          language:"python"
        },
        {
          name:"django",
          use:"Web framework",
          link:"https://www.djangoproject.com/",
          language:"python"
        },
        {
          name:"djangoREST",
          use:"REST api framework",
          link:"https://qgis.org/en/site/index.html",
          language:"python",
        },
        {
          name:"QGIS",
          use:"Geographic information system",
          link:"https://www.django-rest-framework.org/",
          language:"python",
        },
        {
          name:"MySQL",
          use:"Structured database",
          link:"https://www.mysql.com/",
          language:"SQL"
        },
        {
          name:"git",
          use:"Version control",
          link:"https://git-scm.com/",
          language:"n/a"
        },
        {
          name:"GitHub",
          use:"Collaboration and remote access",
          link:"https://github.com/",
          language:"n/a"
        },
        {
          name:"npm",
          use:"Package manager for JS apps",
          link:"https://www.npmjs.com/",
          language:"JavaScript",
        },
        {
          name:"ReactJS",
          use:"Developing UI",
          link:"https://reactjs.org/",
          language:"JavaScript",
        },
        {
          name:"FramerMotion",
          use:"UI animation",
          link:"https://www.framer.com/motion/",
          language:"JavaScript",
        },
        {
          name:"Highcharts",
          use:"Interactive charts for web apps",
          link:"https://www.highcharts.com/",
          language:"JavaScript",
        },
        {
          name:"Leaflet",
          use:"Maps for web apps",
          link:"https://leafletjs.com/",
          language:"JavaScript",
        },
        {
          name:"indexedDB",
          use:"Client side data storage",
          link:"https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API",
          language:"JavaScript",
        },
        {
          name:"Simple Statistics",
          use:"Client side statistical methods",
          link:"https://simplestatistics.org/",
          language:"JavaScript",
        },
        {
          name:"tinyMCE",
          use:"Client side text editing",
          link:"https://www.tiny.cloud/",
          language:"JavaScript",
        },
      ]
        return(
            <motion.div
                className="outer-row"
                initial="closed"
                animate="open"
                exit="closed"
                variants={slideIn}
                >
                <div className="column-full-width background-white">
                <div className="block-row">
                  <div className="orgsUnis">
                    Project management, field operations and application development:
                  </div>
                </div>
                  <div className="block-row-single">
                      <div className="inline-block-25-single border-light-gray">
                        <div className="flexCard70">
                            <img src={hammerdirt2} alt="hammerdirt everyday" />
                            <div className="address-block">
                              Brügstrasse, 39 <br/>
                              2503, Biel<br/>
                              Switzerland<br/>
                              +41 76-699-06-16<br/>
                              info@hammerdirt.ch<br/><br/>
                            </div>
                            <div className="address-block">
                            <a href="https://www.hammerdirt.ch" rel="noopener noreferrer" target="_blank">www.hammerdirt.ch</a>
                            </div>
                        </div>
                      </div>
                      <div className="inline-block-25-single">
                        <div className="flexCard70">
                          <div className="profile-pic">
                            <img src={dev_guy225} alt="hammerdirt everyday" />
                          </div>
                          <div className="address-block">
                            Roger Erismann<br/>
                            hammerdirt staff<br/>
                            App dev, data analysis<br/>
                            Surveyor<br />
                            roger@hammerdirt.ch<br/><br/>
                          </div>
                        </div>
                      </div>
                      <div className="inline-block-25-single">
                        <div className="flexCard70">
                          <div className="profile-pic">
                            <img src={shannon} alt="hammerdirt everyday" />
                          </div>
                          <div className="address-block">
                            Shannon Erismann<br/>
                            hammerdirt staff<br/>
                            Field operations<br/>
                            Surveyor<br />
                            shannon@hammerdirt.ch<br/><br/>
                          </div>
                        </div>
                      </div>
                      <div className="inline-block-25-single">
                      <div className="flexCard70">
                        <div className="profile-pic">
                          <img src={profile_hk} alt="hammerdirt everyday" />
                        </div>
                        <div className="address-block">
                          Helen Kurukulasuriya<br/>
                          hammerdirt staff<br/>
                          Translations<br/>
                          Surveyor<br />
                          info@hammerdirt.ch<br/><br/>
                        </div>
                      </div>

                      </div>
                  </div>
                    <div className="block-row">
                      <div className="orgsUnis">
                        Participating organizations and universities:
                      </div>
                    </div>
                  <div className="block-row-stretch">
                      {
                        associations.map(obj => {
                          return (
                            <div key={obj.name} className="inline-block-25-flex border-light-gray">
                              <div className="flexCard">
                                <div className="flexCardTitle">
                                  {obj.name}
                                </div>
                                <div className="cardImage">
                                  <img src={obj.image} alt={`logo of ${obj.name}`} />
                                </div>
                                <div className="flexCardFunction">
                                  {obj.function}
                                </div>
                                <div className="flexCardLink">
                                  <a href={obj.link} rel="noopener noreferrer" target="_blank">{truncate(obj.name, 2)}</a>
                                </div>
                              </div>
                            </div>
                          )}
                          )
                      }
                  </div>

                  <div className="block-row">
                  <div className="orgsUnis">
                    Tools, open access and open source:
                  </div>
                  </div>
                  <div className="acc-row">
                  {
                    openAccess.map(obj =>{
                      return(
                        <div key={obj.name} className="inline-block-mini border-light-gray">
                          <div className="flexCard">
                            <div className="miniFlexTitle">
                              {obj.name}
                            </div>
                            <div className="flexCardFunction">
                              {obj.use}
                            </div>
                            <div className="flexCardFunction">
                              {obj.language}
                            </div>
                            <div className="flexCardLink">
                              <a href={obj.link} rel="noopener noreferrer" target="_blank">{truncate(obj.name, 1)}</a>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  </div>
                  <div className="block-row">
                      <div className="inline-block-50-left">
                          <h6 className="border-bottom">Special thanks to:</h6>
                          <p className="pad-point3-rem">
                            Prof. Christian Ludwig
                          </p>
                          <p className="pad-point3-rem">
                            Dr. Bhavish Patel
                          </p>
                          <p className="pad-point3-rem">
                            Mr. Marcel Regamey
                          </p>
                          <p className="pad-point3-rem">
                            Mme. Michelet
                          </p>
                          <p className="pad-point3-rem">
                            Your support was an integral part of the realization of this project.
                          </p>
                      </div>
                      <div className="inline-block-50-center">
                        Questions comments ? contact roger or shannon
                      </div>
                  </div>

                </div>
            </motion.div>
        )
    }
}

export default Resources
