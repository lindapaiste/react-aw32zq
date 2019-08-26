import React, {Component} from 'react';
import {Text, View} from 'react-native'; //temporary for testing
import {MediaSizes} from './WpMedia';

//for compatibility with WP API
export function IGSizedImage( json ) {
  this.width = json.config_width;
  this.height = json.config_height;
  this.source_url = json.src;
}

function IGMedia( resource ) {
  const aspectRatio = resource.dimensions.width / resource.dimensions.height;
  const sizesArray = resource.display_resources.map(
    size => new IGSizedImage( size )
  )
  const sizesObject = {...sizesArray};
  return new MediaSizes( sizesObject, aspectRatio );
}

function IGPhotoUrl( urlOrId ) {
  this.id = this.constructor.extractId( urlOrId );
  Object.defineProperty(this, 'url', {
    get() {
      return 'https://www.instagram.com/p/' + this.id + '/';
    },
    set(value) {
      this.id = this.constructor.extractId(value);
    }
  });
  Object.defineProperty(this, 'apiUrl', {
    get() {
      return this.url + '?__a=1';
    }
  });
  Object.defineProperty(this, 'oEmbedUrl', {
    get() {
      return 'https://api.instagram.com/oembed/?url=' + this.url;
    }
  });
}
IGPhotoUrl.extractId = (string) => {
  console.log( string );
  let match = string.match(/\b[0-9a-zA-Z_\\-]{11}\b/);
  return match ? match[0] : undefined;
}

function IGUserUrl( urlOrUsername ) {
  this.username = this.constructor.extractUsername( urlOrUsername );
  Object.defineProperty(this, 'url', {
    get() {
      return 'https://www.instagram.com/' + this.username;
    },
    set(value) {
      this.id = this.constructor.extractUsername(value);
    }
  });
  Object.defineProperty(this, 'apiUrl', {
    get() {
      return this.url + '?__a=1';
    }
  });
}
IGUserUrl.extractUsername = (string) => {
  let urlMatch = string.match(/instagram.*\/([0-9a-zA-Z_\-\.]+)\b/);
  if ( urlMatch ) return urlMatch[1];
  let fullMatch = string.match(/^[0-9a-zA-Z_\-\.]+$/);
  return fullMatch ? fullMatch[0] : undefined;
}

function IGGenericJson(json) {
  this.json = json;
    this.getProperty = ( name ) => {
      return this.json[name];
    }
    this.hasEdge = ( name ) => {
        return this.json.hasOwnProperty( name );
    };
    this.getEdge = ( name ) => {
      return this.json[name];
    }
    this.getEdgeProperty = ( name, propertyName ) => {
      if ( this.hasEdge( name ) ) {
            const edge = this.getEdge(name);
            if ( edge.hasOwnProperty( propertyName ) ) {
              return edge[propertyName];
            }
      }
      return undefined;
    };
    this.getEdgeCount = ( name ) => {
        return this.getEdgeProperty( name, 'count' ) || 0;
    };
    this.getEdgeNodes = ( name ) => {
        const edges = this.getEdgeProperty( name, 'edges' ) || [];
        return edges.map( json => json.node ? json.node : json );
    };
}

function IGSingleJson(json) {
    if ( json.hasOwnProperty('graphql') && json.graphql.hasOwnProperty('shortcode_media') ) {
      json = json.graphql.shortcode_media;
    }
    this.json = json;
    this.handler = new IGGenericJson(json);

    this.getTaggedUsers = () => {
        return this.handler.getEdgeNodes( 'edge_media_to_tagged_user' )
            .map( node => new IGUserJson( node.user ) );
    };
    this.getUser = () => {
        return new IGUserJson( this.handler.getProperty('owner') );
    };
    this.getAllUsers = () => {
        const tagged = this.getTaggedUsers(),
            user = this.getUser();
        return ( user ) ? tagged.concat(user) : tagged;
    };
    this.getCaption = () => {
        const nodes = this.handler.getEdgeNodes( 'edge_media_to_caption' );
        if ( nodes.length > 0 && nodes[0].hasOwnProperty('text') ) {
            return nodes[0].text;
        } else return '';
    };
    this.getResources = () => {
        const children = this.handler.getEdgeNodes( 'edge_sidecar_to_children' );
        return ( children.length > 0 ) ? children : [this.json];
    };
    this.isGallery = () => {
        return this.handler.hasEdge( 'edge_sidecar_to_children' );
    };
}

function IGUserJson(json) {
    if ( json.hasOwnProperty('graphql') && json.graphql.hasOwnProperty('user') ) {
      json = json.graphql.user;
    }
    this.json = json;
    this.handler = new IGGenericJson( json );
    
    this.getFollowerCount = () => {
      //property is only in full json from profile page, not in single
      return this.handler.getEdgeCount('edge_followed_by');
    }
    this.getUsername = () => {
      return this.json.username;
    }
    this.getFullName = () => {
      return this.json.full_name;
    }
    this.getId = () => {
      return this.json.id;
    }
    this.getProfilePic = ( hd = false ) => {
      if ( hd && this.json.profile_pic_url_hd ) {
        return this.json.profile_pic_url_hd;
      }
      return this.json.profile_pic_url;
    }
    this.isVerified = () => {
      return this.json.is_verified;
    }
    this.getPosts = () => {
      return this.handler.getEdgeNodes('edge_owner_to_timeline_media');
    }
}

//handle functionality that would otherwise be duplicated between single and user fetching
//takes functions apiUrl and createJsonObject to determine specific functionality
//DOES NOT WORK
class InstagramGenericContainer extends Component {
    constructor() {
      super();
      this.state = {
        loaded: false
      }
      console.log( 'generic container props' );
      console.log( this.props );
      //console.log( this.props.apiUrl );
      //console.log( this.props.render );
    }
    componentDidMount() {
      //this.loadJson();
    }
    loadJson() {
      fetch( this.props.apiUrl )
        .then( response => response.json() )
        .then( json => this.setState({
          loaded: true,
          object: this.props.createJsonObject( json )
        }))
        .catch( error => this.setState({
          loaded: true,
          error: error,
        }));
    }
    render() {
      return(
        <Text>Hello World</Text>
        /*
        this.props.render({
          loaded: this.state.loaded,
          object: this.state.object,
          error: this.state.error
        })*/
      )
    }
}

export class InstagramSingleContainer extends Component {
  constructor() {
      super();
      this.state = {
        loaded: false
      }
    }
    componentDidMount() {
      this.loadJson();
    }
    apiUrl() {
      const urlObject = new IGPhotoUrl( this.props.id );
      return urlObject.apiUrl;
    }
    loadJson() {
      fetch( this.apiUrl() )
        .then( response => response.json() )
        .then( json => this.setState({
          loaded: true,
          object: new IGSingleJson( json )
        }))
        .catch( error => this.setState({
          loaded: true,
          error: error,
        }));
    }
    render() {
      return(
        this.props.render({
          loaded: this.state.loaded,
          object: this.state.object,
          error: this.state.error
        })
      )
    }
}

export class InstagramUserContainer extends Component {
  constructor() {
      super();
      this.state = {
        loaded: false
      }
    }
    componentDidMount() {
      this.loadJson();
    }
    apiUrl() {
      console.log( this.props );
      console.log( this.props.username );
      const urlObject = new IGUserUrl( this.props.username );
      return urlObject.apiUrl;
    }
    loadJson() {
      console.log( this.apiUrl );
      fetch( this.apiUrl() )
        .then( response => response.json() )
        .then( json => this.setState({
          loaded: true,
          object: new IGUserJson( json )
        }))
        .catch( error => this.setState({
          loaded: true,
          error: error,
        }));
    }
    render() {
      console.log( this.state.object );
      console.log( 'render function' );
      console.log( this.props.render );
      return ( <View>
{this.props.render({
          loaded: this.state.loaded,
          object: this.state.object,
          error: this.state.error
        })}
      <Text>loaded? {this.state.loaded} errors: {this.state.errors} object {JSON.stringify(this.state.object)}</Text>
      </View> );
      /*
      return(
        this.props.render({
          loaded: this.state.loaded,
          object: this.state.object,
          error: this.state.error
        })
      )*/
    }
}