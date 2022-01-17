import React from 'react';
import {TransactionsList} from './TransactionList';
import {PropsTransaction} from '../../Home';
// import { Container } from './styles';

interface PropsTransactionsParams {
  data: PropsTransaction[];
  selected: (item: PropsTransaction) => void;
}

export const Transactions: React.FC<PropsTransactionsParams> = ({
  data,
  selected,
}) => {
  return <TransactionsList data={data} selected={item => selected(item)} />;
};
