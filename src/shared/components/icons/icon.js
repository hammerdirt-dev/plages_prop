import React from 'react';
import {ICONS} from './twoIcons'

const Icon = props => {
  return (
    <svg
      style={props.styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 1096 1096"
    >
      <path
        style={props.styles.path}
        d={props.icon}
      ></path>
    </svg>
  );
};


export default Icon;
