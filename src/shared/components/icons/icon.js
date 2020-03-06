import React from 'react';
import {ICONS} from './allIcons'

export const Icon = props => {
  return (
    <svg
      style={props.styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 1200 1200"
    >
      <path
        style={props.styles.path}
        d={props.icon}
      ></path>
    </svg>
  );
};

export const AnonUser = (props) => {
    const iconProps = {
        icon: ICONS.locked,
        size :props.size,
        styles:{
            svg:{
                display: 'inline-block',
                verticalAlign: 'middle',
            },
            path: {
              fill: props.color,
            }
        }
    }
    return <Icon {...iconProps} />
}

export const RegUser = (props) => {
    const iconProps = {
        icon: ICONS.unlocked,
        size :props.size,
        styles:{
            svg:{
                display: 'inline-block',
                verticalAlign: 'middle',
            },
            path: {
              fill: props.color,
            }
        }
    }
    return <Icon {...iconProps} />
}
export const ServerStatus = (props) => {
    const iconProps = {
        icon: ICONS.connection,
        size :props.size,
        styles:{
            svg:{
                display: 'inline-block',
                verticalAlign: 'middle',
            },
            path: {
              fill: props.color,
            }
        }
    }
    return <Icon {...iconProps} />
}
export const DbStatus = (props) => {
    const iconProps = {
        icon: ICONS.download,
        size :props.size,
        styles:{
            svg:{
                display: 'inline-block',
                verticalAlign: 'middle',
            },
            path: {
              fill: props.color,
            }
        }
    }
    return <Icon {...iconProps} />
}
export const Love = (props) => {
    const iconProps = {
        icon: ICONS.love,
        size :props.size,
        styles:{
            svg:{
                display: 'inline-block',
                verticalAlign: 'middle',
            },
            path: {
              fill: props.color,
            }
        }
    }
    return <Icon {...iconProps} />
}
// network:false,
// indexed:false,
// indexedData:false,
// console.log(this.props)
