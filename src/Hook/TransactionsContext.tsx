import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import firestore from "@react-native-firebase/firestore";

interface PropsTransactionProvider {
  children: ReactNode;
}

export interface ITransactions {
  active: boolean;
  createdAt: { nanoseconds: number; seconds: number };
  description: string;
  editedAt: Date;
  price: number;
  type: "ENTRADA" | "SAÍDA";
  id: string;
}

interface ITransactionContextData {
  loadData: () => void;
  loadTransactionsMonthHome: () => void;
  transactions: ITransactions[];
  transactionsMonthHome: ITransactions[];
}

export const TransactionContext = createContext<ITransactionContextData>(
  {} as ITransactionContextData
);

function TransactionProvider({ children }: PropsTransactionProvider) {
  const [transaction, setTransaction] = useState<ITransactions[]>([]);
  const [transactionsMonthHome, setTransactionsMonthHome] = useState<
    ITransactions[]
  >([]);

  function loadData() {
    const subscribe = firestore()
      .collection("transactions")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ITransactions[];

        const filtered = data.filter((d) => d.active);
        setTransaction(filtered);
      });

    return () => subscribe();
  }

  function loadTransactionsMonthHome() {
    if (transaction.length < 1) return;
    const filtered = transaction.filter((t) => {
      const monthT = t.createdAt
        ? new Date(
            t.createdAt.seconds * 1000 + t.createdAt.nanoseconds / 1000000
          ).getMonth()
        : new Date();
      const monthNew = new Date().getMonth();
      if (monthT === monthNew) {
        return t;
      }
    });

    if (filtered.length > 0) {
      setTransactionsMonthHome(filtered);
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        loadData,
        transactions: transaction,
        loadTransactionsMonthHome,
        transactionsMonthHome,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

function useTransaction() {
  const context = useContext(TransactionContext);
  return context;
}

export { useTransaction, TransactionProvider };
