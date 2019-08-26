import React, {Component} from 'react';
import {Image, ImageBackground, View, Text} from 'react-native';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const sampleData = {
  products: [
    {
      position: {
        x: 332,
        y: 452
      },
      product: {
        name: 'Product Name',
        price: 399
      }
    },
        {
      position: {
        x: 432,
        y: 239
      },
      product: {
        name: 'Second Product Name',
        price: 500
      }
    }
  ]
};

export default class AnnotatedImage extends React.Component {
  static defaultProps = {
    products: sampleData.products
  };
  constructor(props) {
    super(props);
    this.state = {}
  }
  scale = () => {
    return 1;
  }
  showTags = () => {
    this.setState({
      active: true
    });
  }
  showDetails = (product) => {
    this.setState({
      product: product
    });
  }
  hideDetails = () => {
    this.setState({
      product: undefined
    });
  }
  renderDot( product ) {
    return(
      <Dot x={product.position.x} y={product.position.y} onPress={() => this.showDetails(product.product)}>
        <FontAwesomeIcon icon={faTag} size={30} />
      </Dot>
    )
  }
  render() {
    return (
      <ImageWrapper onPress={this.showTags}>
        <ImageBackground
          source={{uri: 'https://stealherstyle.net/wp-content/uploads/2019/06/karrueche02.jpg'}}
          style={{height:500, width:500}}
        />
        {this.props.products.map( product => this.renderDot(product))}
        <Overlay product={this.state.product} />
      </ImageWrapper>
    )
  }
}

const Overlay = ({product}) => {
  if ( product ) {
    return (
      <OverlayWrapper>
        <BrandName>Brand Name</BrandName>
        <ProductName>{product.name}</ProductName>
        <Text>{product.price}</Text>
      </OverlayWrapper>
    )
  } else {
    return null;
  }
};

const BrandName = styled.Text`
  font-size: 30px;
`;

const ProductName = styled.Text`
  font-size: 20px;
`;

const OverlayWrapper = styled.View`
  background: white;
  width: 500px;
  height: 500px;
`;

const ImageWrapper = styled.View`
  position: relative;
`;

const Dot = styled.View`
  position: absolute;
  top: ${props => props.y};
  left: ${props => props.x};
  width: 30px;
  height: 30px;
`;


