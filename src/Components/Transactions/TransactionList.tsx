import React from 'react';
import {FlatList} from 'react-native';
import {PropsTransaction} from '../../Home';
import {TransactionsItem} from './TransactionItem';

interface PropsTransactionsList {
  data: PropsTransaction[];
  selected: (item: PropsTransaction) => void;
}

export const TransactionsList: React.FC<PropsTransactionsList> = ({
  data,
  selected,
}) => {
  const handleSelectedItem = (item: PropsTransaction) => {
    selected(item);
  };
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TransactionsItem
          item={item}
          selected={() => handleSelectedItem(item)}
        />
      )}
      contentContainerStyle={{paddingBottom: 70}}
    />
  );
};
