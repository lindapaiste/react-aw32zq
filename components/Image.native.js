import React, { Component } from 'react';
import { Image } from 'react-native';

/* common props: src, width, height, resizeMode */
export default (props) => {
  const style = props.style || {};
  style.width = props.width;
  style.height = props.height;
  return(
    <Image
      source={{ uri: props.src }}
      style={style}
      resizeMode={props.resizeMode}
    />
  )
}

