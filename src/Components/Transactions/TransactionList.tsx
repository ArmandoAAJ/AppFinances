import React from "react";
import { FlatList } from "react-native";
import { ITransactions } from "../../Hook/TransactionsContext";
import { TransactionsItem } from "./TransactionItem";

interface PropsTransactionsList {
  data: ITransactions[];
  selected: (item: ITransactions) => void;
}

export const TransactionsList: React.FC<PropsTransactionsList> = ({
  data,
  selected,
}) => {
  const handleSelectedItem = (item: ITransactions) => {
    selected(item);
  };
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.id || String(index)}
      renderItem={({ item, index }) => {
        return (
          <TransactionsItem
            item={item}
            selected={() => handleSelectedItem(item)}
          />
        );
      }}
      contentContainerStyle={{ paddingBottom: 70 }}
      showsVerticalScrollIndicator={false}
    />
  );
};
