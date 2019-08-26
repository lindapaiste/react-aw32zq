//for objects

export default class WpJson {
  constructor(json) {
    this.json = json;
  }
  hasEmbed() {
    return this.json.hasOwnProperty('_embedded');
  }
  getEmbedded(fieldName) {
    if (this.hasEmbed() && this.json._embedded.hasOwnProperty(fieldName)) {
      return this.json._embedded[fieldName];
    } else {
      return [];
    }
    //return an array
  }
  getLinks(fieldName) {
    return this.json._links[fieldName];
    //return an array of link objects, or undefined
  }
}
