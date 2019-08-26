export function randomKey( array ) {
  if ( ! array.length ) { 
      throw 'cannot choose key from empty array';
    }
  return Math.floor(Math.random() * array.length);
}

export function randomValue( array ) {
  const key = randomKey( array );
  return array[key];
}

export function randomKeys( array, count ) {
    if ( array.length < count ) { 
      throw 'not enough entries in array';
      //return array.keys(); 
    }
    let indexes = [];
    while ( indexes.length < count ) {
      let index = randomKey( array );
      if ( ! indexes.contains( index ) ) {
        indexes.push( index );
      }
    }
  return indexes;
}

export function randomValues( array, count ) {
  const indexes = randomKeys( array, count );
  return indexes.map( i => array[i] );
}

//removes only the first instance
//should mutate the array
export function removeValue( array, value ) {
  const key = array.indexOf( value );
  if ( key ) {
    array.splice( key, 1 );
  }
}

export function removeValues( array, values ) {
  values.forEach( value => removeValue( array, value ) );
}
