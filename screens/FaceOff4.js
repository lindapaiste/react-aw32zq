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
  const imageHeight = .43 * screenHeight;
  const nameHeight = .06 * screenHeight;
  return (
    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <View style={{height: '4%'}}>
        <Heading>{'Whose makeup do you prefer?'}</Heading>
      </View>
      <NameWrapper height={nameHeight} >
        <CelebrityName height={nameHeight} category={postOne.getTheCategory()} />
      </NameWrapper>
      <View style={{height: imageHeight, width: imageHeight, alignSelf: 'center', zIndex: 1, borderRadius: .075 * imageHeight, borderWidth: 1, borderColor: '#CCC', overflow: 'hidden' }}>
        <PostImage sizedImage={postOne.getTheFeaturedImage().getSize('large')} height={imageHeight} />
      </View>
      <NameWrapper height={nameHeight} transform={[{translateY: -.25 * nameHeight }]}>
          <CelebrityNameText height={nameHeight}>OR</CelebrityNameText>
        </NameWrapper>
      <View style={{height: imageHeight, width: imageHeight, alignSelf: 'center', zIndex: 1, borderRadius: .075 * imageHeight, borderWidth: 1, borderColor: '#CCC', overflow: 'hidden' }}>
        <PostImage sizedImage={postTwo.getTheFeaturedImage().getSize('large')} height={imageHeight} />
      </View>
      <NameWrapper height={nameHeight} transform={[{translateY: -.5 * nameHeight }]}>
        <CelebrityName height={nameHeight} category={postTwo.getTheCategory()} />
      </NameWrapper>
    </View>
  )
}

const NameWrapper = ({height, transform, children}) => {
  return (
    <View style={{height: .5 * height, alignSelf: 'center', zIndex: 2}} transform={transform}>
      <View style={{height: height}}>
        {children}
        </View>
      </View>
  )
}

const PostImage = ({ sizedImage }) => {
  return <Image source={{ uri: sizedImage.source_url }} style={{ width: undefined, height: undefined, flex: 1, overflow: 'hidden' }} resizeMode='contain' />
}

const Heading = styled.Text`
  color: black;
  font-style: italic;
  font-size: 20px;
  text-align: center;
`;

const CelebrityName = ({ category, height }) => {
  return (
      <CelebrityNameText height={height}>
        {category.name}
      </CelebrityNameText>
  )
}

const CelebrityNameText = styled.Text`
  color: black;
  font-size: ${(props => .5 * props.height || 40 )}px;
  font-weight: bold;
  text-align: center;
  background: #DDD;
  padding: 5px 10px;
  border-radius: 5px;
`;
