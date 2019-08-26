import React from 'react';

export default ({data, renderItem}) => {
  //display item as plain text if renderItem is not defined
  if ( ! renderItem ) {
    renderItem = (item) => item;
  }
  return (
    <ol>
      {data.map( item => (
        <li>{renderItem(item)}</li>
      ))}
    </ol>
  )
}