import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import { FixedSizeView } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';



//------------------------SINGLE IMAGE STYLES-------------------//

export const MaxSizeImage = ({ sizedImage, width, height }) => {
  return (
    <ScaledImage
      sizedImage={sizedImage}
      scale={sizedImage.calculateScale(width, height)}
    />
  );
};

export const ScaledImage = ({ sizedImage, scale }) => {
  return (
    <Image
      source={{ uri: sizedImage.source_url }}
      style={{
        width: scale * sizedImage.width,
        height: scale * sizedImage.height,
      }}
      resizeMode="contain"
    />
  );
};

export const CroppedImage = ({ sizedImage, rectangle, scale = 1 }) => {
  return (
    <View
      style={{
        width: rectangle.width * scale,
        height: rectangle.height * scale,
        overflow: 'hidden',
      }}>
      <Image
        source={{ uri: sizedImage.source_url }}
        style={{
          width: sizedImage.width * scale,
          height: sizedImage.height * scale,
          transform: [
            { translateX: -1 * rectangle.x * scale },
            { translateY: -1 * rectangle.y * scale },
          ],
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export const CroppedToOutfit = ({ sizedImage, scale }) => {
  const rectangle = {
    x: 0,
    y: 0,
    width: 175,
    height: 500
  }
  return (
    <CroppedImage sizedImage={sizedImage} rectangle={rectangle} scale={scale} /> 
  );
};

export const ShrunkImage = ({ sizedImage, rectangle }) => {
  return (
    <Image
      source={{ uri: sizedImage.source_url }}
      style={{
        width: rectangle.width,
        height: rectangle.height,
      }}
      resizeMode="contain"
    />
  );
};

export const FixedSizeImage = ({ sizedImage, width, height }) => {
  return (
    <Image
      source={{ uri: sizedImage.source_url }}
      style={{
        width,
        height
      }}
      resizeMode="cover"
    />
  );
};

export const FixedHeightImage = ({ sizedImage, height, resizeMode}) => {
  return (
    <Image
      source={{ uri: sizedImage.source_url }}
      style={{
        width: sizedImage.getScaledWidth(height),
        height
      }}
      resizeMode={resizeMode || 'contain'}
    />
  );
};

export const FixedWidthImage = ({ sizedImage, width, resizeMode}) => {
  return (
    <Image
      source={{ uri: sizedImage.source_url }}
      style={{
        width,
        height: sizedImage.getScaledHeight(width)
      }}
      resizeMode={resizeMode || 'contain'}
    />
  );
};

//------------------------HELPER FUNCTIONS-------------------//
/*
function calculateScale(sizedImage, width, height) {
  const maxWidth = width || Dimensions.get('window').width;
  const maxHeight = height || Dimensions.get('window').height;
  return Math.min(maxWidth / sizedImage.width, maxHeight / sizedImage.height);
}

function getScaledHeight(sizedImage, width) {
  const scale = width / sizedImage.width;
  return scale * sizedImage.height;
}

function getScaledWidth(sizedImage, height) {
  const scale = height / sizedImage.height;
  return scale * sizedImage.width;
}
*/
//------------------------HELPER BUTTONS-------------------//
/*
const ZoomOutButton = ({ size, color, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <FontAwesomeIcon icon={faSearchMinus} size={size} color={color} />
    </TouchableHighlight>
  );
};

const ZoomInButton = ({ size, color, onPress }) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <FontAwesomeIcon icon={faSearchPlus} size={size} color={color} />
    </TouchableHighlight>
  );
};
*/