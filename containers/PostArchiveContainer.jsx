import WpJsonListContainer from "./WpJsonListContainer";

//category archive has a category id and an optional post type

//https://stealherstyle.net/wp-json/wp/v2/posts?categories=5651&_embed

function addParameters( original, overrides ) {
    if ( typeof( original ) !== 'object' ) {
        original = {};
    } //handles undefined
    return {...original, ...overrides};
}

export const PostArchiveContainer = (props) => {
    return (
        <WpJsonListContainer
            endpoint="posts"
            //limit={10}
            render={props.render}
            parameters={props.parameters} //page is included here
        />
    );
};

export const TypeArchiveContainer = (props) => {
    return (
        <WpJsonListContainer
            endpoint={props.postType} //TODO: mapping to endpoint
            //limit={10}
            render={props.render}
            parameters={props.parameters} //page is included here
        />
    );
};


export const CategoryArchiveContainer = (props) => {
    const overrides = {
        categories: props.id,
    };
    return (
        <PostArchiveContainer
            render={props.render}
            parameters={addParameters(props.parameters, overrides)}
        />
    )
};

export const CptArchiveContainer = (props) => {
    const overrides = {
        categories: props.id,
    };
    return (
        <TypeArchiveContainer
            postType={props.postType}
            render={props.render}
            parameters={addParameters(props.parameters, overrides)}
        />
    )
};