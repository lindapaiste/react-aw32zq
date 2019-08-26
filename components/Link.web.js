import React from 'react';

export default (props) => {
  return(
    <a href={props.link}>
      {props.children}
    </a>
  )
}