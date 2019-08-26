import SizedImage from './SizedImage';

//can be used with WP or IG
//sizes is an object keyed by size name for WP
export function MediaSizes(sizes, aspectRatio) {
  this.getFullSize = () => {
    return sizes.full || this.getLargestSize();
  }
  this.getNamedSize = (size) => {
    return sizes[size];
  }
  this.getSizeByWidth = (width) => {
    return this.getSizeByDimensions( width, undefined );
  }
  /*
  this.getSizeByWidth = (width) => {
    let sized = this.getFullSize();
    this.getAspectRatioSizes().forEach(size => {
      if (size.width >= width && size.width < sized.width) {
        sized = size;
      }
    });
    return sized;
  }*/
  this.getSizeByHeight = (height) => {
    return this.getSizeByDimensions( undefined, height );
  }
  this.getAspectRatio = () => {
    return aspectRatio;
  }
  this.getAspectRatioSizes = (ratio) => {
    //if ratio is left blank, it uses the ratio of the full-size image
    ratio = ratio || aspectRatio;
    return Object.values(sizes).filter(size => {
      //need to allow some margin of error to account for rounding
      let expectedHeight = size.width / ratio;
      let difference = expectedHeight - size.height;
      return (Math.abs(difference) <= 1);
    })
  }
  //can use name or width
  this.getSize = (size) => {
    if (parseInt(size)) {
      return this.getSizeByWidth(size);
    } else if (size.width && size.height) {
      return this.getSizeByDimensions(size.width, size.height);
    } else {
      return this.getNamedSize(size);
    }
  };
  this.getSizeByDimensions = (width, height) => {
    let sized = this.getFullSize();
    this.getAspectRatioSizes().forEach(size => {
      if ( width && size.width >= width && size.width < sized.width) {
        if (height && size.height >= height && size.height < sized.height) {
          sized = size;
        }
      }
    });
    return sized;
  }
  //TODO: find usages and change, as name is misleading
  this.getSmallestSize = (width, height) => {
    return this.getSizeByDimensions( width, height );
  };
  this.getLargestSize = () => {
    let sized = Object.values(sizes)[0];
    Object.values(sizes).forEach(size => {
      if (size.width >= sized.width && size.height >= sized.height) {
        sized = size;
      }
    });
    return sized;
  };
  this.getSrc = () => {
    return this.getFullSize().source_url;
  };
}


export default function WpMedia(json) {
  const aspectRatio = json.media_details.width / json.media_details.height;
  const sizes = json.media_details.sizes;
  return new MediaSizes(sizes, aspectRatio);
}