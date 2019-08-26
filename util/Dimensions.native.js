import {Dimensions} from 'react-native';

export function getWindow() {
  return Dimensions.get( 'window' );
}

export function getScreen() {
  return Dimensions.get( 'screen' );
}