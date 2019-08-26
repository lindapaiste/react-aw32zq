import React from 'react';
import {Image} from 'react-native';
//allows you to pass a rectangle rather than specific values
const CroppedImageCanvas = (props) => {
    return (
        <ImageCanvas
            src={props.src}
            width={props.rectangle.width}
            height={props.rectangle.height}
            sx={props.rectangle.x}
            sy={props.rectangle.y}
            onClick={props.onClick}
        />
    )
};

const ImgTagToCanvas = (props) => {
    return (
        <ImageCanvas
            src={props.image.src}
            width={props.image.width}
            height={props.image.height}
            onClick={props.onClick}
        />
    )
};

export default class ImageCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawn: false,
        };
    }

    componentDidMount() {
        this.setSrc();
        //this.drawImage();
    }

    componentDidUpdate() {
        //if image was changed
        if (this.props.src != this.state.image.src) {
            this.setSrc();
            //this.drawImage();
        }
        if ( ! this.state.isDrawn && this.state.image ) {
            this.drawImage();
        }
        //redraws if image or any dimension props were changed
        //this.drawImage();
    }

    setSrc() {
        console.log("setting src to " + this.props.src);
        const image = window.createElement('img');
        image.src = this.props.src;
        this.setState({
            image: image,
            isDrawn: false,
        });
    }

    getContext() {
        return this.refs.canvas.getContext('2d');
    }

    getPosition() {
        return this.refs.canvas.getBoundingClientRect();
    }

    drawImage() {
        if ( this.state.image.src ) {
            console.log("drawing image");
            console.log(this.state.image.src);
            console.log(this.refs.canvas);
            //const ctx = this.getContext();
          const ctx = this.refs.canvas.getContext('2d');
          console.log(ctx);
            //default parameters
            const sx = this.props.sx || 0,
                sy = this.props.sy || 0,
                sWidth = this.props.sWidth || this.props.width,
                sHeight = this.props.sHeight || this.props.height,
                dx = this.props.dx || 0,
                dy = this.props.dy || 0,
                dWidth = this.props.dWidth || this.props.width,
                dHeight = this.props.dHeight || this.props.height;
            ctx.drawImage(this.state.image, 0, 0);
            //ctx.drawImage(this.state.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            this.setState({
                isDrawn: true,
            });
        }
        //(imgTag, 0, 0, this.props.width, this.props.height); //, this.props.cropX, this.props.cropY, this.props.cropWidth, this.props.cropHeight);
    }


    render() {
        return (
            <canvas
                ref="canvas"
                width={this.props.width || this.state.image.width}
                height={this.props.height || this.state.image.height}
                onClick={this.props.onClick}
            />
        );
    }
}