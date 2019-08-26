import React from 'react';
import { View, Text } from './elements';
import Button from './Button';
import styled from 'styled-components';

export const FixedSizeView = styled(View)`
  width: ${propns=> props.width}px;
  height: ${props => props.height}px;
  background: gray;
  overflow: hidden;
`;

export const TranslatedView = styled(View)`
  transform: translate(
    ${props => props.translateX}px, 
    ${props => props.translateY}px
  );
`

export const WidthContainer = styled(View)`
  width: ${props => props.width}px;
`;

export const TextInCircle = ({ radius, fontSize}) => styled(View)`
`;

export const Circle = (props) => {
  const style = {
    justifyContent: 'center', 
    alignItems: 'center',
    width: 2 * props.radius,
    height: 2 * props.radius,
    borderRadius: props.radius,
  }
  const propStyle = props.style || {};
  return (
    <View {...props} style={{...propStyle, ...style}}>
      {props.children}
    </View>
  )
}

export const CircleStyle = styled(View)`
  width: ${(props => 2 * props.radius)}px;
  height: ${(props => 2 * props.radius)}px;
  border-radius:${(props => props.radius)}px;
  vertical-align: middle;
  display: table-cell;
  text-align:center;
`;

const CircleInnerText = styled(View)`
`;

export const StyledButton = styled(Button)`
  color: white;
  background: black;
  border-radius: 5px;
  padding: 5px;
`;

/*
export const TextButton = (props) => {
  return (
    <StyledButton {...props}><Text>{props.children}</Text></StyledButton>
)
}*/