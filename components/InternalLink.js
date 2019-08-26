import React from 'react';
import {TouchableHighlight} from 'react-native';
import styled from 'styled-components';

export default (props) => {
      return (
        <TouchableHighlight>
          {props.children}
        </TouchableHighlight>
        //TODO: navigate to page
        //onPress={this._onPressButton}>
    )
}