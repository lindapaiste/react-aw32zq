import React from 'react';
import Button from './Button';
import {Text} from 'react-native';

export const TextButton = (props) => {
  return (
    <Button {...props}>
      <Text>{props.children}</Text>
    </Button>
  )
}