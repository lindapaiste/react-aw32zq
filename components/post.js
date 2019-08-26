import React, {Component} from 'react';
import {View, Text, WebView, Dimensions} from 'react-native';
import {TermLink, TermLinkButton, TermName, CategoryCptUrl, TagGroup} from './taxonomy';
import {MediaImage, FullWidthImage, FullSizeImage} from './media';
import WpPostObject from '../helpers/WpPost';
import WpJsonItemContainer from '../containers/WpJsonItemContainer';
import {PortalOutfitsInCategory} from './portal';
import {MyButton} from './form';
import YouTubeEmbed from './youtube';
import InstagramEmbed from 'react-native-instagram-embed';

import styled from 'styled-components';

export const PostContainer = (props) => {
    //TODO: map post types to endpoints
    let postType = props.postType || 'posts';
    let parameters = props.parameters || {};
    parameters._embed = true;
    return (
        <WpJsonItemContainer
            endpoint='posts'
            id={props.id}
            parameters={parameters}
            render={props.render}
        />
    )
};

export const TypePostTest = (props) => {
  const post = new WpPostObject(props.json);
    return (
      <View style={{backgroundColor: 'red'}}>
        <TermName json={post.getTheCategory()} style={{backgroundColor: 'blue'}} />
        <TermLink json={post.getTheCategory()} />

        <Text>
          {post.json.content.rendered}
        </Text>
      </View>
    )
};

const CelebrityName = styled.Text`
  font-size: 40px;
  text-align: center;
`;

const Photo = styled.View``;

export const TypePost = (props) => {
  const post = new WpPostObject(props.json);
  console.log(post);

  const fullWidth = Dimensions.get('window').width;

    return (
      <View>
        <CelebrityName>{post.getTheCategory().name}</CelebrityName>

        <WebView source={{html: post.getTheContent()}} />

        <Text>Window Width is {fullWidth}</Text>
		
				<Text>{'Comments Link'}</Text>

        <TagGroup>
          {post.allTerms(['category']).map( term => <TermLink json={term} />)}
        </TagGroup>
				
      <Text>{'Related Products'}</Text>

<FullWidthImage src={'https://stealherstyle.net/wp-content/uploads/2019/06/yara_shahidi01-500x500.jpg'} height={100}/>

<FullWidthImage src={'https://stealherstyle.net/wp-content/uploads/2019/06/yara_shahidi01-500x500.jpg'} height={undefined}/>

      <Photo>
        <MediaImage object={post.getTheFeaturedImage()} width={200} />
				<Text>{'Need To Get Credit'}</Text>
			</Photo>

    </View>
    )
};
//<YouTubeEmbed id="HUHC9tYz8ik" width={fullWidth} />
//
//<InstagramEmbed id="BzIcTZFlv3s" style={{ width: "100%" }} />

export const PostSingle = (props) => {
  const post = new WpPostObject(props.json);
    return (
      <View>
        <View>
            <View>
                <View>
                      <TermLink json={post.getTheCategory()}/>
                      <Text>{post.titleWithoutCategory()}</Text>
                </View>
                <View>
                    <Caption text="Need to find caption">
                            
                            <MediaImage object={post.getTheFeaturedImage()} width={200} />
                        </Caption>
                    )}
                    <Text>{props.json.content.rendered}</Text>
                    <View>
                      <Text>Brands: </Text>{post.taxonomyTerms('brand').map( term => 
                        <TermLink json={term} />
                      )}
                      <Text>Items: </Text>{post.taxonomyTerms('item').map( term => 
                        <TermLink json={term} />
                      )}
                    </View>
                </View>
            </View>
        </View>
        {props.isSingle &&
          <PortalOutfitsInCategory id={post.getTheCategory().id} />
        }
      </View>
    )
};


export const Caption = (props) => {
    return (
        <View>
            {props.children}
            <Text>{props.text}</Text>
        </View>
    )
};