import React from 'react';
import WpJsonItemContainer from './WpJsonItemContainer';

export default (props) => {
    //TODO: map post types to endpoints
    let postType = props.postType || 'posts';
    let parameters = props.parameters || {};
    parameters._embed = true;
    return (
        <WpJsonItemContainer
            endpoint={postType}
            id={props.id}
            parameters={parameters}
            render={props.render}
        />
    )
};