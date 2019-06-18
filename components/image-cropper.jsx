class ImageCropTool extends React.Component {
    static defaultProps = {
        lockAspectRatio: true,
        movable: true,
        resizable: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            lockAspectRatio: this.props.lockAspectRatio,
            isPreview: false,
            loaded: false,
        };
    }
    onImgLoad = (e) => {
        this.setState({
            boundaries: new Rectangle( e.target.offsetWidth, e.target.offsetHeight, 0, 0 ),
            loaded: true,
        });
    };
    lockAspectRatio = () => {
        this.setState({lockAspectRatio: true});
        console.log('locking');
    };
    unlockAspectRatio = () => {
        this.setState({lockAspectRatio: false});
        console.log('unlocking');
    };

    previewImage = () => {
        this.setState({isPreview: true});
    };

    saveImage = () => {

    };

    initialRectangle() {
        if ( this.props.rectangle ) {
            return this.props.rectangle;
        } else if ( this.props.aspectRatio && this.state.boundaries ) {
            return aspectRatioRectangle( this.props.aspectRatio, this.state.boundaries );
        }
    };

    render() {
        const initialRectangle = this.initialRectangle();
        console.log( initialRectangle );
        return (
            <div className="image-cropper">
                <Button text="Lock" onClick={this.lockAspectRatio}/>
                <Button text="Unlock" onClick={this.unlockAspectRatio}/>
                <Button text="Preview" onClick={this.previewImage}/>
                <Button text="Save" onClick={this.saveImage}/>
                {this.state.isPreview &&
                <div>
                    <CroppedImageCanvas src={this.props.imageSrc} rectangle={this.refs.box.state.rectangle}/>
                    <CssZoomableCroppedImage src={this.props.imageSrc} rectangle={this.refs.box.state.rectangle}/>
                </div>
                }
                <div className={"image-holder"}>
                    <img src={this.props.imageSrc} onLoad={this.onImgLoad} />
                    {initialRectangle && //hold off loading because rectangle is set in the constructor and will not be updated
                    <BoundingBoxContainer
                        ref="box"
                        rectangle={initialRectangle}
                        boundaries={this.state.boundaries}
                        lockAspectRatio={this.state.lockAspectRatio}
                        movable={this.props.movable}
                        resizable={this.props.resizable}
                    />
                    }
                </div>
            </div>
        );
    }
}

function maxSizeBox( imgElement, aspectRatio ) {
    const boundaries = new Rectangle(
        imgElement.offsetWidth,
        imgElement.offsetHeight,
    );
    return aspectRatioRectangle( aspectRatio, boundaries );
}

function aspectRatioRectangle (aspectRatio, boundaries) {
    let width, height;
    //y is full, extra space on sides
    if ( boundaries.aspectRatio > aspectRatio ) {
        height = boundaries.height;
        width = boundaries.height * aspectRatio;
    } else { //x is full, extra space on top and bottom
        width = boundaries.width;
        height = boundaries.width / aspectRatio;
    }
    const rectangle = new Rectangle( width, height );
    rectangle.center = boundaries.center;
    return rectangle;
}
    
/*const RatioBoundingBox = (props) => {
    let width, height;
    //y is full, extra space on sides
    if ( props.boundaries.aspectRatio > props.aspectRatio ) {
        height = props.boundaries.height;
        width = props.boundaries.height * props.aspectRatio;
    } else { //x is full, extra space on top and bottom
        width = props.boundaries.width;
        height = props.boundaries.width / props.aspectRatio;
    }
    const box = new Rectangle( width, height );
    box.center = props.boundaries.center;
    
    return(
      <BoundingBoxContainer {...props} rectangle={box} />
    );
};*/



class BoundingBoxContainer extends React.Component {
    static defaultProps = {
        rectangle: new Rectangle( 500,500,0,0),
        movable: true,
        resizable: true,
        lockAspectRatio: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            rectangle: this.props.rectangle,
            isDragging: false,
            mouseX: null,
            mouseY: null,
            activePoint: null,
            history: [],
            //aspectRatio: this.props.lockAspectRatio ? ( this.props.width / this.props.height ) : null,
            //TODO: does this re-render when props change?
        };
    }
/*    componentWillReceiveProps() {
        this.setState({
           rectangle: this.props.rectangle
        });
    }*/
    addToHistory() {
        this.setState({
            history: this.state.history.push(this.state.rectangle)
        });
    }

    getPrevious() {
        let count = this.state.history.length;
        if (count > 0) {
            return this.state.history[count - 1];
        } else {
            return null;
        }
    }

    undo() {
        this.setState({rectangle: this.getPrevious()});
        //TODO: remove from history
    }
    
    //-----------------------------KEYBOARD CONTROLS----------------------------//
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        console.log(e);
        //move events
        if (this.props.movable) {
            if (e.key === 'ArrowLeft') {
                this.shiftRectangle( -1, 0 );
            } else if (e.key === 'ArrowRight') {
                this.shiftRectangle( 1, 0 );
            } else if (e.key === 'ArrowUp') {
                this.shiftRectangle( 0, -1 );
            } else if (e.key === 'ArrowDown') {
                this.shiftRectangle( 0, 1 );
            }
        }
        //resize events
        if (this.props.resizable) {
            if (e.key === '-') {
                this.scaleRectangle(1 - 1 / this.state.rectangle.width);
            } else if (e.key === '=' || e.key === '+') {
                this.scaleRectangle(1 + 1 / this.state.rectangle.width);
            }
        }
    };

    //-----------------------------SCALE RESIZE----------------------------//
    
    scaleRectangle( scale, fixedPoint ) {
        const max = this.maxScale();
        if ( max ) {
            scale = min(scale, max);
        }
        this.setState({
            rectangle: this.state.rectangle.scale( scale, fixedPoint )
        });
        //will push inside bounds if moved out, but synchronicity is a problem
        this.shiftRectangle( 0, 0 );
    }
    maxScale() {
        if ( this.boundaries ) {
            return min( this.boundaries.width / this.state.rectangle.width,
                this.boundaries.height / this.state.rectangle.height );
        } else {
            return null;
        }
    }
    scaleChange(change) {
        const active = this.state.activePoint;
        const rectangle = this.state.rectangle;
        if (!active) {
            return 0;
        }
        //xmid, use y only
        else if (active.xName === 'xmid') {
            return Math.abs(change.y / rectangle.height);
        }
        //ymid, use x only
        else if (active.yName === 'ymid') {
            return Math.abs(change.x / rectangle.width);
        }
        //for corners, average the two
        else {
            return .5 * (Math.abs(change.x / rectangle.width) + Math.abs(change.y / rectangle.height));
        }
    }
    calculateScale(change) {
        const scaleChange = this.scaleChange(change);
        console.log('scale change is ' + scaleChange);
        console.log(this.movedPoint(change));
        console.log(this.state.rectangle.containsPoint(this.movedPoint(change)));
        if (this.state.rectangle.containsPoint(this.movedPoint(change))) {
            return 1 - scaleChange;
        } else {
            return 1 + scaleChange;
        }
    }

    //-----------------------------FREE RESIZE----------------------------//

    movedPoint(change) {
        const point = this.state.activePoint.clone();
        //midpoints can only move out/in, not sideways
        if (point.xName !== 'xmid') {
            point.x += this.constrainXChange( change.x );
        }
        if (point.yName !== 'ymid') {
            point.y += this.constrainYChange( change.y );
        }
        return point;
    }

    movePoint(change) {
        const point = this.movedPoint(change);
        this.setState({
            rectangle: this.state.rectangle.setPoint(point)
        });
    }

    //---------------------------------MOVE-------------------------------//

    shiftRectangle( x, y ) {
        x = this.constrainXChange( x );
        y = this.constrainYChange( y );
        this.setState({
            rectangle: this.state.rectangle.shiftX(x).shiftY(y)
        });
    }
    constrainXChange( x ) {
        //cannot overflow boundaries, if they are set
        if ( this.props.boundaries ) {
            //change will be a negative number if overflowing left or top
            x = Math.max(x, this.props.boundaries.x1 - this.state.rectangle.x1);
            x = Math.min(x, this.props.boundaries.x2 - this.state.rectangle.x2);
        }
        return x;
    }
    constrainYChange( y ) {
        //cannot overflow boundaries, if they are set
        if ( this.props.boundaries ) {
            //change will be a negative number if overflowing left or top
            y = Math.max(y, this.props.boundaries.y1 - this.state.rectangle.y1);
            y = Math.min(y, this.props.boundaries.y2 - this.state.rectangle.y2);
        }
        return y;
    }

    //-----------------------------EVENT HANDLING--------------------------//

//click to enter move state and to leave it
    handleClick = (e, point = null) => {
        console.log('isDragging?');
        console.log(this.state.isDragging);
        if (this.state.isDragging) {
            this.endEvent();
        } else {
            this.beginEvent(e, point);
        }
    };

    beginEvent(e, point) {
        if (!this.state.isDragging) {
            this.setState({
                mouseX: e.pageX,
                mouseY: e.pageY,
                isDragging: true,
            });
            console.log(this.state);
            if (point) {
                if ( this.props.resizable ) {
                    this.setState({activePoint: point});
                    console.log('adding listeners');
                    window.addEventListener('mousemove', this.handleResize);
                    window.addEventListener('mousedown', this.endEvent);
                }
            } else {
                if ( this.props.movable ) {
                    this.setState({activePoint: null});
                    console.log('adding listeners');
                    window.addEventListener('mousemove', this.handleMove);
                    window.addEventListener('mousedown', this.endEvent);
                }
            }
        }
    }

    endEvent = () => {
        console.log('Mouse Up');
        if (this.state.isDragging) {
            this.setState({
                isDragging: false
            });
        }
        window.removeEventListener('mousemove', this.handleResize);
        window.removeEventListener('mousemove', this.handleMove);
        window.removeEventListener('mousedown', this.endEvent);
        console.log(this.state);
    };

    mouseMove(e) {
        if (this.state.isDragging) {
            console.log('Mouse Move');
            console.log(e);
            let changeX = e.pageX - this.state.mouseX;
            let changeY = e.pageY - this.state.mouseY;
            this.setState({
                mouseX: e.pageX,
                mouseY: e.pageY,
            });
            console.log(this.state);
            return {x: changeX, y: changeY};
        }
    }

    handleMove = (e) => {
        console.log('handleMove');
        let change = this.mouseMove(e);
        this.shiftRectangle( change );
    };

    handleResize = (e) => {
        console.log('handleResize');
        let change = this.mouseMove(e);
        console.log('change values: ');
        console.log(change);
        if (change) {
            if (this.props.lockAspectRatio === false) {
                change.x = this.constrainXChange( change.x );
                change.y = this.constrainYChange( change.y );
                this.movePoint(change);
            } else {
                let scale = this.calculateScale(change);
                let fixedPoint = this.state.rectangle.getOppositePoint(this.state.activePoint);
                console.log('scaling to ' + scale + 'from fixed point ');
                console.log(fixedPoint);
                this.scaleRectangle(scale, fixedPoint);
            }
        }
    };

    //-------------------------------RENDER-------------------------------//

    getPoints() {
        console.log( this.state );
        return this.state.rectangle.corners.concat(this.state.rectangle.midpoints);
    }

    render() {
        return (
            <BoundingBox
                rectangle={this.state.rectangle}
                points={this.getPoints()}
                onClick={this.handleClick}  //TODO: should be conditional on moveable
                //handleMove={this.handleMove}
                //handleResize={this.handleResize}

            >
                {this.props.children}
            </BoundingBox>
        )
    }
}

const BoundingBox = (props) => {
    const cssStyle = {
        width: props.rectangle.width + 'px',
        height: props.rectangle.height + 'px',
        //use EITHER transform or absolute positioning
        //transform: 'translate(' + this.props.x + 'px,' + this.props.y + 'px );'
        position: 'absolute',
        left: props.rectangle.x + 'px',
        top: props.rectangle.y + 'px',
    };
    const renderPoint = (point) => {
        //console.log( point );
        return (
            <ResizeDot
                key={point.key} //gives a name like "x1,y2"
                point={point}
                onClick={props.onClick}
            />
        )
    };
    return (
        <div>
            <div
                className="crop-box"
                style={cssStyle}
                onClick={(e) => props.onClick(e)}
            />
            {props.points.map((point) => renderPoint(point))}
            {props.children}
        </div>

    )
};

const ResizeDot = (props) => {
    let size = props.size || 10;
    let cssStyle = {
        //TODO: move to stylesheet
        width: size + 'px',
        height: size + 'px',
        position: 'absolute',
        left: props.point.x + 'px',
        top: props.point.y + 'px',
        borderRadius: .5 * size + 'px',
        margin: '-' + .5 * size + 'px',
        background: 'red',
    };
    let preserveRatio = props.hasOwnProperty('preserveRatio') ? props.preserveRatio : true;
    return (
        <div
            className="hot-corner"
            style={cssStyle}
            onClick={(e) => props.onClick(e, props.point)}
        />
    )
};


function Rectangle(width = 0, height = 0, x = 0, y = 0) {
    this.x1 = x;
    this.y1 = y;
    this.x2 = x + width;
    this.y2 = y + height;
    //setting x/y move the rectangle while preserving the size
    Object.defineProperty(this, 'x', {
        get() {
            return this.x1;
        },
        set(value) {
            this.x2 = value + this.width;
            this.x1 = value;
        }
    });
    Object.defineProperty(this, 'y', {
        get() {
            return this.y1;
        },
        set(value) {
            this.y2 = value + this.height;
            this.y1 = value;
        }
    });
    Object.defineProperty(this, 'width', {
        get() {
            return this.x2 - this.x1;
        },
        set(value) {
            //WHERE does it expand from
        }
    });
    Object.defineProperty(this, 'height', {
        get() {
            return this.y2 - this.y1;
        },
        set(value) {
            //
        }
    });
    Object.defineProperty(this, 'xmid', {
        get() {
            return this.x + .5 * this.width;
        },
        set(value) {
            this.x = value - .5 * this.width;
        }
    });
    Object.defineProperty(this, 'ymid', {
        get() {
            return this.y + .5 * this.height;
        },
        set(value) {
            this.y = value - .5 * this.height;
        }
    });
    Object.defineProperty(this, 'corners', {
        get() {
            const cornerNames = [
                ['x1', 'y1'],
                ['x1', 'y2'],
                ['x2', 'y1'],
                ['x2', 'y2'],
            ];
            return cornerNames.map((arr) => this.getPoint(arr[0], arr[1]));
        }
    });
    Object.defineProperty(this, 'midpoints', {
        get() {
            const midpointNames = [
                ['x1', 'ymid'],
                ['x2', 'ymid'],
                ['xmid', 'y1'],
                ['xmid', 'y2'],
            ];
            return midpointNames.map((arr) => this.getPoint(arr[0], arr[1]));
        }
    });
    Object.defineProperty(this, 'coordinates', {
        get() {
            return {
                x1: this.x1,
                x2: this.x2,
                y1: this.y1,
                y2: this.y2,
            }
        }
    });
    Object.defineProperty(this, 'aspectRatio', {
        get() {
            if (this.height) {
                return this.width / this.height;
            } else {
                return undefined;
            }
        }
    });
    Object.defineProperty(this, 'center', {
        get() {
            return this.getPoint('xmid', 'ymid');
        }, set(point) {
            point.xName = 'xmid';
            point.yName = 'ymid';
            this.setPoint(point);
        }
    });
    this.shiftX = (change) => {
        console.log('shifting x by ' + change);
        this.x1 += change;
        this.x2 += change;
        return this;
    };
    this.shiftY = (change) => {
        console.log('shifting y by ' + change);
        this.y1 += change;
        this.y2 += change;
        return this;
    };
    this.shift = (changeX = 0, changeY = 0) => {
        this.shiftX(changeX);
        this.shiftY(changeY);
        return this;
    };
    this.scale = (float, fixedPoint = null) => {
        const width = this.width, height = this.height;
        console.log(fixedPoint);
        if (!fixedPoint) {
            fixedPoint = this.center;
        }
        console.log( this );
        this.setPoint(fixedPoint);
        console.log( this );
        this.setWidth(width * float, fixedPoint.xName);
        console.log( this );
        this.setHeight(height * float, fixedPoint.yName);
        console.log( this );
        return this;
    };
    this.scaleToWidth = (width, fixedPoint = null) => {
        const float = width / this.width;
        return this.scale(float, fixedPoint);
    };
    this.scaleToHeight = (height, fixedPoint = null) => {
        const float = height / this.height;
        return this.scale(float, fixedPoint);
    };
    this.setWidth = (value, fixedProperty = 'xmid') => {
        fixedProperty = this.normalizePropertyName(fixedProperty, 'x');
        if (fixedProperty === 'x1') {
            this.x2 = this.x1 + value;
        }
        else if (fixedProperty === 'x2') {
            this.x1 = this.x2 - value;
        }
        else if (fixedProperty === 'xmid') {
            const currentMid = this.xmid;
            this.x1 = currentMid - .5 * value;
            this.x2 = currentMid + .5 * value;
        }
    };
    this.setHeight = (value, fixedProperty = 'ymid') => {
        fixedProperty = this.normalizePropertyName(fixedProperty, 'y');
        if (fixedProperty === 'y1') {
            this.y2 = this.y1 + value;
        }
        else if (fixedProperty === 'y2') {
            this.y1 = this.y2 - value;
        }
        else if (fixedProperty === 'ymid') {
            const currentMid = this.ymid;
            this.y1 = currentMid - .5 * value;
            this.y2 = currentMid + .5 * value;
        }
    };

    const aliases = {
        left: 'x1',
        right: 'x2',
        top: 'y1',
        bottom: 'y2',
    };
    const unprefixedAliases = {
        center: 'mid',
        middle: 'mid',
        1: '1',
        2: '2',
    };
    this.normalizePropertyName = (name, axis = null) => {
        if (this.hasOwnProperty(name)) {
            return name;
        }
        //aliases that don't require an axis
        else if (aliases.hasOwnProperty(name)) {
            return aliases[name];
        }
        //aliases requiring axis
        else if (axis === 'x' || axis === 'y' && unprefixedAliases.hasOwnProperty(name)) {
            return axis + unprefixedAliases[name];
        }
        else {
            throw 'Invalid property name "' + name + '" on axis "' + axis + '"';
        }
    };
    this.getProperty = (name, axis = null) => {
        try {
            name = this.normalizePropertyName(name, axis);
        }
        catch (e) {
            console.log(e);
        }
        return this[name];
    };
    this.setProperty = (name, axis, value) => {
        try {
            name = this.normalizePropertyName(name, axis);
        }
        catch (e) {
            console.log(e);
        }
        this[name] = value;
        return this;
    };
    this.getPoint = (xName, yName) => {
        return new RectanglePoint(
            this.getProperty(xName),
            this.getProperty(yName),
            xName,
            yName,
        );
    };
    this.setPoint = (point) => {
        this.setProperty(point.yName, 'y', point.y);
        this.setProperty(point.xName, 'x', point.x);

        //seems like a hacky fix
        /*								if( fixedPoint.xName == 'x2' ) {
                                            fixedPoint.xName = 'x';
                                        }
                                        if( fixedPoint.yName == 'y2' ) {
                                            fixedPoint.yName = 'y';
                                        }
                                        */

        return this;
    };
    this.getOppositePoint = (point) => {
        let names = point.oppositeNames();
        return this.getPoint(names.xName, names.yName);
    };
    this.containsPoint = (point) => {
        //returns true if the point is inside the rectangle OR on the border
        return ( point.x >= this.x1
            && point.x <= this.x2
            && point.y >= this.y1
            && point.y <= this.y2 );
    };
    this.clone = () => {
        return new Rectangle(this.width,this.height,this.x,this.y);
    };
}

function RectanglePoint(x, y, xName, yName) {
    this.x = x;
    this.y = y;
    this.xName = xName;
    this.yName = yName;
    this.oppositeNames = () => {
        return {
            xName: oppositePointName(this.xName),
            yName: oppositePointName(this.yName)
        }
    };
    Object.defineProperty(this, 'key', {
        get() {
            return this.xName + ',' + this.yName;
        }
    });
    this.clone = () => {
        return new RectanglePoint(this.x,this.y,this.xName,this.yName);
    }
}

function oppositePointName(name) {
    //switch x and y from 1 to 2, midpoints don't change
    if (name.endsWith('1')) {
        return name.replace('1', '2');
    } else if (name.endsWith('2')) {
        return name.replace('2', '1');
    } else {
        return name;
    }
    //TODO: possible support for aliases?
}

/*        class App extends React.Component {
            render() {
                return (
                    <ImageCropTool
                        x={0}
                        y={0}
                        width={500}
                        height={500}
                        imageSrc={"https://instagram.fhou1-2.fna.fbcdn.net/vp/ec35d7c616ff47143e546279afe4d817/5D73D91D/t51.2885-15/e35/53430142_140857863630868_8193251188453812603_n.jpg?_nc_ht=instagram.fhou1-2.fna.fbcdn.net"}
                    />
                );
            }
        }

        ReactDOM.render(<App/>, document.getElementById("root"));
				*/