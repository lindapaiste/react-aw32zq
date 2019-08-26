import React, {Component} from 'react';
import {View, TouchableHighlight, Text, Image, FlatList} from 'react-native';
import {PostArchiveContainer, CategoryArchiveContainer, TypeArchiveContainer} from "../containers/PostArchiveContainer";
import WpPostObject from '../helpers/WpPost';
import {CategoryCptLink, CategoryCptUrl} from './taxonomy';
import Link from './link';
import {FixedSizeImage} from './image';
import styled from 'styled-components';

export const Portal = ({data, renderItem}) => {
  /*const count = React.Children.count(props.children);
  let columns = props.columns || 6;
  columns = Math.min( columns, count );*/
  //TODO: columns
  return (
    <PortalWrapper
      data={data}
      renderItem={renderItem}
    />
  )
}

const PortalWrapper = styled.FlatList`

`;
/*
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: flex-start;
  align-items: flex-start;
  */

export const PostTypePortal = ({postType}) => {
  return (
    <TypeArchiveContainer
      postType={postType}
      render={({items, error}) => items.map( item => <RenderCptPortalItem json={item} /> ) }
      parameters={{_embed: true}}
    />
  )
};


export const PortalOutfitsInCategory = ({id}) => {
  //TODO: exclude current post
  const renderItem = (json) => {
    const post = new WpPostObject(json);
    const size = {width: 150, height: 150};
    return (
      <SinglePostPortalItem 
        post={post}
        size={size}
      />
    )
  }
  return (
    <CategoryArchiveContainer 
      endpoint='posts'
      parameters={{_embed: true}} //exclude
      id={id}
      render={({json, error}) => <Portal data={json} renderItem={renderItem} />}
    />
  )
}

const PortalItem = ({url, image, text, size}) => {
  return (
    <PortalItemWrapper>
    <Link link={url} >
    <View>
        <PortalImageWrapper>
          <FixedSizeImage
              sizedImage={image}
              width={size.width}
              height={size.height}
          />
        </PortalImageWrapper>
          {Boolean(text) &&
            <PortalText>{text}</PortalText>
          }
          </View>
  </Link>
  </PortalItemWrapper>
  )
};

const PortalText = styled.Text`
  text-align: center;
  text-tranform: uppercase;
  background: #000000;
  transform: translate(30px,-40px);
  width: 130px;
  color: #FFF;
  font-size: 20px;
  padding: 3px;
  white-space: nowrap;
  overflow: hidden;
`;

const PortalItemWrapper = styled.View`
  padding: 10px;
  width: 170px;
`;
//  flex-basis: 20%;

const PortalImageWrapper = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  overflow: hidden;
`;

export const CptPortalItem = ({post, size}) => {
  const category = post.getTheCategory() || {};
  const type = post.json.type;
  const title = category.name + ' ' + type;
  return (
    <PortalItem
          url={post.cptUrl()}
          image={post.getTheFeaturedImage().getSize(size)}
          alt={title}
          text={category.name}
          size={size}
      />

  )
};

const SinglePostPortalItem = ({post, size}) => {
  return (
      <PortalItem
          url={post.getThePermalink()}
          //onClick=
          image={post.getTheFeaturedImage().getSize(size)}
          alt={post.getTheTitle()}
          text={''} //none
          size={size}
      />
  )
};

export const RenderSinglePostPortalItem = ({json}) => {
    const post = new WpPostObject(json);
    const size = {width: 150, height: 150};
    return (
      <SinglePostPortalItem 
        post={post}
        size={size}
      />
    )
}

export const RenderCptPortalItem = ({json}) => {
    const post = new WpPostObject(json);
    const size = {width: 150, height: 150};
    return (
      <CptPortalItem 
        post={post}
        size={size}
      />
    )
}