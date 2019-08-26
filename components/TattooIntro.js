import React from 'react';
import Link from './link';
import WpJsonItemContainer from '../containers/WpJsonItemContainer';
import OrderedList from './OrderedList';
import {Wrapper, MyText} from './elements';

export default ({id}) => {
  return (
    <WpJsonItemContainer
          endpoint='tattoo-intro'
    parameters={{category: id}}
    namespace='shs/v1'
    render={TattooIntro}
    />
  )
}

const TattooIntro = ({item,error}) => {
  item = {
"list": [
{
"url": "https://stealherstyle.net/tattoo/163181/",
"text": "heart behind her ear",
"is_removed": false,
"post_id": 163181
},
{
"url": "https://stealherstyle.net/tattoo/163616/",
"text": "rose on her side",
"is_removed": false,
"post_id": 163616
},
{
"url": "https://stealherstyle.net/tattoo/163617/",
"text": "\"Baby\" inside her lip",
"is_removed": false,
"post_id": 163617
},
{
"url": "https://stealherstyle.net/tattoo/167604/",
"text": "writing on her neck",
"is_removed": false,
"post_id": 167604
},
{
"url": "https://stealherstyle.net/tattoo/167609/",
"text": "initial on her forearm",
"is_removed": false,
"post_id": 167609
}
],
"intro": "Jordyn Jones has at least 5 known tattoos:"
};
  if ( item ) {
    return (
    <>
    <MyText>{item.intro}</MyText>
    <TattooList data={item.list} />
    </>
  )
  }
  else return null;
}

const TattooList = ({data}) => {
  return (
    <OrderedList 
      data = {data}
      renderItem = {({item,index}) => TattooListItem({item, index})}
    />
  )
}

const TattooListItem = ({item,index}) => {
  return (
    <Link link={item.url}>
      <MyText>{item.text}</MyText>
    </Link>
  )
}