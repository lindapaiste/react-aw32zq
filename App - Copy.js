import React, { Component } from 'react';
import { Text, View, SafeAreaView, StyleSheet, Image } from 'react-native';
import PostContainer from './containers/PostContainer';
import {PostSingle, TypePost} from './components/post';
import {InstagramEmbed} from './components/instagram-embed';
import AnnotatedImage from './components/annotated-image';

import Constants from 'expo-constants';
import styled from 'styled-components/native';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <PostContainer
          id={170171}
          postType={'hair'}
          render={TypePost}
        />
      </SafeAreaView>
    );
  }
}