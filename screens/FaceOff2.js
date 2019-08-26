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
  const imageHeight = .42 * screenHeight;
  const nameHeight = .06 * screenHeight;
  return (
    <View style={{ height: '100%', backgroundColor: 'black' }}>
      <View style={{height: '4%'}}>
        <Heading>{'Whose makeup do you prefer?'}</Heading>
      </View>
      <View style={{height: '6%'}}>
        <CelebrityName height={nameHeight} category={postOne.getTheCategory()} />
      </View>
      <View style={{height: '42%', zIndex: 1}}>
        <PostImage sizedImage={postOne.getTheFeaturedImage().getSize('large')} height={imageHeight} />
      </View>
      <View style={{width: '100%', height: 2, backgroundColor: 'white', justifyContent: 'center', 
    alignItems: 'center', zIndex: 2, marginVertical: .01 * screenHeight }}>
      <Circle radius={40} style={{backgroundColor: 'black', borderColor: 'white', borderWidth: 2}}><CelebrityNameText>OR</CelebrityNameText></Circle>
      </View>
      
      <View style={{height: '42%', zIndex: 1}}>
        <PostImage sizedImage={postTwo.getTheFeaturedImage().getSize('large')} height={imageHeight} />
      </View>
      <View style={{height: '6%'}}>
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
  text-align: center;
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