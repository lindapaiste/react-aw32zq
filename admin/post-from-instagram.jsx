//----------------------------------LOGIC COMPONENTS--------------------------------//

class IGPostAdminTool extends React.Component {
    constructor() {
        super();
        this.state = {
            hasUrl: false,
            url: '',
            apiUrl: null,
            apiLoaded: false,
            apiData: null,
        }
    }

    handleInputChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    componentDidUpdate() {
        if (!this.state.hasUrl) {
            if (isValidIGUrl(this.state.url)) {
                this.setState({
                    hasUrl: true,
                });
                this.loadApiData();
            }
        }
    }

    loadApiData() {
        const apiUrl = getIGApiUrl(this.state.url);
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => this.setState({
                apiData: json,
                apiLoaded: true,
            }));
    }



    render() {
        return (
            <div className={"instagram-post-tool"}>
                {this.state.hasUrl ||
                <ManagedTextInput
                    id="instagram-url"
                    value={this.state.url}
                    onChange={(e) => this.handleInputChange(e)}
                    label='Enter Instagram URL:'
                />
                }
                {this.state.apiLoaded &&
                <IGPostCreator json={new IGSingleJson( this.state.apiData.graphql.shortcode_media )}/>
                }
            </div>
        )
    }
}

function isValidIGUrl(url) {
    return (url.match(/instagram.com\/p\/[0-9a-zA-Z_-]{11}/));
}

function getIGApiUrl(url) {
    let match = isValidIGUrl(url);
    if (!match) return null;
    return 'https://' + match[0] + '/?__a=1';
}

if (!Array.prototype.last) {
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
}


function IGSingleJson(json) {
    this.json = json;
    this.taggedUsers = () => {
        return this.getEdgeNodes( 'edge_media_to_tagged_user' )
            .map( node => node.user );
    };
    this.user = () => {
        return this.json.owner;
    };
    this.ownerAndTagged = () => {
        const tagged = this.taggedUsers(),
            user = this.user();
        return ( user ) ? tagged.concat(user) : tagged;
    };
    this.caption = () => {
        const nodes = this.getEdgeNodes( 'edge_media_to_caption' );
        if ( nodes.length > 0 && nodes[0].hasOwnProperty('text') ) {
            return nodes[0].text;
        } else return '';
    };
    this.getResources = () => {
        const children = this.getEdgeNodes( 'edge_sidecar_to_children' );
        return ( children.length > 0 ) ? children : [this.json];
    };
    this.isGallery = () => {
        return this.hasEdge( 'edge_sidecar_to_children' );
    };
    this.hasEdge = ( name ) => {
        return this.json.hasOwnProperty( name );
    };
    this.getEdgeProperty = ( edgeName, propertyName ) => {
      if ( this.hasEdge( edgeName ) ) {
            const edge = this.json[edgeName];
            if ( edge.hasOwnProperty( propertyName ) ) {
              return edge[propertyName];
            }
      }
    };
    this.getEdgeCount = ( name ) => {
        return this.getEdgeProperty( name, 'count' ) || 0;
    };
    this.getEdgeNodes = ( name ) => {
        const edges = this.getEdgeProperty( name, 'edges' ) || [];
        return edges.map( json => json.node ? json.node : json );
    };
}

class IGPostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSaved: false,
            postType: null,
            selectedResource: null,
        }
    }
    componentDidMount() {
        this.setState({
            byline: this.byline()
        });
        this.setState({
            postText: this.defaultText()
        });
        if ( ! this.props.json.isGallery() ) {
            this.setState({
                selectedResource: this.props.json.getResources()[0]
            });
        }
    }

    byline() {
        return 'Instagram / @' + this.props.json.user().username;
    }

    defaultText() {
        return this.props.json.user().full_name + ' posted a photo on instagram with the caption ' + this.props.json.caption();
    }

    selectResource( json ) {
        this.setState({
            selectedResource: json
        });
    }
    selectPostType( value ) {
        this.setState({
            postType: value
        });
    }
    //create a draft and redirect to edit screen
    render() {
        console.log(this.state);
        if ( this.state.selectedResource ) {
            return (
                <div>
                    <h3>Select Post Type</h3>
                    <ChoosePostType onSelect={(selected) => this.selectPostType(selected)} />
                    <h3>Add Tags</h3>
                    {this.props.json.ownerAndTagged().map( user => <IGUserFromJson json={user} key={user.username}/>)}
                    <h3>Crop Image</h3>
                    <IGImageBoundingBox json={this.state.selectedResource} postType={this.state.postType} />
                </div>
            )
        } else {
            return (
                <IGImageSelector resources={this.props.json.getResources()} onSelect={(selected) => this.selectResource(selected)} />
            )
        }
    }
}


class ChoosePostType extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {};
    }
    handleChange = (event) => {
        console.log( event.target );
        this.setState({ post_type: event.target.value });
        this.props.onSelect( event.target.value );
    };
    render() {
        return(
            <ManagedSelect name="post_type" value={this.state.post_type} onChange={this.handleChange} >
                <Option value="hair" label="Hair" />
                <Option value="makeup" label="Makeup" />
                <Option value="nails" label="Nails" />
                <Option value="tattoos" label="Tattoo" />
                <Option value="piercings" label="Piercing" />
                <Option value="products" label="Product" />
            </ManagedSelect>
        )
    }
}

class IGImageSelector extends React.Component {
    selectImage(json) {
        //TODO: animation? are you sure?
        this.props.onSelect(json);
    }
    render() {
        console.log( this.props );
        if ( Array.isArray(this.props.resources) ) {
            return (
                <div className="ig-select-image">
                    <h3>Choose an Image</h3>
                    {this.props.resources.map(json => <IGImage key={json.id} json={json}
                                                               onClick={() => this.selectImage(json)}/>)}
                </div>
            );
        }
    }
}

//----------------------------------HANDLING USER IDS--------------------------------//

const ExistingTerm = ( id ) => {

};

function saveIGId( termId, id ) {
    const data = {
        term_id: termId,
        key: 'instagram_id',
        value: id,
        unique: true,
    };
    fetchAdminAjax( 'add_term_meta', data );
}

const IGUserFromJson = (props) => {
  return (
      <IGUser {...props.json} />
  )
    //full_name, id, is_verified, profile_pic_url, username
};

const IGUserFromUserName = (props) => {
    const apiUrl = 'https://www.instagram.com/' + props.username + '/?__a=1';
    return fetch(apiUrl)
        .then( response => response.json() )
        .then( json => <IGUserFromJson json={json} /> );
};

class IGUser extends React.Component {
    constructor() {
        super();
    }
    render() {
        console.log(this.props);
        return (
            <div className="instagram-user">
                <div className="icon"><img src={this.props.profile_pic_url} /></div>
                <div className="username">{this.props.username}</div>
                <div className="fullname">{this.props.full_name}</div>
                {this.props.is_verified &&
                <div className={"verified"}>Verified</div>
                }
            </div>
        )
    }
}

//----------------------------------AUTHENTICATED API--------------------------------//

class IGFollowingList extends React.Component {
    constructor() {
        super();
        this.state = {
            apiLoaded: false,
            apiData: null,
        }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData() {
        const apiUrl = 'https://api.instagram.com/v1/users/self/follows'
            + '?client_id=542bc52290bc42e98d718b71cae68f92'
            + '&access_token='
            + getIGAccessToken();
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => this.setState({
                apiData: json,
                apiLoaded: true,
            }));
    }

    render() {
        console.log(this.state.apiData);
        return (
            <div>Do Something Here</div>
        )
    }
}

function getIGAccessToken() {
    let hash = window.location.hash;
    if (hash && hash.startsWith('#access_token=')) {
        return hash.split('=')[1];
    } else {
        fetchIGAccessToken();
        return null;
    }
}

function fetchIGAccessToken() {
    const currentUrl = window.location.href;
    const authUrl = 'https://api.instagram.com/oauth/authorize/'
        + '?client_id=542bc52290bc42e98d718b71cae68f92'
        + '&redirect_uri=' + currentUrl
        + '&response_type=token'
        + '&scope=basic+public_content+follower_list+comments';
    //do the redirect_uri
    window.location = authUrl;
    //TODO: store the token
}

//----------------------------------PRESENTATIONAL COMPONENTS--------------------------------//


const IGImageBoundingBox = (props) => {
    //actual width and height may be smaller than what's in the API, especially for video thumbnails
    //so load the image to get the size, don't rely on the stated size
    const aspectRatio = (props.postType === 'hair') ? 2 / 3 : 1;
    return (
        <ImageCropTool
            aspectRatio={aspectRatio}
            imageSrc={props.json.display_url}
        />
    );
};

/*
const IGImageBoundingBox = (props) => {
    //TODO: actual width and height may be smaller than what's in the API, especially for video thumbnails
    console.log(props);
    const targetWidth = 500,
        targetHeight = (props.postType === 'hair' ) ? 750 : 500,
        imageWidth = props.json.dimensions.width,
        imageHeight = props.json.dimensions.height,
        src = props.json.display_url;
    console.log(props.postType);
    console.log( 'targetWidth' + targetWidth );
    console.log( 'targetHeight' + targetHeight );
    console.log( 'imageWidth' + imageWidth );
    console.log( 'imageHeight' + imageHeight );
    const scale = Math.min(
        imageHeight / targetHeight,
        imageWidth / targetWidth
    );
    const cropWidth = scale * targetWidth,
        cropHeight = scale * targetHeight;
    console.log( 'cropWidth' + cropWidth );
    console.log( 'cropHeight' + cropHeight );
    const x = (imageWidth - cropWidth) / 2,
        y = (imageHeight - cropHeight) / 2;
    return (
        <ImageCropTool
            x={x}
            y={y}
            width={cropWidth}
            height={cropHeight}
            imageSrc={src}
        />
    )
};*/

const IGImage = (props) => {
  return (
      <img
          src={props.json.display_url}
          //width={props.json.dimensions.width}
          //height={props.json.dimensions.height}
          onClick={props.onClick}
      />
  )
};

