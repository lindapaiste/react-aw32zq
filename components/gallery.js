import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default ({data, renderItem}) => {
  return(
    <FlatList 
    />
  )
};

export class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeResource: this.props.offset || 0
    }
  }
  count() {
    return React.Children.count(this.props.children);
  }
  hasLeft() {
    return ( this.state.activeResource > 0 );
  }
  hasRight() {
    return ( ( this.count() - this.state.activeResource ) > 1 );
  }
  goLeft = () => {
    this.moveBy( -1 );
  }
  goRight = () => {
    this.moveBy( 1 );
  }
  moveBy( int ) {
    this.setState((prevState) => ({
      activeResource: prevState.activeResource + int
    }));
  }
  render() {
    return(
      <FlatList>
      <Text>Showing Image {this.state.activeResource + 1} of {this.count()}</Text>
      {this.hasLeft() && <View onClick={this.goLeft}><FontAwesomeIcon icon={faChevronLeft} /></View>}
      {this.hasRight() && <View onClick={this.goRight}><FontAwesomeIcon icon={faChevronRight} /></View>}
      {React.Children.toArray(this.props.children)[this.state.activeResource]}
      </FlatList>
    )
  }
}

export class GalleryOld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeResource: this.props.offset || 0
    }
  }
  count() {
    return React.Children.count(this.props.children);
  }
  hasLeft() {
    return ( this.state.activeResource > 0 );
  }
  hasRight() {
    return ( ( this.count() - this.state.activeResource ) > 1 );
  }
  goLeft = () => {
    this.moveBy( -1 );
  }
  goRight = () => {
    this.moveBy( 1 );
  }
  moveBy( int ) {
    this.setState((prevState) => ({
      activeResource: prevState.activeResource + int
    }));
  }
  render() {
    return(
      <View>
      <Text>Showing Image {this.state.activeResource + 1} of {this.count()}</Text>
      {this.hasLeft() && <View onClick={this.goLeft}><FontAwesomeIcon icon={faChevronLeft} /></View>}
      {this.hasRight() && <View onClick={this.goRight}><FontAwesomeIcon icon={faChevronRight} /></View>}
      {React.Children.toArray(this.props.children)[this.state.activeResource]}
      </View>
    )
  }
}