import React from 'react';
import FetchContainer from '../containers/FetchContainer';

//----------------------------------AUTHENTICATED API--------------------------------//

class IGFollowingList extends React.Component {
    constructor() {
        super();
        this.state = {
            apiLoaded: false,
            apiData: null,
        }
    }

    componentDidMount() {
        this.loadApiData();
    }

    loadApiData() {
        const apiUrl = 'https://api.instagram.com/v1/users/self/follows'
            + '?client_id=542bc52290bc42e98d718b71cae68f92'
            + '&access_token='
            + getIGAccessToken();
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => this.setState({
                apiData: json,
                apiLoaded: true,
            }));
    }

    render() {
        console.log(this.state.apiData);
        return (
            <div>Do Something Here</div>
        )
    }
}

function getIGAccessToken() {
    let hash = window.location.hash;
    if (hash && hash.startsWith('#access_token=')) {
        return hash.split('=')[1];
    } else {
        fetchIGAccessToken();
        return null;
    }
}

function fetchIGAccessToken() {
    const currentUrl = window.location.href;
    const authUrl = 'https://api.instagram.com/oauth/authorize/'
        + '?client_id=542bc52290bc42e98d718b71cae68f92'
        + '&redirect_uri=' + currentUrl
        + '&response_type=token'
        + '&scope=basic+public_content+follower_list+comments';
    //do the redirect_uri
    window.location = authUrl;
    //TODO: store the token
}