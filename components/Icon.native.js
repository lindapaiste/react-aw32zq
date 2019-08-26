import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

//------------------------HELPER BUTTONS-------------------//

export const IconButton = (props) => {
  return (
    <Button {...props}>
      <FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />
    </Button>
  )
}

export const ZoomOutButton = (props) => {
  return (
    <IconButton {...props} icon={faSearchMinus} />
  )
};

export const ZoomInButton = (props) => {
  return (
    <IconButton {...props} icon={faSearchPlus} />
  );
};