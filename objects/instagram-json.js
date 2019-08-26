import { MediaSizes } from './WpMedia';
import { SizedImage } from './SizedImage';

function searchForUser( name ) {
  let apiUrl = new InstagramSearchUrl(name).getApiUrl();
  return fetch( apiUrl )
  .then( response => response.json() )
  .then( json => findVerifiedUser(json) );
}

function findVerifiedUser( json ) {
  if ( ! json.users || ! json.users.length ) {
    return null;
  }
  //look at the first user and see if they are verified or if I am following them
  let first = json.users[0].user; //new InstagramUser( json.users[0].user );
  if ( first.is_verified || first.following ) {
    return first;
  } else {
    return null;
  }
}

//generic class to handle getting edges and edge nodes across all types
class InstagramJson {
  constructor(json) {
    if (json.hasOwnProperty('graphql')) {
      json = Object.values(json.graphql)[0];
    }
    this.json = json;
  }
  getProperty(name) {
    return this.json[name];
  }
  hasEdge(name) {
    return this.json.hasOwnProperty(name);
  }
  getEdge(name) {
    return this.json[name];
  }
  getEdgeProperty(name, propertyName) {
    if (this.hasEdge(name)) {
      const edge = this.getEdge(name);
      if (edge.hasOwnProperty(propertyName)) {
        return edge[propertyName];
      }
    }
    return undefined;
  }
  getEdgeCount(name) {
    return this.getEdgeProperty(name, 'count') || 0;
  }
  getEdgeNodes(name) {
    const edges = this.getEdgeProperty(name, 'edges') || [];
    return edges.map(json => json.node ? json.node : json);
  }
}

export class InstagramPost extends InstagramJson {
  getTaggedUsers() {
    return this.getEdgeNodes('edge_media_to_tagged_user')
      .map(node => new InstagramUser(node.user));
  }
  getUser() {
    return new InstagramUser(this.getProperty('owner'));
  }
  getAllUsers() {
    const tagged = this.getTaggedUsers(),
      user = this.getUser();
    return (user) ? tagged.concat(user) : tagged;
  }
  getUnusedTags() {
    if ( ! this.isGallery() ) return [];
    //get tags on all individual photos
    const photoTags = [];
    this.getChildren().forEach (
      photo => photo.getTaggedUsers().map(
        user => photoTags.push( user.getId() )
      )
    );
    const unused = this.getTaggedUsers().filter(
      user => ! photoTags.includes( user.getId )
    );
    return unused;
  }
  getCaption() {
    const nodes = this.getEdgeNodes('edge_media_to_caption');
    if (nodes.length > 0 && nodes[0].hasOwnProperty('text')) {
      return nodes[0].text;
    } else return '';
  }
  getResourcesJson() {
    const children = this.getEdgeNodes('edge_sidecar_to_children');
    const resources = (children.length > 0) ? children : [this.json];
    return resources;
  }
  getImages() {
    return this.getResourcesJson().map(json => new IgMedia(json));
  }
  getPhotos() {
    return this.getResourcesJson().map(json => new InstagramPhoto(json));
  }
  getPrimaryImage() {
    return new IgMedia(this.json);
  }
  getChildren() {
    const children = this.getEdgeNodes('edge_sidecar_to_children');
    return children.map( child => new InstagramPhoto(child) );
  }
  isGallery() {
    return this.hasEdge('edge_sidecar_to_children') || this.json.__typename == 'GraphSidecar';
  }
  getLink() {
    return 'https://www.instagram.com/p/' + this.json.shortcode + '/';
  }
}

export class InstagramPhoto extends InstagramPost {

}

export class InstagramGallery extends InstagramPost {
  getResourceTags() {

  }
  getUnusedTags() {

  }

}

export class InstagramGalleryPhoto extends InstagramPhoto {

}

export class InstagramUser extends InstagramJson {
  getUsername() {
    return this.json.username;
  }
  getFullName() {
    return this.json.full_name;
  }
  getId() {
    return this.json.id;
  }
  getProfilePic(hd = false) {
    if (hd && this.json.profile_pic_url_hd) {
      return SizedImage.fromValues( this.json.profile_pic_url_hd, 320, 320 );
    }
    return SizedImage.fromValues( this.json.profile_pic_url, 150, 150 );
  }
  isVerified() {
    return this.json.is_verified;
  }
}

export class InstagramUserProfile extends InstagramUser {
  getFollowerCount() {
    //property is only in full json from profile page, not in single
    return this.getEdgeCount('edge_followed_by');
  }  
  getPosts() {
    const posts = this.getEdgeNodes('edge_owner_to_timeline_media');
    return posts.map(post => new InstagramPost(post));
  }
  getPostShortcodes() {
    const posts = this.getEdgeNodes('edge_owner_to_timeline_media');
    return posts.map(post => post.shortcode);
  }
}

//convert instagram resource to Wordpress MediaSizes for compatibility with WP API
function IgMedia(resource) {
  //temorary
  const aspectRatio = resource.dimensions.width / resource.dimensions.height;
  const sizesJson = resource.display_resources || resource.thumbnail_resources; //feed uses thumbnail_ but single uses display_
  const sizesArray = sizesJson.map(
    size => new IgSizedImage(size)
  )
  const sizesObject = { ...sizesArray };
  return new MediaSizes(sizesObject, aspectRatio);
}

//rename fields on individual size
function IgSizedImage(json) {
  return SizedImage.fromValues( json.src, json.config_width, json.config_height );
}

export class InstagramUrl {
  static base = 'https://www.instagram.com/';
  constructor( url ) {
    this.url = new URL( url, this.constructor.base );
    //super( url, base || 'https://www.instagram.com/' );
  }
  getUrl() {
    this.url.search = '';
    return this.url.href;
  }
  getApiUrl() {
    this.url.search = '?__a=1';
    return this.url.href;
  }
}

export class InstagramPhotoUrl extends InstagramUrl {
  static base = 'https://www.instagram.com/p/';
  getOEmbedUrl() {
    return 'https://api.instagram.com/oembed/?url=' + this.getUrl();
  }
}

export class InstagramProfileUrl extends InstagramUrl {

}

export class InstagramSearchUrl {
  constructor( query ) {
    const url = 'https://www.instagram.com/web/search/topsearch/?context=blended&query=' + query;
    this.url = new URL( url );
  }
  getApiUrl() {
    return this.url.href;
  }
}
/*
IGPhotoUrl.extractId = (string) => {
  console.log(string);
  let match = string.match(/\b[0-9a-zA-Z_\\-]{11}\b/);
  return match ? match[0] : undefined;
}

IGUserUrl.extractUsername = (string) => {
  let urlMatch = string.match(/instagram.*\/([0-9a-zA-Z_\-\.]+)\b/);
  if (urlMatch) return urlMatch[1];
  let fullMatch = string.match(/^[0-9a-zA-Z_\-\.]+$/);
  return fullMatch ? fullMatch[0] : undefined;
}
*/