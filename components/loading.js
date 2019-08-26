import React from 'react';
import {ActivityIndicator} from 'react-native';

export default (props) => {
  return (
    <ActivityIndicator />
  )
}

//animating: Whether to show the indicator (true, the default) or hide it (false).
//color: The foreground color of the spinner (default is gray on iOS and dark cyan on //size: Size of the indicator (default is 'small'). Passing a number to the size prop //hidesWhenStopped: Whether the indicator should hide when not animating (true by default)