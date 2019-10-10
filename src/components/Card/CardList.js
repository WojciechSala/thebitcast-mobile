import React from 'react';
import { FlatList } from 'react-native';
import Card from './Card';

export default CardList = props => {
  return (
    <FlatList
      style={{
        zIndex: -2
      }}
      data={props.data}
      renderItem={({ item }) => (
        <Card navigation={props.navigation} title={item.title} />
      )}
      keyExtractor={item => item.id}
    />
  );
};
