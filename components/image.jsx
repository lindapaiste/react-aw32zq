
const Image = (props) => {
  //style max width max height

    return (
      <img src={props.src} width={props.width} height={props.height} onClick={props.onClick} onLoad={props.onLoad} style={props.style}/>
  )
};

class ImgSetDimensions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }
    onLoad = (e) => {
        this.setState({
            loaded: true,
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
        });
    };
    render() {
        return (
            <img src={this.props.src} onLoad={this.onLoad} width={this.state.width} height={this.state.height}/>
        );
    }
}

class CssZoomableCroppedImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isZoomed: true
        }
    }

    onClick = () => {
        this.setState({isZoomed: !this.state.isZoomed});
    };

    render() {
        if (this.state.isZoomed) {
            return (
                <CssCroppedImage {...this.props} />
            );
        } else {
            return (
                <CssShrunkImage {...this.props} />
            );
        }
    }

}

const CssImageHolderDiv = (props) => {
    const divStyle = {
        width: props.width,
        height: props.height,
        overflow: 'hidden',
    };
    return (
        <div style={divStyle}>
            {props.children}
        </div>
    );
};

const CssShrunkImage = (props) => {
    return (
        <CssImageHolderDiv width={props.rectangle.width} height={props.rectangle.height}>
            <CssShrunkImgTag src={props.src}/>
        </CssImageHolderDiv>
    );
};

const CssShrunkImgTag = (props) => {
    const imgStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
    };
    return (
        <img src={props.src} style={imgStyle}/>
    )
};

const CssCroppedImage = (props) => {
    return (
        <CssImageHolderDiv width={props.rectangle.width} height={props.rectangle.height}>
            <CssCroppedImgTag src={props.src} rectangle={props.rectangle}/>
        </CssImageHolderDiv>
    );
};

const CssCroppedImgTag = (props) => {
    const imgStyle = {
        marginLeft: -1 * props.rectangle.x,
        marginTop: -1 * props.rectangle.y,
        maxWidth: 'none',
        maxHeight: 'none',
    };
    return (
        <img src={props.src} style={imgStyle}/>
    )
};

