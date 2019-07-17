import React, {Component} from 'react';

/* requires props: url and render */
/* optional props: jsonToObject */
export default class FetchContainer extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    this.loadJson();
  }
  loadJson() {
    fetch(this.props.url )
      .then(response => response.json())
      .then(json => this.setState({
        loaded: true,
        json: json
      }))
      .catch(error => this.setState({
        loaded: true,
        error: error,
      }));
  }
  render() {
    return (
      this.props.render({
        loaded: this.state.loaded,
        json: this.state.json,
        object: ( this.props.hasOwnProperty('jsonToObject') ) ? this.props.jsonToObject(this.state.json) : undefined,
        error: this.state.error
      })
    )
  }
}