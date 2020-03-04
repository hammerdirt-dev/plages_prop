export const slideDown = {
    open:{
        height:"100%",
        width:"100%",
        zIndex:1,
        transition:{
            duration:.3,
        }
    },
    closed:{
        height:0,
        width:0,
        transitionEnd:{
            zIndex:"-1",
            overflow:"hidden",
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


        transition:{
            duration:.1,
        }
    },
    closed:{
        height:0,
        opacity:0,

        transitionEnd:{
            overflow:"hidden",
        },
        transition:{
            duration:.1,
        }
    }
}
