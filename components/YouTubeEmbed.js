import React from 'react';
import { Text } from 'elements';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';
import { FixedSizeContainer } from './styles.js';
import YouTubeVideoContainer from '../containers/YouTubeVideoContainer';

export default (props) => {
  return (
    <YouTubeVideoContainer
      {...props}
      render={RenderVideo}
    />
  )
}


const RenderVideo = ({props, state}) => {
  return (
    <>
        <YouTubeVideo
          id={props.id}
          width={props.width}
          height={state.height}
          startTime={props.startTime}
        />
        <YouTubeCredit channel={state.channelTitle} />
    </>
  )
}

export const YouTubeVideo = ({id, width = 320, height, startTime = 0}) => {
  let src = 'https://www.youtube.com/embed/' + id;
  if ( startTime ) src += '?start=' + startTime;
  height = height || YouTubeVideoContainer.calcHeight(width);
  //const iFrame = `<iframe width="${width}" height="${height}" src="${src}" style="max-width:100%;" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  return (
    <FixedSizeContainer width={width} height={height}>
      <VideoWebView
        style={{ width: width, height: height }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "https://www.youtube.com/embed/" + id }}
        //source={{ html: iFrame }} 
        automaticallyAdjustContentInsets={true}
      />
    </FixedSizeContainer>
  )
}

const YouTubeCredit = ({channel}) => {
  if( channel ) {
    return (
      <Text>video created by {channel}</Text>
    )
  } else return null;
}

const VideoWebView = styled.WebView`
  max-width: 100%;
  max-height: 100%;
`;

//TODO: need to restrict my API Key at https://console.developers.google.com/apis/credentials/key/f238f273-e7a1-4106-a3b2-c6ed2945a47b?project=inspired-memory-215706