import React from 'react';
import {FlatList} from 'react-native';
import {Item, OptionsItem} from './OptionsItem';
import {useRoute} from '@react-navigation/native';

interface PropsOptionsList {
  data: Item[];
  handleSelected?: (item: string) => void;
  selected?: string;
  handleRemove: (item: Item) => void;
}

export const OptionsList: React.FC<PropsOptionsList> = ({
  data,
  handleSelected,
  selected,
  handleRemove,
}) => {
  const route = useRoute();

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <OptionsItem
          data={item}
          handleRemove={() => handleRemove(item)}
          handleSelectDescription={() =>
            handleSelected && handleSelected(item.description)
          }
          selected={selected === item.description}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: route.name === 'step2' ? 0 : 70,
      }}
    />
  );
};
