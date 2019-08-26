export default class WpTerm {
  constructor(json) {
    //copy all properties of the object
    Object.keys.json.forEach( key =>
      this[key] = json[key]
    );
  }
}

/* SAMPLE
"id": 11606,
"count": 192,
"description": "",
"link": "https://stealherstyle.net/dua-lipa/",
"name": "Dua Lipa",
"slug": "dua-lipa",
"taxonomy": "category",
"parent": 0,
"meta": [],
"_links": {...}
*/