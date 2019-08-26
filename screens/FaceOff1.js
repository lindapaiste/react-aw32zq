import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import styled from 'styled-components';
import WpPostObject from '../helpers/WpPost';
import Loading from '../components/loading';
import { MediaImage } from '../components/media';
import { FixedHeightImage, MaxSizeImage } from '../components/image';
import {Circle, TextInCircle} from '../components/styles';

export default ({ postOne, postTwo, onPress }) => {
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = .4 * screenHeight;
  const nameHeight = .06 * screenHeight;
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: .04 }}>
        <Heading>{'Whose makeup do you prefer?'}</Heading>
      </View>
      <View style={{ flex: .06 }}>
        <CelebrityName height={nameHeight} category={postOne.getTheCategory()} />
      </View>
      <View style={{ flex: .42 }}>
        <PostImage sizedImage={postOne.getTheFeaturedImage().getSize('large')} />
      </View>
      <View style={{ flex: .42 }}>
        <PostImage sizedImage={postTwo.getTheFeaturedImage().getSize('large')} />
      </View>
      <View style={{ flex: .06 }}>
        <CelebrityName height={nameHeight} category={postTwo.getTheCategory()} />
      </View>
    </View>
  )
}

const PostImage = ({ sizedImage }) => {
  return <Image source={{ uri: sizedImage.source_url }} style={{ width: undefined, height: undefined, flex: 1 }} resizeMode='contain' />
}

const Heading = styled.Text`
  color: white;
  font-style: italic;
  font-size: 20px;
`;

const CelebrityName = ({ category, height }) => {
  return (
      <CelebrityNameText fontSize={height}>
        {category.name}
      </CelebrityNameText>
  )
}

const CelebrityNameText = styled.Text`
  color: white;
  font-size: ${(props => .9 * props.fontSize || 40 )}px;
  font-weight: bold;
  text-align: center;
`;