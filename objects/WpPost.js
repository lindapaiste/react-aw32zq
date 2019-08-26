import { CategoryCptUrl } from '../components/taxonomy';
import WpMedia from './WpMedia';
import WpPostTerms from './WpPostTerms';
import WpJson from './WpJson';

//TODO: get via id if not embedded

export default class WpPost extends WpJson {
  taxonomies = () => {
    const links = this.getLinks('wp:term');
    return links.map(link => link.taxonomy);
    //returns the taxonomy regardless of whether or not it has terms
  };
  termsObject = () => {
    return new WpPostTerms(this.getEmbedded('wp:term'));
  };
  getTheTerms = taxonomy => {
    return this.termsObject().taxonomyTerms(taxonomy);
  };
  allTerms = (excludedTaxonomies = []) => {
    let terms = this.termsObject().allTerms(excludedTaxonomies);
    return terms.sort((a, b) => a.name.localeCompare(b.name));
    //an array of terms sorted alphabetically by name
  };
  getTheCategories = () => {
    return this.termsObject().taxonomyTerms('category');
    //returns an array of terms
  };
  getTheCategory = () => {
    const categories = this.getTheCategories();
    return categories[0];
    //returns just the first category
  };
  getTheTitle = () => {
    return this.json.title.rendered;
  };
  titleWithoutCategory = () => {
    let title = this.getTheTitle();
    const pos = title.search(':');
    if (pos) {
      title = title.substring(pos + 2);
    }
    return title;
  };
  getTheFeaturedImage = () => {
    const media = this.getEmbedded('wp:featuredmedia');
    return new WpMedia(media[0]);
  };
  postType = () => {
    return this.json.type;
  };
  cptUrl = () => {
    return CategoryCptUrl(this.getTheCategory(), this.postType());
  };
  getThePermalink = () => {
    return this.json.link;
  };
  byline = () => {
    //_zd_credit
  };
  video = () => {
    //wp_youtube_embed
  };
  getTheContent = () => {
    return this.json.content.rendered;
  };
}
