import React from 'react';
import {View, Text} from './elements';
//import {FlatList} from './native-compatability';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import Loading from './loading';
import InstagramSingleContainer from '../containers/InstagramSingleContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
//import Gallery from './gallery';
import { FixedWidthMedia, FixedHeightMedia, FixedSizeMedia, MaxSizeMedia } from './media';
import { CircularImage } from './ImageSizes'; 
import {getWindow} from '../util/Dimensions';

export default ({id, width, galleryOffset=0, hideCaption=false}) => {
  const settings={width, galleryOffset, hideCaption};
  return(
    <InstagramSingleContainer 
      id={id} 
      render={(values) => RenderInstagramPost(values, settings)}
    />
  )
}

const RenderInstagramPost = ({loaded, object, error}, settings) => {
  if ( loaded ) {
    if ( object ) {
      return <InstagramPost object={object} settings={settings} />
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

//TODO: multiple formats? sizes? make caption optional? offset to single image in gallery?
const InstagramPost = ({object, settings}) => {
  const width = settings.width || getWindow().width;
  return(
    <Container width={width}>
      <UserHeading user={object.getUser()}/>
      <FlatList
        data={object.getImages()}
        renderItem={(image) => <FixedWidthMedia object={image} width={width} />}
        horizontal={true}
        snapToInterval={width}
        snapToAlignment='center'
        decelerationRate='fast'
      />
      <Caption text={object.getCaption()} hidden={settings.hideCaption} />
    </Container>
  )
}
//<InstagramMedia resource={resource} width={width} />

export const UserHeading = ({user}) => {
  return (
    <HeadingContainer>
      <ProfilePic
        image={user.getProfilePic()}
        width={50}
      />
      <ProfileDetails>
        <Username>@{user.getUsername()} {user.isVerified() && <VerifiedCheck /> }</Username>
        <FullName>{user.getFullName()}</FullName>
      </ProfileDetails>
    </HeadingContainer>
  )
}

const HeadingContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VerifiedCheck = () => {
  return (
    <FontAwesomeIcon icon={ faCheckCircle } color='blue' />
  )
}

const Container = styled(View)`
  width: ${props => props.width}px;
  margin-left:auto;
  margin-right:auto;
  background: #f7f7f7;
`;
//  border-radius: 10px;
//  border: 2px solid #d6d6d6;


const ProfilePic = styled(CircularImage)`
  border: 2px solid gray;
  margin: 10px;
`;

const ProfileDetails = styled(View)`
  font-size: 15px;
`;

const Username = styled(Text)`
`;

const FullName = styled(Text)`
`;

const Photo = styled(View)`
`;

const Caption = ({text, hidden}) => {
  return (
    ! hidden && text.length &&
      <CaptionText>{text}</CaptionText>
  )
  //this avoids the margins from being rendered when the caption is empty
}

const CaptionText = styled(Text)`
  padding: 10px 10px 15px 15px;
`;
