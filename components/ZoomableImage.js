import React, {Component} from 'react';
import {} from './Image';
import {ZoomInButton, ZoomOutButton} from './Icon';
import {getWindow} from '../helpers/Dimensions';
import {calculateScale, getScaledHeight} from '../helpers/image-math';

//------------------------ZOOM IN/OUT SWITCHING-------------------//

class ZoomableImage extends React.Component {
  constructor() {
    super();
    this.state = {
      isZoomed: true,
      //scale: calculateScale( this.props.sizedImage, this.props.width, this.props.height ) //doing this here avoids recalculation
    };
  }
  toggleZoom = () => {
    this.setState(prevState => ({ isZoomed: !prevState.isZoomed }));
  };
  render() {
    return this.props.render({
      props: this.props,
      isZoomed: this.state.isZoomed,
      toggleZoom: this.toggleZoom,
    });
  }
}

export const ZoomableOverlayImage = props => {
  return <ZoomableImage {...props} render={ZoomOverlayImage} />;
};

export const ZoomableCroppedImage = (props) => {
  return <ZoomableImage {...props} render={RenderZoomableCroppedImage} />;
};

//------------------------ZOOM IN/OUT RENDERERS-------------------//

const RenderZoomableCroppedImage = ({ props, isZoomed, toggleZoom }) => {
  //do not scale at all unless either width or height is set
  let rectangleScale = 1;
  if (props.width || props.height) {
      rectangleScale = calculateScale(
        props.rectangle,
        props.width,
        props.height
      );
    }
    return (
      <TouchableOpacity onPress={toggleZoom}>
        {isZoomed && (
          <CroppedImage {...props} scale={rectangleScale} />
        )}
        {!isZoomed && props.preserveDimensions && (
          <ShrunkImage
            {...props}
            rectangle={props.rectangle
              .clone()
              .scale(rectangleScale)}
          />
        )}
        {!isZoomed && !props.preserveDimensions && (
          <MaxSizeImage {...props} />
        )}
      </TouchableOpacity>
    )
}

//render method for zoomable image class
const ZoomOverlayImage = ({ props, isZoomed, toggleZoom }) => {
  let { sizedImage, rectangle, width, height } = props;
  //if width is not set, use the screen width
  width = width || getWindow().width;
  //if height is not set, determine based on aspect ratio
  height = height || getScaledHeight(sizedImage, width);
  //scale up the zoom so that it fills 80% on the maximum dimension
  const zoomScale = calculateScale(rectangle, width * 0.8, height * 0.8);
  //center the zoom on the image
  const xMargin = (width - zoomScale * rectangle.width) / 2;
  const yMargin = (height - zoomScale * rectangle.height) / 2;
  const iconSize = 30;
  return (
    <View
      style={{
        width,
        height,
        overflow: 'hidden',
        backgroundColor: 'black',
      }}>
      <Image
        source={{ uri: sizedImage.source_url }}
        style={{
          width,
          height,
          opacity: isZoomed ? 0.75 : 1,
        }}
        resizeMode="cover"
      />
      {isZoomed && (
        <View
          style={{
            width: rectangle.width * zoomScale,
            height: rectangle.height * zoomScale,
            transform: [
              { translateX: xMargin },
              { translateY: yMargin - height },
            ],
            //borderStyle: 'dotted',
            //borderColor: 'black',
            //borderWidth: 2,
            shadowColor: 'black',
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 10,
          }}>
          <CroppedImage
            sizedImage={sizedImage}
            rectangle={rectangle}
            scale={zoomScale}
          />
          <View
            style={{
              transform: [
                [
                  { translateX: rectangle.width * zoomScale - 0.5 * iconSize },
                  {
                    translateY:
                      -1 * rectangle.height * zoomScale - 0.5 * iconSize,
                  },
                ],
              ],
            }}>
            <ZoomOutButton
              size={iconSize}
              color={'white'}
              onPress={toggleZoom}
            />
          </View>
        </View>
      )}
      {!isZoomed && (
        <View
          style={{
            transform: [{ translateY: -1 * height }],
            padding: 10
          }}>
          <ZoomInButton size={iconSize} color={'white'} onPress={toggleZoom} />
        </View>
      )}
    </View>
  );
};
