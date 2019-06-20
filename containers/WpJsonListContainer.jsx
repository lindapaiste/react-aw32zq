import React, {Component} from 'react';
import {buildApiUrl} from '../helpers/url-builders';


//TODO: support -1 for no limit
export default class WpJsonListContainer extends React.Component {
    static defaultProps = {
        endpoint: 'posts',
        parameters: {},
        namespace: 'wp/v2',
        limit: 10,
    };

    constructor(props) {
        super(props);
        this.state = {
            hasData: false,
            isComplete: false,
            json: [],
            currentPage: this.props.parameters.page || 1,
        }
    }

    componentDidMount() {
        this.loadJson();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentPage !== prevState.currentPage && !this.state.isComplete) {
            this.loadJson();
        }
    }

    baseUrl() {
        return 'https://stealherstyle.net/wp-json/' + this.props.namespace + '/' + this.props.endpoint;
    }

    limitRemaining() {
        return this.props.limit - this.state.json.length;
    }

    apiUrl() {
        let parameters = this.props.parameters;
        //override page and per_page
        parameters.page = this.state.currentPage;
        parameters.per_page = parameters.per_page || Math.min(this.limitRemaining(), 100);
        return buildApiUrl( this.baseUrl(), parameters);

    }

    loadJson() {
        fetch(this.apiUrl())
            .then(response => response.json())
            .then(json =>
                this.setState((prevState, props) => ({
                        json: prevState.json.concat(json),
                        hasData: true,
                        isComplete: ((json.length + prevState.json.length) >= props.limit) || (json.length === 0),
                        currentPage: prevState.currentPage + 1,
                    })
                ))
            .catch(error =>
                this.setState({
                    error: error,
                    hasData: true,
                })
            );
    }

    render() {
        if (this.state.hasData) {
            return this.props.render({
                items: this.state.json,
                error: this.state.error,
            });
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

export const CategoryListContainer = (props) => {
    return (
        <WpJsonListContainer
            endpoint="categories"
            limit={5000}
            render={props.render}
        />
    )
};


