import React, {Component} from 'react';
import {TermLink, TermName} from './taxonomy.jsx';
import {SizedMedia} from './media.jsx';
import WpPostObject from '../helpers/post-json.jsx';
import {PortalOutfitsInCategory} from './portal.jsx';

export const PostContainer = (props) => {
    //TODO: map post types to endpoints
    let postType = props.postType || 'posts';
    let parameters = props.parameters || {};
    parameters._embed = true;
    return (
        <WpJsonItemContainer
            endpoint='posts'
            id={props.id}
            parameters={parameters}
            render={props.render}
        />
    )
};

export const TypePost = (props) => {
  const post = new WpPostObject(props.json);
  console.log(post);
    return (
      <div>
        <h2 className="celebrity-name-above-photo">
          <TermLink json={post.category()} />
        </h2>

<article>	
		<div className="photo">
			<div className="main-image">
				<div className="image-wrapper centered">
					<a href={post.permalink()}>
            <SizedMedia json={post.featuredImage()} size={'large'} />
          </a>
					<div className="byline">Need To Get Credit</div>
				</div>
				
				
				<div className="centered">
         display video, if it exists
				</div>
				
				<div className="tags clearfix">
          Comments Link
        </div>

        <div>
          {post.json.content.rendered}
        </div>
            		
				
				<div className="tags">
          {post.allTerms(['category']).map( term => <TermLink json={term} />)}
        </div>
      </div>
		</div>
				
    <div className="photo-details clearfix">
      Related Products			
		</div>
</article>
		<div className="clearer"></div>
    </div>
    )
};

export const PostSingle = (props) => {
  const post = new WpPostObject(props.json);
    return (
      <div>
        <article className="main-column">
            <div className="entry">
                <div className="ehead centered">
                    <h2 className="category-name">
                      <TermName json={post.category()}/>
                    </h2>
                    <h2 className="post-title">{post.titleWithoutCategory()}</h2>
                </div>
                <div className="post-body narrow">
                    <Caption text="Need to find caption">
                            <SizedMedia json={post.featuredImage()} size={'large'} />
                        </Caption>
                    )}
                    {props.json.content.rendered}
                    <div className="tags">
                      Brands: {post.taxonomyTerms('brand').map( term => 
                        <TermLink json={term} />
                      )}
                      Items: {post.taxonomyTerms('item').map( term => 
                        <TermLink json={term} />
                      )}
                    </div>
                </div>
            </div>
        </article>
        {props.isSingle &&
        <aside>
          <PortalOutfitsInCategory id={post.category().id} />
        </aside>
        }
      </div>
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