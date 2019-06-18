import {PostSingle} from './post.jsx';

export const PostArchive = (props) => {
  return(
      props.json.map( post => <PostSingle json={post} /> )
  )
};