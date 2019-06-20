import React, {Component} from 'react';
import {PostArchiveContainer, CategoryArchiveContainer} from "../containers/PostArchiveContainer.jsx";
import WpPostObject from '../helpers/post-json.jsx';

export const Portal = (props) => {
  const count = React.Children.count(props.children);
  let columns = props.columns || 6;
  columns = Math.min( columns, count );
  return (
    <div className={"portal-container columns-" + columns + " clearfix"}>
      {props.children}
    </div>
  )
}

export const SinglePostPortal = (props) => {
  return(
    <Portal columns={props.columns}>
      {props.items.map( item => 
        <SinglePostPortalItem 
          key={item.id}
          json={item} 
          size={props.size}
        />
      )}
    </Portal>
  )
};

export const PostTypePortal = (props) => {

};


export const PortalOutfitsInCategory = (props) => {
  //TODO: exclude current post
  return (
    <CategoryArchiveContainer 
      endpoint='posts'
      parameters={{_embed: true}} //exclude
      id={props.id}
      render={(data) => <SinglePostPortal {...data} size='thumbnail' columns={6} />}
    />
  )
}

export const PortalItem = (props) => {
  return (
      <a
          href={props.url}
          onClick={props.onClick}
      >
      <div className="portal-image">
          <img
              src={props.image.source_url}
              width={props.image.width}
              height={props.image.height}
              alt={props.alt}
              title={props.alt}
              //TODO: required width/height with CSS crop, separate element
          />
          {props.text &&
          <div className="portal-txt white">
              {props.text}
          </div>
          }
      </div>
  </a>
      )
};

//props: json and size
export const CptPortalItemFromPost = (props) => {
    const post = props.post || new WpPostObject(props.json);
  const media = post.featuredImage() || {};
  const sized = post.sizedImage( props.size || 'thumbnail');
    const title = post.category().name + ' ' + post.postType();
  return (
      <PortalItem
          url={post.cptUrl()}
          //onClick=
          image={sized}
          alt={title}
          text={title}
      />
  )
};

//props: json and size
export const SinglePostPortalItem = (props) => {
  const post = props.post || new WpPostObject(props.json);
  const media = post.featuredImage() || {};
  const sized = post.sizedImage( props.size || 'thumbnail');
  return (
      <PortalItem
          url={post.json.link}
          //onClick=
          image={sized}
          alt={post.title()}
          text={} //none
      />
  )
};



export const PortalItemImage = (props) => {

  return null;
};
