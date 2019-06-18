
export const CategoryDropdown = () => {
    return (
        <ManagedSelect id="category" name="category">
            <CategoryListContainer render={(result) => result.items.map((item) =>
                <TermOption json={item} key={item.id}/>
            )}
            />
        </ManagedSelect>
    );
};

export const CategoriesLinkList = () => {

    return (
        <CategoryListContainer
            render={(result) => <RenderList items={result.items} renderItem={TermLink}/>}
            //render={(result) => {console.log(result); return <div>Loaded</div> }}
        />
    )
};

const RenderList = (props) => {
    console.log(props);
    return (
        <ul>
            {props.items.map(item => <li>{props.renderItem({
            json: item,
            key: item.id,
            })}</li>)}
        </ul>
    )
};

export const TermLinkList = (props) => {
    return (
        <RenderList
            renderItem={TermLink}
            json={props.json}
        />
        //props.json.map( term => <TermLink json={term} key={term.id} /> )
    )
};

export const TermLink = (props) => {
    return (
        <a href={props.json.link}>{props.json.name}</a>
    )
};

export const TermOption = (props) => {
    return (
        <Option
            value={props.json.id}
            label={props.json.name}
        />
    )
};

export const CategoryCptUrl = (categoryJson, type) => {
    let url = categoryJson.link;
    if ( type !== 'post' ) {
        url += '?post_type=' + type;
    }
    return url;
};