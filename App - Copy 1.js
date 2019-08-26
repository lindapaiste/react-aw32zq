import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import {ShrunkImage, CroppedImage, ZoomableOverlayImage, ZoomableCroppedImage, MaxSizeImage, ZoomOverlayImage} from './components/image';
import {ObjectToRectangle} from './helpers/rectangle';

import Constants from 'expo-constants';
import styled from 'styled-components/native';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    let image = {
file: "nikki-bella-makeup-6.jpg",
width: 500,
height: 500,
mime_type: "image/jpeg",
source_url: "https://stealherstyle.net/wp-content/uploads/2019/04/nikki-bella-makeup-6.jpg"
};
let rectanglePoints = {
  x:100,
  y:200,
  width:150,
  height:100
};
let rectangle = ObjectToRectangle(rectanglePoints);
    return (
      <View>
      <Text>Shrunk & Cropped lololol</Text>
      <Text>rectangle width {rectangle.width} height {rectangle.height}</Text>
        <ZoomableCroppedImage sizedImage={image} rectangle={rectangle} width={375} />
        <ZoomableOverlayImage sizedImage={image} rectangle={rectangle} width={375} />
      </View>
    );
  }
}