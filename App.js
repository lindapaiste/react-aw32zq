import React, { Component } from 'react';
//import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';
//import PostContainer from './containers/PostContainer';
//import {TypeArchiveContainer} from './containers/PostArchiveContainer';
//import {PostSingle, TypePost} from './components/post';
//import InstagramEmbed from './components/InstagramEmbed';
//import InstagramTimeline from './components/InstagramTimeline';
//import AnnotatedImage from './components/annotated-image';
//import {RenderCptPortalItem} from './components/portal';
//import FaceOff from './screens/OutfitFaceOff';
//import TattooIntro from './components/TattooIntro';
//import Following from './admin/instagram-following';
import Collage from './components/CollageEditor';
import SizedImage from './objects/SizedImage';
import {CroppedImage, TranslatedImage} from './components/ImageSizes';
import Rectangle from './objects/Rectangle';
//import Constants from 'expo-constants';
//import styled from 'styled-components/native';


const leftImage = new SizedImage({
file: "natalia_dyer01.jpg",
width: 500,
height: 500,
mime_type: "image/jpeg",
source_url: "https://stealherstyle.net/wp-content/uploads/2019/07/natalia_dyer01.jpg"
});

const rightImage = new SizedImage({
        "file": "bebe_rexha01.jpg",
"width": 500,
"height": 500,
"mime_type": "image/jpeg",
"source_url": "https://stealherstyle.net/wp-content/uploads/2019/07/bebe_rexha01.jpg"
      });

const rectangle = new Rectangle( 250, 500, 0, 0);

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
      <Collage width={500} height={375} left={leftImage} right={rightImage}/>
    </>
    );
  }
}