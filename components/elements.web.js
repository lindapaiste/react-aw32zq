import React from 'react';
import styled from 'styled-components';

export const View = (props) => MyDiv(props);

export const Wrapper = (props) => MyDiv(props);

export const Text = (props) => MyDiv(props);

export const Span = (props) => {
  return <span {...props}>{props.children}</span>;
}

const MyDiv = (props) => {
  return (
    <div {...props}>
      {props.children}
    </div>
  )
}