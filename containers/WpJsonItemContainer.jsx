import React, {Component} from 'react';
import {buildApiUrl} from '../helpers/url-builders';

export default class WpJsonItemContainer extends React.Component {
    //requires prop "id"
    static defaultProps = {
        endpoint: 'posts',
        parameters: {},
        namespace: 'wp/v2',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            json: {},
        }
    }

    componentDidMount() {
        this.loadJson();
    }

    baseUrl() {
        return 'https://stealherstyle.net/wp-json/' + this.props.namespace + '/' + this.props.endpoint + '/' + this.props.id;
    }

    apiUrl() {
        return buildApiUrl( this.baseUrl(), this.props.parameters);
    }

    loadJson() {
        fetch(this.apiUrl())
            .then(response => response.json())
            .then(json =>
                this.setState({
                    json: json,
                    isLoaded: true,
                })
            )
            .catch(error =>
                this.setState({
                    error: error,
                    isLoaded: true,
                })
            );
    }

    render() {
        if (this.state.isLoaded) {
          console.log('props:');
          console.log(this.props);
            return this.props.render({
                json: this.state.json,
                error: this.state.error,
            });
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}