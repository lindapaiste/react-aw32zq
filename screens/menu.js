import React from 'react';
import {View, Text} from 'react-native';

export default () => {

  const menuItems = {
    'Outfits' : '',
    'Tattoos' : 'tattoo',
    'Hair' : 'hairstyles',
    'Makeup' : 'makeup',
    'Nails' : 'nails',
    'Piercings' : 'piercings'
  }

  return (
    <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
        backgroundColor: 'black'
      }}>
      	{Object.keys( menuItems ).map( (key, i) => 
          <MenuLink slug={menuItems[key]} name={key} opacity={.5 + i/10}/>
        )}
      </View>
  )
}
//a gradient of colors looks really pretty

const MenuLink = ({link, name, opacity = 1}) => {
  return(
    <Text style={{fontSize: 20, padding: 20, height: 300, flex: 1, backgroundColor: 'aqua', opacity: opacity, margin: 1}}>{name}</Text>
  )
}

//view style={{fontSize: 20, padding: 20, height: 300, flex: 1, backgroundColor: 'aqua', opacity: opacity, margin: 1}}
//text style={{color: 'black', opacity: 1}}

