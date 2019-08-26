import React, { Component } from 'react';

/* common props: src, width, height, resizeMode */
export default (props) => {
  const style = props.style || {};
  style.objectFit = props.resizeMode;
  return(
    <img
      src={props.src}
      style={props.style}
    />
  )
}

