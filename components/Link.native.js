import React from 'react';
import { TouchableHighlight } from 'react-native';

export default (props) => {
  return(
    <TouchableHighlight>
      {props.children}
    </TouchableHighlight>
  )
}