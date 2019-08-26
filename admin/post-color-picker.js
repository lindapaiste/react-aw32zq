class ColorPickerPost extends React.Component {
    static defaultProps = {
        postType: 'post',
        groupings: ['eyeshadow colors', 'lipstick colors']
    };

    constructor(props) {
        super(props);
        this.state = {
            colors: [],
            img: null,
            activeGrouping: this.props.groupings[0],
            lastKey: 0,
        };
    }

    componentDidMount() {
        this.loadImage();
    }

    loadImage() {
        let promise = getFeaturedImageElement(this.props.postId, this.props.postType);
        promise.then((img) => {
            console.log(img);
            this.setState({
                img: img,
            });
        });
    }

    getColor( key ) {
        return this.state.colors.filter( color => color.key === key )[0];
    }

    getGroupColors( groupName ) {
        return this.state.colors.filter( color => color.grouping === groupName );
    }

    renderGrouping( groupName ) {
        return (
            <PickedColorGroup
                groupName={groupName}
            >
                {this.getGroupColors(groupName).map( color => this.renderColorBox(color))}
            </PickedColorGroup>
        )
    }

    oldRenderColorBoxes() {
        console.log('render color boxes');
        console.log(this.state.colors);
        return this.state.colors.map((color) =>
            <PickedColorBox
                color={color.hex}
                key={color.key}
                isSaved={color.isSaved}
                onClick={() => this.uploadColor(i)}
            />
        );
    }

    renderColorBox( color ) {
        return (
            <PickedColorBox
                color={color.hex}
                key={color.key}
                isSaved={color.isSaved}
                onClick={() => this.uploadColor(color)}
            />
        );
    }

    getColorObject(i) {
        return this.state.colors[i];
    }

    createKey() {
        //if colors are deleted then i changes but the key does not
        //new colors are always added at end, so look at last and add 1
        const iLast = this.state.colors.length - 1;
        const colorLast = this.state.colors[iLast];
        if (colorLast && colorLast.key) {
            return colorLast.key + 1;
        } else { //for first entry
            return 1;
        }
    }

    addColor(hex) {
        const key = this.state.lastKey + 1;
        const colorObject = {
            hex: hex,
            key: key,
            isSaved: false,
            grouping: this.state.activeGrouping,
        };
        this.setState({
            colors: this.state.colors.concat(colorObject),
            lastKey: key,
        });
        //todo save color to DB
    }

    uploadColor(color) {
        console.log('should save color [i]=' + color.key + ': to the database');
        console.log(color);
    }

    removeColor(key) {
        this.setState({
            colors: this.state.colors.filter(color => color.key !== key)
        });
    }

    pickColor = () => {
        const color = this.refs.canvasComponent.state.color;
        console.log( color );
        if ( color ) {
            this.addColor(color);
        }
    };

    render() {
        console.log("render post");
        console.log(this.state.img);
        if ( this.state.img ) {
            console.log(this.state.img.width);
            console.log(this.state.img.height);
            console.log(this.state.img.src);
        }
        return (
            <div className="color-picker">
                {this.state.img &&
                /*<img src={this.state.img.src} onClick={(e) => this.pickColor(e)}/>*/
                <ColorHoverCanvas
                    ref="canvasComponent"
                    src={this.state.img.src}
                    width={this.state.img.width}
                    height={this.state.img.height}
                    onClick={this.pickColor}
                />
                }
                {this.renderColorBoxes()}
            </div>
        )
    }
}

const PickedColorGroup = (props) => {
    return (
        <div className="color-group">
            <h3>{props.groupName}</h3>
            {props.children}
        </div>
    )
};

const PickedColorBox = (props) => {
        //let text = this.props.isSaved ? 'Delete' : 'Save';
        return (
            <div className="color-box" style={{backgroundColor: '#' + props.color}} onClick={props.onClick}>
                {props.isSaved &&
                <div className="show-on-hover">
                    Delete
                </div>
                }
            </div>
        );
};