import React from "react";
import { ITransactions } from "../../Hook/TransactionsContext";
import { TransactionsList } from "./TransactionList";

// import { Container } from './styles';

interface PropsTransactionsParams {
  data: ITransactions[];
  selected: (item: ITransactions) => void;
}

export const Transactions: React.FC<PropsTransactionsParams> = ({
  data,
  selected,
}) => {
  return <TransactionsList data={data} selected={(item) => selected(item)} />;
};
