//import FetchContainer from '../containers/FetchContainer';
import React, {Component} from 'react';

function getHtmlLink( name ) {
  return 'https://en.wikipedia.org/api/rest_v1/page/html/' + name;
}

function getSummaryLink( name ) {
  return 'https://en.wikipedia.org/api/rest_v1/page/summary' + name;
}

export default ({name}) => {
  return (
     <FetchContainer
     url={getHtmlLink(name)}
     render={RenderWikipedia}
   />
  )
}

class WikipediaPage {
  constructor( html ) {
    let domparser = new DOMParser();​​​​​​
    this.doc = domparser.parseFromString(html, 'text/html');
    this.table = this.doc.querySelector('table.infobox');
    this.infobox = {};
    this.buildInfobox();
    this.completeInfobox();
  }
  getInfoboxWt() {
    let infobox = JSON.parse( this.doc.querySelector('table.infobox').dataset.mw);
    let infobox = infobox.parts[0].template.params;
    return infobox;
  }
  buildInfobox() {
    let rows = this.table ? this.table.rows : [];
    for ( let i = 0; i < rows.length; i++ ) {
      let row = rows[i];
      let th =  row.querySelector('th');
      let td = row.querySelector('td');
      if ( th && td ) {
        //for lists
        let value;
        if ( td.querySelector('li') ) {
          value = Array.from( td.querySelectorAll('li') ).map( li => li.innerText )
        } else {
          value = td.innerText;
        }
        this.infobox[th.innerText] = value;
        /*if ( th.innerText == 'Born') {
          this.infobox.Name = td.firstElementChild.innerText;
        }*/
      }
    }
  this.addInfoboxField( 'Name', '.nickname');
  this.addInfoboxField( 'BirthDate', '.bday');
  this.addInfoboxField( 'BirthPlace', '.birthplace');
  }
  addInfoboxField( name, selector ) {
    let node = this.doc.querySelector( selector );
    if ( node ) {
      this.infobox[ name ] = node.innerText;
    }
  }
  addTextSearchField( name, regex, offset = 1 ) {
let match = this.doc.body.innerText.match( regex );
if ( match ) {
  this.infobox[name] = match[offset];
}
  }
  completeInfobox() {
    if ( ! this.infobox.hasOwnProperty( 'Birthdate')) {
      this.addTextSearchField( 'Birthday', /born\s+(.*[0-9]{4})\)/, 1 );
    }
  }
  getWikiIds() {
    //this.infobox.PageId = this.doc.querySelector()
  }
}

const RenderWikipedia = ({loaded, text, object, error}) => {
  if ( loaded ) {
    //console.log(text);
    //console.log(error);
    let object = new WikipediaPage( text );
    let infobox = object.infobox;
    console.log( infobox);
    let basicFacts = infobox;
    return (
      <>
      {Object.keys( basicFacts ).map(
        key => { return ( <div>{key}: {basicFacts[key]}</div> ) }
        )}
        </>
    )
  } else {
    return <div>Loading...</div>
  }
}

class FetchContainer extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    this.loadresponse();
  }
  loadresponse() {
    fetch(this.props.url )
      .then(response => response.text() )
      .then(text => this.setState({
        loaded: true,
        text: text
      }))
      .catch(error => this.setState({
        loaded: true,
        error: error,
      }));
  }
  render() {
    return (
      this.props.render({
        loaded: this.state.loaded,
        text: this.state.text,
        error: this.state.error
      })
    )
  }
}