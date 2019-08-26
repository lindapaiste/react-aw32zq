import React from 'react';
import {FlatList, View, Text} from 'react-native';
import styled from 'styled-components';

export default ({data, renderItem}) => {
  return (
    <FlatList 
      data={data}
      renderItem={({item, index}) =>
      <View style={{display:'inline-flex',flexDirection: 'row'}}>
        <Number index={index} />
        <View style={{}}>
        {renderItem({item})}
        </View>
      </View>}
      
    />
  )
}

const Number = ({index}) => {
  const innerText = ( index + 1 ) + '. ';
  return (
    <Text
    style={{paddingHorizontal: 10}}
    >{innerText}</Text>
  )
}