import React, { Component } from 'react';
import { render } from 'react-dom';
import PostContainer from './containers/PostContainer.jsx';
import {PostSingle, TypePost} from './components/post.jsx';
import Header from './templates/header.jsx';
import './style.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <Header />
        <PostContainer
          id={170171}
          postType={'hair'}
          render={TypePost}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
