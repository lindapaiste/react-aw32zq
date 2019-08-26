import React from 'react';
import {PostSingle} from './post';

export const PostArchive = (props) => {
  return(
      props.json.map( post => <PostSingle json={post} /> )
  )
};