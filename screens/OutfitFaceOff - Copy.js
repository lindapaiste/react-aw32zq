import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
  Animated
} from 'react-native';
import styled from 'styled-components/native';
import WpPostObject from '../helpers/WpPost';
import Loading from '../components/loading';
import { MediaImage } from '../components/media';
import {
  FixedHeightImage,
  MaxSizeImage,
  CroppedToOutfit,
} from '../components/image';
import { Circle, TextInCircle } from '../components/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

//TODO: choose outfits from the same occasion

//TODO: cron job & cache index of post ids and occassions 

//TODO: should I use all outfits, or only those 500x500px?
//let url = 'https://stealherstyle.net/wp-json/lpgames/v1/guesswho/data';

export default class OutfitFaceOff extends React.Component {
  constructor() {
    super();
    this.state = {
      //      selectedIds: [173289, 170530],
      //      selectedPostType: 'makeup'
      allIds: {},
      selectedIds: [174564, 174561],
      selectedPostType: 'posts',
      fadeValue: new Animated.Value(0),
      postObjects: [],
    };
  }

  fadeIn() {
    Animated.timing(this.state.fadeValue, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  pickFavorite = (chosen) => {
    this.setState({
      chosen,
    });
    this.fadeIn();
  }
  componentDidMount() {
    this.loadPosts();
  }
  //static postTypes = ['hair', 'makeup', 'nails', 'tattoos', 'piercings'];
  static postTypes = ['posts'];
  choosePostType() {
    let index = Math.floor(this.postTypes.length * Math.random());
    return this.postTypes[index];
  }
  getPostTypeIds(postType) {
    if ( this.state.allIds.hasOwnProperty(postType) ) {
      return this.state.allIds[postType];
    } else {
      let promise = this.fetchPostTypeIds(postType);
      promise.then(
        return this.state.allIds[postType];
      )
    }
  }
  fetchPostTypeIds(postType) {
    //returns a Promise
    let apiUrl = 'https://stealherstyle.net/wp-json/shs/v1/index/outfit_occasion';
    return fetch(apiUrl)
      .then(res => res.json())
      .then(ids =>
        this.setState(prevState => {
          prevState.allIds[postType] = ids || [];
          return {
            allIds: prevState.allIds,
        }})
      )
      .catch(error =>
        this.addError( error )
      );
  }
  groupByOccasion( json ) {
    let formatted = {};
    const ids = Object.keys(json);
    ids.forEach(id => {
      let occasions = json[id];
      //skip posts with no occasion
      if (occasions.length === 0) { return; } 
      let occasion = occasions[0]; 
      //make sure property exists
      if ( ! formatted.hasOwnProperty(occasion) ) { 
        formatted[occasion] = [];
      }
      formatted[occasion].push(id);
    });
    return formatted;
  }
  reformatData( json ) {
    let formatted = this.groupByOccasion( json );
    //limit to only occassions with 10+ outfits
    Object.keys(formatted).forEach( key => { 
      if ( formatted[key].length < 10 ) { 
        delete formatted[key]; 
      }
    });
    //object with counts
    let counts = Object.fromEntries(
      Object.entries(formatted).map(
        ([key, value]) => [key, value.length]
      ));


  }
  loadPosts() {
    this.state.selectedIds.forEach( (id, i) => this.loadPost(i) );
  }
  loadPost(i) {
    const postId = this.state.selectedIds[i];
    const apiUrl = `https://stealherstyle.net/wp-json/wp/v2/${this.state.selectedPostType}/${postId}?_embed=true`;
    this.setState({ apiUrl });
    fetch(apiUrl)
      .then(res => res.json())
      .then(json =>
        this.setState(prevState => {
          prevState.postObjects[i] = new WpPostObject(json);
          return {
            postObjects: prevState.postObjects,
        }})
      )
      .catch(error =>
        this.addError( error )
      );
  }
  addError( error ) {
    this.setState(prevState => ({
          errors: ( prevState.errors || [] ).concat(error),
        }))
  }
  chooseNext() {
    let postType = this.choosePostType();
  }
  render() {
    console.log( this.state );
    if (this.state.postObjects.length === 2 && this.state.postObjects[0] && this.state.postObjects[1]) {
      return (
        <OutfitCelebPics
          state={this.state}
          onPress={this.pickFavorite}
        />
      );
    } else {
      return <Loading />;
    }
  }
}

class GenericFaceOff extends React.Component {

}

class PercentLoader extends React.Component {
  constructor(props) {
    super( props );
    this.state = {
      percentLoaded: new Animated.Value(0),
    }
  }
  componentDidMount() {
    this.grow();
  }
  grow() {
    Animated.timing( this.state.percentLoaded, {
      toValue: 100,
      duration: this.props.duration || 1000
    }).start();
  }
  render() {
    return (
      this.props.render(this.state.percentLoaded)
      //<ResultsBar value={this.props.value} width={Animated.multiply(this.state.percentLoaded, this.props.value)} />
      /*<Animated.View 
        style={{
          width: Animated.multiply(this.state.percentLoaded, this.props.value * 375 / 100 ), 
          height: 50, 
          backgroundColor: ( this.props.value >= .5 ) ? 'green' : 'red'
        }}
      />*/
    )
  }
}

const RenderAnimatedBar = ({value, percentLoaded}) => {
  //percentLoaded is an Animated value, not a simple number
  console.log('percent loaded' );
  console.log( percentLoaded );
  return (
     <Animated.View 
        style={{
          width: Animated.multiply(percentLoaded, value * 375 / 100 ), 
          height: 5, 
          backgroundColor: ( value >= .5 ) ? 'green' : 'red'
        }}
      />
  )
}

const AnimatedBar = ({value}) => {
  return (
    <PercentLoader
      render={(percentLoaded) => <RenderAnimatedBar value={value} percentLoaded={percentLoaded}/>}
      value={value}
    />
  )
}

const RenderPost = ({ post }) => {};

const OutfitCelebPics = ({ state, onPress }) => {
  const {postObjects, fadeValue, chosen} = state;
  console.log(postObjects);
  const postOne = postObjects[0];
  const postTwo = postObjects[1];
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const scale = (0.5 * screenWidth) / 175;
  const nameHeight = 0.06 * screenHeight;
  const iconSize = scale * 75;
  const rand = .3 + .4 * Math.random(); //.3 to .7
  const RenderPost = (int) => {
    const post = ( int === 1 ) ? postOne : postTwo; 
    return (
        <Outfit>
          <TouchableHighlight onPress={() => onPress(int)}>
          <View>
            <CroppedToOutfit
              sizedImage={post.getTheFeaturedImage().getSize('large')}
              scale={scale}
            />

            {state.chosen === int && 
            <Animated.View style={{opacity: fadeValue, alignSelf: 'center', alignItems: 'center', height: 0}} transform={[{translateY: (-250 * scale) - (.5 * iconSize )}, {translateX: 0}]}>
              <FontAwesomeIcon icon={faCheckCircle} color={'white'} size={iconSize} />
            </Animated.View>
            }

            <CelebrityName
              height={nameHeight}
              category={post.getTheCategory()}
            />
            {state.chosen === int && 
              <Text>Selected</Text>
            }
            </View>
            </TouchableHighlight>

          </Outfit>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white', fontFamily: 'Georgia' }}>
      <Heading>Which Everyday Outfit?</Heading>

    {state.chosen && 
    <ResultsOverOutfits values={[rand, 1 - rand]} />
    }

      <Pair>
          {RenderPost(1)}
          {RenderPost(2)}
      </Pair>

      <Text>{state.chosen}</Text>
      <Heading>Skip</Heading>
    </View>
  );
};

const ResultsOverOutfits = ({values}) => {
  return (
        <ResultsWrapper>
    <ResultsPair>
  <AnimatedBar value={values[0]} />
  <AnimatedBar value={values[1]} />
</ResultsPair>
<ResultsPair>
  <PercentNumber value={values[0]} />
  <PercentNumber value={values[1]} />
</ResultsPair>
</ResultsWrapper>
  )
}

const PercentNumber = ({value}) => {
  const formatted = (100 * value).toPrecision(2) + '%';
  return (
    <StyledPercent>{formatted}</StyledPercent>
  )
}

const StyledPercent = styled.Text`
  color: white;
  font-size: 50px;
  text-shadow: 2px 2px 4px black;
  text-align: center;
  font-family: Georgia;
  flex: .5;
`;

const Pair = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const ResultsWrapper = styled.View`
  position: absolute;
  top: 100;
  left: 0;
  z-index: 3;
  width: 100%;
`;

const ResultsPair = styled(Pair)`
  align-items: stretch;
  justify-content: space-between;
`;


const ResultsBar = styled(Animated.View)`
  flex-basis: ${props => props.width}%;
  background: ${props => props.value > .5 ? 'green' : 'red'};
  height: 20px;
`;
//  width: ${props => 100 * props.value}%;
//  height: 100%;


const Outfit = styled.View`
  flex: 1;
  align-self: center;
  align-items: center;
  align-self: flex-start;
`;

const PostImage = ({ sizedImage }) => {
  return (
    <Image
      source={{ uri: sizedImage.source_url }}
      style={{
        width: undefined,
        height: undefined,
        flex: 1,
        overflow: 'hidden',
      }}
      resizeMode="contain"
    />
  );
};

const Heading = styled.Text`
  color: black;
  font-style: italic;
  font-size: 20px;
  text-align: center;
`;

const CelebrityName = ({ category, height }) => {
  return <CelebrityNameText height={height}>{category.name}</CelebrityNameText>;
};

const CelebrityNameText = styled.Text`
  color: black;
  font-size: ${props => 0.5 * props.height || 40}px;
  font-style: italic;
  text-align: center;
  font-family: Georgia;
`;
