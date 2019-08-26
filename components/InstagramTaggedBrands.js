import React from 'react';
import { View, Text, Link } from './native-compatability';
import { InstagramUserContainer, InstagramSingleContainer } from '../helpers/InstagramContainers';
import { UserHeading, InstagramMedia } from './InstagramEmbed';
//import { FixedSizeImage } from './image';
import Loading from './loading';
import { FixedWidthMedia, FixedHeightMedia, FixedSizeMedia, MaxSizeMedia } from './media';
import styled from 'styled-components';


export default ({ username }) => {
  return (
    <InstagramUserContainer
      username={username}
      //username={'gabi'}
      //render = {(values) => <Text>Helloooo</Text>}
      render={({ loaded, object, error }) => RenderInstagramBrandTimeline({ loaded, object, error })}
    />
  )
}

const RenderInstagramBrandTimeline = ({ loaded, object, error }) => {
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
          {object.getPostShortcodes().map(
            shortcode => InstagramBrandPostContainer({shortcode})
            )}
        </View>
      </>
    }
    <Text>{loaded && 'Done'}{loaded || 'Loading'}</Text>
    <Text>Doing Render</Text>
    </View>
  )
}

const InstagramBrandPostContainer = ({shortcode}) => {
  return(  <InstagramSingleContainer 
      id={shortcode} 
      render={(values) => InstagramBrandPost(values)}
    />
  )
}

const InstagramBrandPost = ({loaded, object, error}) => {
    if ( loaded ) {
    if ( object ) {
      console.log(object);
      const photos = object.getPhotos();
      console.log( 'photos' );
      console.log( photos );
      return(
        <> 
        <Text>Next Post</Text>
        {photos.map( photo => <>
        <InstagramBrandPhoto photo={photo} />
        <Text>Tagged on Photo:</Text>
         {photo.getTaggedUsers().map( user => UserHeading({user}))}
         </>
      )}
      <Text>Tagged on Post</Text>
      {object.getUnusedTags().map( user => UserHeading({user}))}
      </>
      )
        
    } else {
      //do nothing when there's an error
      console.log(error);
      return null;
    }
  }
  else {
    return ( <Loading /> );
  }
}

const InstagramBrandPhoto = ({photo}) => {
  return (
    <FullWidth>
      <PhotoThumbnail photo={photo} />
    </FullWidth>
  )
}

const FullWidth = styled(View)`
  width: 100%;
`;

//JSON only includes the first image, but does indicate if it's a gallery.  would have to fetch single to get the rest
const PostAllThumbnails = ({post}) => {
  let objects = post.getPhotos();
  console.log( 'resource count: ' + objects.length );
  console.log( 'is gallery? ' + post.isGallery() );
  return (
    objects.map( resource => ImageThumbnail({resource}))
  )
}

const PostThumbnail = ({ post }) => {
  return (
    <Link link={post.getLink()}>
    <ImageThumbnail
    image={post.Image()}
    />
    </Link>
  )
}

const PhotoThumbnail = ({photo}) => {
  return ( 
    <FixedSizeMedia
      object={photo.getPrimaryImage()}
      width={150}
      height={150}
    />
  )
}