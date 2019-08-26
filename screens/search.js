import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import {ManagedTextInput} from '../components/form';
import Loading from '../components/loading';

 const defaultSuggestions = {
    //TODO: update this automatically
    'Ariana Grande': 'ariana-grande',
    'Kylie Jenner': 'kylie-jenner',
    'Kendall Jenner': 'kendall-jenner',
    'Selena Gomez': 'selena-gomez',
    'Bella Hadid': 'bella-hadid',
    'Gigi Hadid': 'gigi-hadid',
    'Maddie Ziegler': 'maddie-ziegler',
    'Hailey Baldwin': 'hailey-baldwin',
    'Mackenzie Ziegler': 'mackenzie-ziegler',
    'Rihanna': 'rihanna'
  };

const SearchPage = ({searchTerm, onChange}) => {
  return (
    <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
    <SearchArea>
      <SearchForm>
        <SearchIcon>
          <FontAwesomeIcon icon={ faSearch } size={25}/>
        </SearchIcon>
        <SearchTextInput searchTerm={searchTerm} onChange={onChange} />
      </SearchForm>
    </SearchArea>
    <SearchSuggestions query={searchTerm} />
      </View>
  )
}
//a gradient of colors looks really pretty

export const MenuLink = ({link, name}) => {
  return (
<TouchableOpacity
         onPress={() => console.log(link)}
       >
         <Text style={{}}>{name}</Text>
       </TouchableOpacity>
  );
};

const BlackButton = styled.TouchableOpacity`
  background-color: black;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 10px;
`;

const MenuLinkOld = ({link, name, opacity = 1}) => {
  return(
    <Text style={{fontSize: 20, padding: 20, height: 300, flex: 1, backgroundColor: 'aqua', opacity: opacity, margin: 1}}>{name}</Text>
  )
};

//view style={{fontSize: 20, padding: 20, height: 300, flex: 1, backgroundColor: 'aqua', opacity: opacity, margin: 1}}
//text style={{color: 'black', opacity: 1}}

const SearchArea = styled.View`
  padding: 10% 3%;
`;

const SearchIcon = styled.View`
  width: 50;
  height: 50;
  padding: 12.5px;
`;

const SearchForm = styled.View`
  background: #EEE;
  height: 50;
  border-radius: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchHolderOld = (props) => {
  return(
    <View style={{
        flex: .4,
        backgroundColor: 'white'
      }}>
      {props.children}
  </View>
  )
};

const SuggestionList = ( data ) => {
  const calcOpacity = (i) => {
    const count = Object.keys( data ).length;
    return (count - i) / count;
  }
  return(
    <View style={{
        flex: .6,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        //backgroundColor: 'black',
        marginHorizontal: 10,
      }}>
      	{Object.keys( data ).map( (key, i) => 
          <MenuLink slug={data[key]} name={key} opacity={calcOpacity(i)}/>
        )}
      </View>
  )
}

class SearchSuggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      suggestions: [],
      suggestionsFor: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if ( nextProps.query !== this.state.suggestionsFor ) {
      this.setState({loaded: false});
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if ( ! this.state.loaded ) {
      this.loadSuggestions();
    }
  }
  loadSuggestions() {
    if ( this.props.query ) {
      const url = 'https://stealherstyle.net/wp-admin/admin-ajax.php?action=search_suggest_cats&q=' + encodeURIComponent( this.props.query ) + '&limit=10';
      fetch( url )
        .then( res => res.json() )
        .then( json => 
          this.setState({
            loaded: true,
            suggestions: json.data,
            suggestionsFor: this.props.query,
          })
        );      
    } else {
      this.setState({
        loaded: true,
        suggestions: defaultSuggestions,
        suggestionsFor: '',
      });
    }
  }
  render() {
    if ( this.state.loaded ) {
      return (
        <SuggestionList data={this.state.suggestions} />
      )
    } else {
      return (
        <ActivityIndicator />
      )
    }
  }
}

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      query: '',
    };
  }
  clear() {
    this.setState({
      query: '',
    });
  }
  onChangeText = (query) => {
    this.setState({query})
  };
  render() {
    return(
      <SearchPage 
        searchTerm={this.state.query} 
        onChange={this.onChangeText} 
      />
    )
  }

}

//text: 'Search Celebrities',

const SearchTextInput = ({searchTerm, onChange}) => {
    const value = (searchTerm) => {
      return ( searchTerm ) ? searchTerm : 'Search Celebrities';
    }
    return (
      <ManagedTextInput
        onChange={(text) => onChange(text)}
        //value={searchTerm}
      />
    )
}

class ManagedTextInput extends React.Component {
  static defaultProps = {
    placeholder: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  onChangeText = (text) => {
    if ( this.props.onChange ) {
      this.props.onChange(text);
    }
    this.setState({text});
  }
  render() {
    return(
      <TextInput
        onChangeText={this.onChangeText}
        value={this.state.text || this.props.placeholder}
        clearTextOnFocus={true} //only works on iOs
        onFocus={() => this.setState({text : ''})}
      />
    )
  }
}

