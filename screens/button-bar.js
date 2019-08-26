import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faBars, faHeart, faUserAlt, faHome, faBookmark, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {Img} from '../components/media';

export default () => {
  const icons = [
    //faHome, //home
    faBars, //menu
    faSearch, //search
    //dashboard
    //faUserAlt,//profile
    //faHeart, //likes
    //faPlusCircle, //create post
    //faBookmark,//bookmark
  ];

  return(
    <IconBar>
        <IconItem icon={faBars} />
        <ShsLogo />
        <IconItem icon={faSearch} />
    </IconBar>
  )
}

const IconBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 80;
  background: #efefef;
  padding-top: 15px;
`;
//background: #EFEFEF;

const IconItem = ({icon}) => {
  return (
    <View>
      <FontAwesomeIcon icon={icon} size={25} color="white" />
    </View>
  )
};

const ShsLogo = () => {
  const src = "https://stealherstyle.net/wp-content/uploads/2018/10/steal-her-style-92.png";
  return(
    <View>
      <Image
          style={{width: 92, height: 46}}
          source={{uri: src}}
          accessibilityLabel="Steal Her Style"
        />
    </View>
  )
};