import React from 'react';

export default (props) => {
  return (
    <button onClick={props.onPress || props.onClick} {...props}>
      {props.children}
    </button>
  )
}