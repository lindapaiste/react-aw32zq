import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = (props) => {
  return (
    <View {...props}>
      {props.children}
    </View>
  )
}

export const MyText = styled.Text``;

export const Span = styled.Text``;

export const MyImage = styled.Image``;

export const FixedSizeView = styled.View`
width: ${props => props.width}px;
height: ${props => props.width}px;
        overflow: hidden;
`;

export {View, Text} from 'react-native';