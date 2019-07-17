import React, { Component } from 'react';
import { render } from 'react-dom';
import PostContainer from './containers/PostContainer.jsx';
import {PostSingle, TypePost} from './components/post.jsx';
import {CptPortalItemFromPost} from './components/portal.jsx';
import Header from './templates/header.jsx';
import PostCreator from './admin/create-post.jsx';
import './style.css';
import Wikipedia from './helpers/wikipedia.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Wikipedia 
        name='Hailey Baldwin'
        />
      </div>
    );
  }
}

class App2 extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <PostCreator />
    )
  }
}

render(<App />, document.getElementById('root'));
