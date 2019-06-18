import React from 'react';
import {buildApiUrl, buildQueryString} from './ApiHelperFunctions';

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

    static buildQueryString(parameters) {
        let queryString = '';
        if (typeof(parameters) === 'string') {
            queryString = parameters;
        } else if (typeof(parameters) === 'object') {
            queryString = Object.keys(parameters).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(parameters[key])
            }).join('&');
        }
        return queryString;
    }

    apiUrl() {
        console.log( 'api url is: ' );
        console.log( this.baseUrl() + '/?' + buildQueryString(this.props.parameters) );
        return this.baseUrl() + '/?' + buildQueryString(this.props.parameters);
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
      console.log( this.state.json );
        if (this.state.isLoaded) {
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