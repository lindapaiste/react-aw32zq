
export default function Rectangle(width = 0, height = 0, x = 0, y = 0) {
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

export function RectanglePoint(x, y, xName, yName) {
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