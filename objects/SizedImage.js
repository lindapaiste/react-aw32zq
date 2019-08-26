import { getWindow } from '../util/Dimensions';
import Rectangle from './Rectangle';

export default class SizedImage {
  constructor({ source_url, width, height }) {
    this.source_url = source_url;
    this.width = width;
    this.height = height;
    this.aspectRatio = width / height;
    //mime type and file don't matter
  }
  calculateScale(width, height) {
    const maxWidth = width || getWindow().width;
    const maxHeight = height || getWindow().height;
    return Math.min(maxWidth / this.width, maxHeight / this.height);
  }
  getScaledHeight(width) {
    const scale = width / this.width;
    return scale * this.height;
  }
  getScaledWidth(height) {
    const scale = height / this.height;
    return scale * this.width;
  }
  static fromValues = (source_url, width, height) => {
    return new SizedImage({source_url, width, height});
  }
  getRectangle() {
    return new Rectangle( this.width, this.height, 0, 0 );
  }
  //original image should never be directly modified, it needs to be cloned
  clone() {
    return new SizedImage( this );
  }
  scale( scale ) {
    return SizedImage.fromValues(
      this.source_url,
      this.width * scale,
      this.height * scale 
    );
  }
  scaleToWidth(width) {
    const scale = width / this.width;
    return this.scale( scale );
  }
  scaleToHeight(height) {
    const scale = height / this.height;
    return this.scale( scale );
  }
  scaleToMaxSize( width, height ) {
    const scale = this.calculateScale( width, height );
    return this.scale( scale );
  }
}
