import React from 'react';
import { FixedSizeView, TranslatedView } from './styles';
import Image from './Image';
import styled from 'styled-components';

//------------------------SINGLE IMAGE STYLES-------------------//

//ALL STYLES EXPECT IMAGE TO BE A image OBJECT WITH WIDTH, HEIGHT, AND SOURCE_URL

export const SizedImage = ({image}) => {
  return ScaledImage({ image, scale: 1 });
}

export const MaxSizeImage = ({ image, width, height }) => {
  return (
    <ScaledImage
      image={image}
      scale={image.calculateScale(width, height)}
    />
  );
};

export const ScaledImage = ({ image, scale }) => {
  return (
    <Image
      src={image.source_url}
      width={scale * image.width}
      height={scale * image.height}
      resizeMode="contain"
    />
  );
};

export const CroppedImage = ({ image, rectangle, scale = 1 }) => {
  return (
    <FixedSizeView
      width={rectangle.width * scale}
      height={rectangle.height * scale}>
      <TranslatedView
        translateX={ -1 * rectangle.x1 * scale }
        translateY={ -1 * rectangle.y1 * scale }
      >
      <FixedSizeImage
        image={image}
        width={image.width * scale}
        height={image.height * scale}
      />
      </TranslatedView>
    </FixedSizeView>
  );
};
//TODO: does transform work the same way on web?
/*const StyledTranslateImage = styled(Image)`
  transform: translate(
    ${props => props.translateX || '0'}px, 
    ${props => props.translateY || '0'}px
  );
`;
*/
/*
export const TranslatedImage = ({image, translateX, translateY}) => {
  return (
          <TranslatedView
        translateX={ -100 }
        translateY={ -100 }
      >
      <FixedSizeImage
        image={image}
        width={image.width}
        height={image.height}
      />
      </TranslatedView>
  )
}
*/

export const CroppedToOutfit = ({ image, scale }) => {
  const rectangle = {
    x: 0,
    y: 0,
    width: 175,
    height: 500,
  };
  return (
    <CroppedImage image={image} rectangle={rectangle} scale={scale} />
  );
};

export const ShrunkImage = ({ image, rectangle }) => {
  return (
    <Image
      src={image.source_url}
      width={rectangle.width}
      height={rectangle.height}
      resizeMode="contain"
    />
  );
};

export const FixedSizeImage = ({ image, width, height }) => {
  console.log({ image, width, height });
  return (
    <Image
      src={image.source_url}
      width={width}
      height={height}
      resizeMode="cover"
    />
  );
};

export const FixedHeightImage = ({ image, height, resizeMode }) => {
  return (
    <Image
      src={image.source_url}
      width={image.getScaledWidth(height)}
      height={height}
      resizeMode={resizeMode || 'contain'}
    />
  );
};

export const FixedWidthImage = ({ image, width, resizeMode }) => {
  return (
    <Image
      src={image.source_url}
      width={width}
      height={image.getScaledHeight(width)}
      resizeMode={resizeMode || 'contain'}
    />
  );
};

const StyledCircularImage = styled(FixedSizeImage)`
  border-radius: ${props => props.width/2}px;
`;

export const CircularImage = ({ image, width }) => {
  return StyledCircularImage({image, width, height: width});
};

export const SquareImage = ({ image, width }) => {
  return FixedSizeImage({image, width, height: width});
};