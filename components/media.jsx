import React, {Component} from 'react';

function findMediaApi(postId, postType = 'posts') {
    let postApi = 'https://stealherstyle.net/wp-json/wp/v2/' + postType + '/' + postId;
    return fetch(postApi)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data._links["wp:featuredmedia"][0].href || null;
        });
}

const MediaContainer = (props) => {
    return (
        <WpJsonItemContainer
            endpoint="media"
            id={props.id}
            render={props.render}
        />
    );
};

// if ( props.json.media_type === 'image' ) {


export const SizedMedia = ({json, size = 'large'}) => {
 return( 
    <ImageFromJson
      json={SizedMediaJson(json, size)}
    />
  );
};

export const SizedMediaJson = (json, size = 'large') => {
  console.log('complete media json:');
  console.log(json);
  const details = json.media_details || {};
  console.log(details);
    const sizes = details.sizes || {};
    console.log(sizes);
    //if ( props.json.media_details.sizes.hasOwnProperty( props.size ) ) {
    return sizes[size] || sizes.large || {}; //default to size large
};

//props: json and alt
export const ImageFromJson = (props) => {
   console.log('sized image json:');
 console.log(props.json);
    return (
        <img src={props.json.source_url} width={props.json.width} height={props.json.height} alt={props.alt}/>
    )
};


function getFeaturedImageJson(postId, postType = 'post') {
    let promise = findMediaApi(postId, postType);
    return promise.then(function (mediaApi) {
        return fetchMediaApi(mediaApi)
    });
}

function getFeaturedImageElement(postId, postType = 'post') {
    let promise = getFeaturedImageJson(postId, postType);
    return promise.then(function (json) {
        let large = json.media_details.sizes.large || null;
        if (large) {
            let imgElement = new Image(large.width, large.height);
            imgElement.src = large.source_url;
            return imgElement;
            //return <img src={large.source_url} width={large.width} height={large.height} />
        } else return null;
    });
}

class FeaturedImageOld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            width: 0,
            height: 0,
            //mediaApi: this.props.mediaId ? 'https://stealherstyle.net/wp-json/wp/v2/media/' + this.props.mediaId : null,
        };
    }

    componentDidMount() {
        let mediaApi = this.props.mediaId ? 'https://stealherstyle.net/wp-json/wp/v2/media/' + this.props.mediaId : this.findMediaApi();
        this.setState({mediaApi: mediaApi});
        //setting state here will force the media api to be fetched
    }

    componentDidUpdate() {
        if (!this.state.src) {
            this.fetchMedia();
        }
    }

    findMediaApi() {
        if (!this.props.postId) return null;
        let postType = this.props.postType || 'post';
        let postApi = 'https://stealherstyle.net/wp-json/wp/v2/' + postType + '/' + this.props.postId;
        fetch(postApi)
            .then(response => response.json())
            .then(data => {
                let media = data._links["wp:featuredmedia"];
                if (media.length > 0) {
                    this.setState({mediaApi: media[0].href});
                }
            });
    }

    fetchMedia() {
        if (!this.state.mediaApi) return;
        fetch(this.state.mediaApi)
            .then(response => response.json())
            .then(data => {
                let large = data.media_details.sizes.large;
                this.setState({src: large.source_url});
                this.setState({width: large.width});
                this.setState({height: large.height});
            });
    }

    render() {
        return (
            <img src={this.state.src} width={this.state.width} height={this.state.height}/>
        )
    }
}