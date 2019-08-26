import React, {Component} from 'react';
import SizedImage from '../objects/SizedImage';
import Rectangle from '../objects/Rectangle';
import {CroppedImage} from './ImageSizes';
import Draggable from './Draggable';
import {FixedSizeView} from './styles';
import TextButton from './TextButton';
import {View, Span} from './elements';
import {ManagedTextInput} from './form-elements';

export default class LeftRightCollage extends Component {
  static defaultProps = {
    width: 500,
    height: 500
  }
  constructor(props) {
    super( props );
    this.state = {
      /*leftImageTranslate: {
        x: 0, y: 0
      },
      rightImageTranslate: {
        x: 0, y: 0
      },
      leftImageScale: 1,
      rightImageScale: 1*/
      leftRectangle: this.props.left.getRectangle(),
      rightRectangle: this.props.right.getRectangle()
    };
  }
  getMaskRectangle(){ //imageRectangle ) {
    return new Rectangle( 
      this.props.width / 2, 
      this.props.height );
      //0 - imageRectangle.x,
      //0 - imageRectangle.y );
  }

  render() {
    console.log(this.props.left);
    console.log(this.props.right);
    return (
      <>
      <MoveableMaskedImage
        rectangle={this.getMaskRectangle()} 
        image={this.props.left}
      />
      <MoveableMaskedImage
        rectangle={this.getMaskRectangle()} 
        image={this.props.right}
      />
      </>
    )
  }
}
/*
      <CroppedImage
        rectangle={this.getMaskRectangle(this.state.rightRectangle)} 
        image={this.props.right.scaleToWidth(this.state.rightRectangle.width)}
      />
      */

export class MoveableMaskedImage extends React.Component {
  static defaultProps = {
    viewScale: 1,
    rectangle: new Rectangle( 250, 375, 0, 0),
    moveable: true,
    resizable: true,
    showControls: true,
  }
  minScale = 100 * Math.max(
    this.props.rectangle.height / this.props.image.height,
    this.props.rectangle.width / this.props.image.width );
  //initial position is centered and scaled to fit  
  minTranslateX = () => {
    return this.props.rectangle.width - ( this.state.imageScale / 100 * this.props.image.width );
  }
  minTranslateY = () => {
    return this.props.rectangle.height - ( this.state.imageScale / 100 * this.props.image.height );
  }
  state = {
      translateX: 0,
      translateY: this.props.rectangle.center.y -this.props.image.getRectangle().center.y,
      imageScale: this.minScale,
  }
  componentDidMount() {
    this.setField( 'translateX', .5 * this.minTranslateX() );
    this.setField( 'translateY', .5 * this.minTranslateY() );
  }
  center() {
    console.log ( 'min x: ' + this.minTranslateX() )
    console.log ( 'min y: ' + this.minTranslateY() )
    this.setState({
      translateX: .5 * this.minTranslateX(),
      translateY: .5 * this.minTranslateY(),
    })
  }
  getMaskRectangle() {
    return this.props.rectangle.clone()
      .shiftX( -1 * this.state.translateX )
      .shiftY( -1 * this.state.translateY );
  }
  setField( field, value ) {
    this.setState({
      [field]: this.enforceBoundaries(field, value),
    })
  }
  onChangeText = (text, field) => {
    const value = parseInt( text )  || 0;
    this.setField( field, value );
  }
  onIncrement = (field, decrease = false ) => {
    //const multiplier = decrease ? .95 : 1.05;
    const change = decrease ? -5 : 5;
    this.setField( field, change + this.state[field] );
    /*this.setState( prevState => { return ({
      [field]: multiplier * prevState[field]
    });
    })*/
  }
  enforceBoundaries( field, value ) {
    if ( field === 'translateX' ) {
      value = Math.min( Math.max( value, this.minTranslateX() ), 0);
    } else if ( field === 'translateY' ) {
      value = Math.min( Math.max( value, this.minTranslateY() ), 0);
    } else if ( field === 'imageScale' ) {
      value = Math.max( value, this.minScale );
    }
    return value;
  }
  renderControl( field, label, units ) {
    return(
  <View>
    <ManagedTextInput value={this.state[field] || ''} label={label} onChangeText={(text) => this.onChangeText(text, field)} />
    <Span>{units}</Span>
    <TextButton onPress={() => this.onIncrement(field, true)}>Minus</TextButton>
    <TextButton onPress={() => this.onIncrement(field, false)}>Plus</TextButton>
  </View>
)
  }
  renderControls() {
    if ( this.props.showControls ) {
return(
  <>
  {this.renderControl( 'imageScale', 'Scale:', '%' )}
  {this.renderControl( 'translateX', 'X:', 'px' )}
  {this.renderControl( 'translateY', 'Y:', 'px' )}
</>
)}
else return null;
  }
  render() {
    console.log( this.state );
    console.log( this.getMaskRectangle());
    console.log( this.props.image.scale(.5) );
    return (
    <>
      {this.props.showControls && this.renderControls()}
<Draggable>
      <CroppedImage
        rectangle={this.getMaskRectangle()}
        scale={this.props.viewScale} 
        image={this.props.image.scale( this.state.imageScale / 100 )}
      />
      </Draggable>
      </>
    )
  }
}