import {CategoryCptUrl} from '../components/taxonomy.jsx';
import {SizedMediaJson} from '../components/media.jsx';

//TODO: get via id if not embedded

export default function WpPostObject(json) {
    this.json = json;
    this.hasEmbed = () => {
      return this.json.hasOwnProperty( '_embedded' );
    }
    this.getEmbedded = ( fieldName ) => {
      if ( this.hasEmbed() && this.json._embedded.hasOwnProperty( fieldName ) ) {
          return this.json._embedded[fieldName];
      } else {
        return [];
      }
      //return an array
    }
    this.getLinks = ( fieldName ) => {
      return this.json._links[fieldName];
      //return an array of link objects, or undefined
    }
    this.taxonomies = () => {
      const links = this.getLinks('wp:term');
      return links.map( link => link.taxonomy );
      //returns the taxonomy regardless of whether or not it has terms
    }
    this.termsObject = () => {
      return new WpTerms( this.getEmbedded('wp:term') );
    }
    this.taxonomyTerms = ( taxonomy ) => {
      return this.termsObject().taxonomyTerms(taxonomy);
    }
    this.allTerms = ( excludedTaxonomies = [] ) => {
      let terms = this.termsObject().allTerms( excludedTaxonomies );
      return terms.sort((a, b) => a.name.localeCompare(b.name));
      //an array of terms sorted alphabetically by name
    }
    this.categories = () => {
      return this.taxonomyTerms( 'category' );
      //returns an array of terms
    }
    this.category = () => {
      const categories = this.categories();
      return categories[0];
      //returns just the first category
    };
    this.title = () => {
      return this.json.title.rendered;
    }
    this.titleWithoutCategory = () => {
      let title = this.title();
      const pos = title.search( ':' );
      if ( pos ) {
        title = title.substring( pos + 2 );
      }
      return title;
    }
    this.featuredImage = () => {
      const media = this.getEmbedded( 'wp:featuredmedia' );
      return media[0];
    };
    this.sizedImage = (size = 'large') => {
      const image = this.featuredImage();
      return SizedMediaJson(image, size);
    };
    this.postType = () => {
      return this.json.type;
    }
    this.cptUrl = () => {
      return CategoryCptUrl( this.category(), this.postType() );
    }
    this.permalink = () => {
      return this.json.link;
    }
    this.byline = () => {
      //_zd_credit
    }
    this.video = () => {
      //wp_youtube_embed
    }
}



//terms are a multidimensional array, grouped by taxonomy
export function WpTerms(json) {
  this.taxonomies = json;
  this.taxonomyTerms = ( taxonomy ) => {
      //terms are a multidimensional array, grouped by taxonomy
      for ( let i = 0; i < this.taxonomies.length; i++ ) {
          if ( this.taxonomies[i].length && this.taxonomies[i][0].taxonomy === taxonomy ) {
              return this.taxonomies[i];
          }
      }
      return [];
      //returns an array of terms
  }
  this.allTerms = (excludedTaxonomies = []) => {
    const reducer = (accumulator, currentValue) => accumulator.concat(currentValue);
    let terms = this.taxonomies.reduce(reducer, []);
    //TODO: allow for exclusions to be a single string
    let exclusions = ['is_celebrity', 'post_tag'].concat( excludedTaxonomies ); //always exclude these two
    return terms.filter( term => ! exclusions.includes(term.taxonomy) );
  }
}