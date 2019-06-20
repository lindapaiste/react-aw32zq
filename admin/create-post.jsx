import React, {Component} from 'react';

const Sample = {
  status: 'draft',
  title: 'attempting to make a post',
  content: 'lorem ipsum',
  author: 5298,
  //featured_media	The ID of the featured media for the object.
  //meta	Meta fields.
  categories: [12175,10695],
  tags: [6605],
};

export default class PostCreator extends React.Component {
  constructor( props ) {
    super(props);
    this.state = {
      post: Sample,
      uploaded: false,
    }
  }
  componentDidMount() {
    console.log( this.state.post );
    console.log( JSON.stringify(this.state.post));
    this.upload();
  }
  upload() {
    fetch('https://stealherstyle.net/wp-json/wp/v2/posts', {
      method: 'POST',
      body: JSON.stringify(this.state.post)
    }).then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(data) {
      console.log('post created');
      console.log(data);
      this.setState({
        uploaded: true,
      });
    });
  }
  render() {
    return(
      <div>PostCreator</div>
    );
  }
}

//need to authenticate:
//https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/