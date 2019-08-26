import React, { Component } from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { ManagedSelect, Option } from './form';
import { CategoryListContainer } from '../containers/WpJsonListContainer';
import InternalLink from './InternalLink';
import { MyButton } from './form';
import styled from 'styled-components';

export const TermLinkButton = ({ json }) => {
  return (
    <MyButton
      color="black"
      text={json.name}
      onClick={() => console.log(json)}
    />
  );
};

export const TermLink = ({ json }) => {
  return (
    <TagStyledLink>
      <WhiteText>{json.name}</WhiteText>
    </TagStyledLink>
    //TODO: navigate to page
    //onPress={this._onPressButton}>
  );
};
//TouchableHighlight style={styles.tag}

export const TermName = ({ json }) => {
  return <Text>{json.name}</Text>;
};

export const TermOption = ({ json }) => {
  return <Option value={json.id} label={json.name} />;
};

export const CategoryCptLink = ({ category, postType, children }) => {
  let inner = children ? (
    children
  ) : (
    <Text>{category.name + ' ' + postType}</Text>
  );
  //TODO: navivate to page
  return (
    <TouchableHighlight>
      {' '}
      //onPress={this._onPressButton}>{inner}
    </TouchableHighlight>
    //TODO: navigate to page
  );
};

export const CategoryCptUrl = (categoryJson, type) => {
  let url = categoryJson.link;
  if (type !== 'post') {
    url += '?post_type=' + type;
  }
  return url;
};

export const TagGroup = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const WhiteText = styled.Text`
  color: white;
`;

export const TagStyledLink = styled.TouchableHighlight`
  border-radius: 4;
  border-width: 0.5;
  background-color: black;
  border-color: #d6d7da;
  margin: 5px;
  padding: 5px;
`;
