//terms are a multidimensional array, grouped by taxonomy
export default class WpTerms {
  constructor(json) {
    this.taxonomies = json;
  }
  taxonomyTerms = ( taxonomy ) => {
      //terms are a multidimensional array, grouped by taxonomy
      for ( let i = 0; i < this.taxonomies.length; i++ ) {
          if ( this.taxonomies[i].length && this.taxonomies[i][0].taxonomy === taxonomy ) {
              return this.taxonomies[i];
          }
      }
      return [];
      //returns an array of terms
  }
  allTerms = (excludedTaxonomies = []) => {
    const reducer = (accumulator, currentValue) => accumulator.concat(currentValue);
    let terms = this.taxonomies.reduce(reducer, []);
    //TODO: allow for exclusions to be a single string
    let exclusions = ['is_celebrity', 'post_tag', 'tag'].concat( excludedTaxonomies ); //always exclude these two
    return terms.filter( term => ! exclusions.includes(term.taxonomy) );
  }
}