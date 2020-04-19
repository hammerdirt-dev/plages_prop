export const slideDown = {
    open:{
        height:"100%",
        width:"100%",
        zIndex:1,
        // padding:"1rem",
        transition:{
            duration:.3,
        }
    },
    closed:{
        height:0,
        width:0,
        padding:0,
        overflow:"hidden",
        transitionEnd:{
            zIndex:"-1",

        },
        transition:{
            duration:.3,
        }
    }
}
export const slideDownAuto={
    open:{
        height:"auto",
        width:"auto",
        // border:"thin solid #091c1c",
        opacity:1,
        transition:{
            duration:.3,
        },
        transitionEnd:{
            // marginTop:"1rem",
        },
    },
    closed:{
        height:0,
        width:0,
        // border:'none',
        opacity:0,
        transitionEnd:{
            overflow:"hidden",
            // marginTop:"1rem",
        },
        transition:{
            duration:.3,
        }
    }

}
export const slideIn = {
    open:{
        x:0,
        backgroundColor: "#d5dfed",
        transition:{
            duration:.3
        }
    },
    closed:{
        x:"+100%",
        top:0,
        transitionEnd:{
            x:"-100%"
        },
        transition:{
            duration:.3       }
    }
}

export const openClose = {
    open:{
        height:"auto",
        opacity:1,
        width:"100%",
        transitionEnd:{
            overflow:"visible",
        },
        transition:{
            delayChildren:.1,
            staggerChildren:.1,
            duration:.2,        }
    },
    closed:{
        height:0,
        opacity:0,
        width:"100%",
        transitionEnd:{
            overflow:"hidden",
        },
        transition:{
            delayChildren:.1,
            staggerChildren:.1,
            duration:.2,
        }
    }
}

export const openCloseChildren= {
    open:{
        height:"auto",
        opacity:1,
        width:"100%",
        transitionEnd:{
            overflow:"visible",
        },
        transition:{
            duration:.5,
        }
    },
    closed:{
        height:0,
        opacity:0,
        width:0,
        transitionEnd:{
            overflow:"hidden",
        },
        transition:{
            duration:.1,
        }
    }
}
