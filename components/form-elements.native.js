import React from 'react';
import {TextInput, Text} from 'react-native';

export const ManagedTextInput = (props) => {
    return (
      <>
      {props.hasOwnProperty('label') && 
        <Text>{props.label}</Text>}
      <TextInput {...props}/>
        </>
    )
};