import React from 'react';

export default (props) => {
  return (
    <article className="main-column">
      <div className="entry">
        <div className="ehead centered">
          <h2 className="category-name">category goes here</h2>
          <h2 className="post-title">{props.json.title.rendered}</h2>
        </div>
        <div className="post-body narrow">
          {props.json._embedded['wp:featuredmedia'].map(json =>
            <Caption text="Need to find caption">
              <SizeImage json={json} size={large} />
            </Caption>
          )}
          {props.json.content.rendered}
          <div className="tags">
            {props.json._embedded['wp:term'].map(json =>
              <TermLink json={json} />
            )}
          </div>
        </div>
      </div>
    </article>
  )
};


//TODO: get via id if not embedded

export const PostTerms = (json) => {
    return json._embedded['wp:term'];
};

export const PostTaxonomyTerms = (json, taxonomy) => {
    const taxonomies = PostTerms(json) || [];
    //terms are a multidimensional array, grouped by taxonomy
    for ( let i = 0; i < taxonomies.length; i++ ) {
        if ( taxonomies[i].length && taxonomies[i][0].taxonomy === taxonomy ) {
            return taxonomies[i];
        }
    }
    return [];
};

export const PostCategories = (json) => {
    return PostTaxonomyTerms(json, 'category');
};

export const PostCategory = (json) => {
    const categories = PostCategories(json);
    return categories[0];
};

export const PostFeaturedImage = (json) => {
   return json._embedded['wp:featuredmedia'][0];
};

export const PostCptUrl = (json) => {
  const category = PostCategory(json);
  const type = json.type;
  return CategoryCptUrl(category, type);
};

//props: json and size
export const PortalItemFromPost = (props) => {
    const category = PostCategory(props.json);
    const media = PostFeaturedImage(props.json);
    const sized = SizedMedia(media, props.size || 'thumbnail');
    const type = props.json.type;
    const title = category.name + ' ' + type;
  return (
      <PortalItem
          url={CategoryCptUrl(category, type)}
          //onClick=
          image={sized}
          alt={title}
          text={title}
      />
  )
};

export const PortalItem = (props) => {
  return (
      <a
          href={props.url}
          onClick={props.onClick}
      >
      <div className="portal-image">
          <img
              src={props.image.source_url}
              width={props.image.width}
              height={props.image.height}
              alt={props.alt}
              title={props.alt}
              //TODO: required width/height with CSS crop, separate element
          />
          <div className="portal-txt white">
              {props.text}
          </div>
      </div>
  </a>
      )
};

export const PortalItemImage = (props) => {

  return null;
};

export const Caption = (props) => {
    return (
        <div className="wp-caption alignnone">
            {props.children}
            <p className="wp-caption-text">
                {props.text}
            </p>
        </div>
    )
};