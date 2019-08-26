import React, { Component } from 'react';
import WpJsonItemContainer from '../containers/WpJsonItemContainer';
import styled from 'styled-components';

import {MaxSizeImage, FixedSizeImage, FixedWidthImage, FixedHeightImage, CircularImage} from './ImageSizes';

//good stuff -- sizes image and passes off to image.js

export const MediaImage = ({object, width}) => {
  return FixedWidthMedia({object, width});
};

export const FixedWidthMedia = ({object, width}) => {
  let image = object.getSizeByWidth( width );
  return FixedWidthImage({image, width});
}

export const FixedHeightMedia = ({object, height}) => {
  let image = object.getSizeByHeight( height );
  return FixedHeightImage({image, height});
}

export const FixedSizeMedia = ({object, width, height}) => {
  let image = object.getSizeByDimensions( width, height );
  return FixedSizeImage({image, width, height});
}

export const MaxSizeMedia = ({object, width, height}) => {
  //returns the full size when width and height are undefined
  let image = object.getSizeByDimensions( width, height );
  return MaxSizeImage({image, width, height});
}

export const CircularMedia = ({object, width}) => {
  let image = object.getSizeByDimensions( width, width );
  return CircularImage({image, width});
}

//------------------------old stuff


/*
export const Img = (props) => {
  return (
    <Image
      source={{ uri: props.src }}
      style={{
        width: props.width,
        height: props.height,
      }}
      resizeMode={'center'}
      accessibilityLabel={props.title || props.alt}
    />
  );
};

//style={{flex:1, height: undefined, width: undefined}}

const FitImg = styled(Img)`
  border: 1px solid red;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`;

const MediaContainer = props => {
  return (
    <WpJsonItemContainer endpoint="media" id={props.id} render={props.render} />
  );
};

export const SizedMediaImage = ({json}) => {
  return (
    <StyledImage
      source={{uri:json.source_url}}
      style={{width: json.width, height: json.height}}
    />
  )
};



const StyledImage = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;



export const ContainedSizeImage = ({src, width, height}) => {
  return (
    <Image
      source={{uri:src}}
      style={{width, height}}
      resizeMode='contain'
    />
  )
};

export const FullWidthImage = ({src, height}) => {
  return (
    <Image
      source={{uri:src}}
      style={{width: undefined, height: height, flex:1}}
      resizeMode='contain'
    />
  )
};

export const FullSizeImage = ({src}) => {
  return (
    <Image
      source={{uri:src}}
      style={{width: undefined, height: undefined, flex:1}}
      resizeMode='contain'
    />
  )
};
*/