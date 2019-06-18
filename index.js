import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import PostContainer from './api/PostContainer';
import PostSingle from './PostSingle';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <PostContainer
          id={174380}
          render={PostSingle}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
