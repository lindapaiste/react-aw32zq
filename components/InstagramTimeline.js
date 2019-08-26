import React from 'react';
import { View, Text } from './elements';
import Link from './Link';
import { InstagramUserContainer } from '../helpers/instagram-json';
import { UserHeading, InstagramMedia } from './InstagramEmbed';
//import { FixedSizeImage } from './image';
import Loading from './loading';
import { FixedWidthMedia, FixedHeightMedia, FixedSizeMedia, MaxSizeMedia } from './media';


export default ({ username }) => {
  return (
    <InstagramUserContainer
      username={username}
      //username={'gabi'}
      //render = {(values) => <Text>Helloooo</Text>}
      render={({ loaded, object, error }) => RenderInstagramTimeline({ loaded, object, error })}
    />
  )
}

const RenderInstagramTimeline = ({ loaded, object, error }) => {
  console.log( 'in render timeline method');
  console.log( loaded );
  console.log( object );
  console.log( error );
  return (
    <View>
    {loaded || <Loading />}
    {loaded &&
    <>
        <UserHeading user={object} />
        <View>
          {object.getPosts().map(
            post => <PostThumbnail post={post} />)}
        </View>
      </>
    }
    <Text>{loaded && 'Done'}{loaded || 'Loading'}</Text>
    <Text>Doing Render</Text>
    </View>
  )
}

//JSON only includes the first image, but does indicate if it's a gallery.  would have to fetch single to get the rest
const PostAllThumbnails = ({post}) => {
  let objects = post.getImages();
  console.log( 'image count: ' + objects.length );
  console.log( 'is gallery? ' + post.isGallery() );
  return (
    objects.map( image => ImageThumbnail({image}))
  )
}

const PostThumbnail = ({ post }) => {
  return (
    <Link link={post.getLink()}>
    <ImageThumbnail
    image={post.getPrimaryImage()}
    />
    </Link>
  )
}

const ImageThumbnail = ({image, width = 150}) => {
  return ( 
    <FixedSizeMedia
      object={image}
      width={width}
      height={width}
    />
  )
}