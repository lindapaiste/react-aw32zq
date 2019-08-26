import React from 'react';
import FetchContainer from '../containers/FetchContainer';
import { UserHeading } from '../components/InstagramEmbed';
import { InstagramUser } from '../objects/InstagramApi';

//https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables={"id":"19442036","include_reel":true,"fetch_mutual":false,"first":12,"after":"QVFDRkgwaFlWd0J2SkJXRS1Pc2d6OUN3cHZlYldXSU5uUnRzUG1mX0g0amswVnExM2g3akhnZ0FORWpWMVNnajBEMlppS0E4VG03Nmo3MERIbU80TjJUMg=="}

const query_hash = 'd04b0a864b4b54837c0d870b0e77e076';

class Following extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      users: [],
      count: undefined,
      end: undefined,
      hasNext: true,
    }
  }
  componentDidMount() {
    this.fetchNext();
  }
  componentDidUpdate(prevProps, prevState) {
    if ( this.state.hasNext || this.state.users.length < 100 ) {
      this.fetchNext();
    }
  }
  getUrl() {
    let url = 'https://www.instagram.com/graphql/query/?query_hash='+query_hash+'&variables={"id":"19442036","include_reel":true,"fetch_mutual":false,"first":49}';
    if ( this.state.end ) {
      url = url.replace('}',',"after":"'+this.state.end+'"}');
    }
    return url;
  }
  fetchNext() {
    fetch( this.getUrl() )
    .then( response => response.json())
    .then( json => json.data.user.edge_follow )
    .then( edge => this.setState((prevState) => ({
      count: edge.count,
      end: edge.page_info.end_cursor,
      hasNext: edge.page_info.has_next_page,
      users: prevState.users.concat(edge.edges.map( edge => edge.node ))
    })))
  }
  render() {
    return this.state.users.map( user => <UserHeading user={new InstagramUser(user)} />);
  }
}