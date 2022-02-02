import React, { useEffect, useMemo, useState, useContext } from "react";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import { Transactions } from "../Components/Transactions";
import { Typograph } from "../Components/Commom";
import { Container, Header } from "./styles";
import { HomeHeader } from "./components/Header";
import { Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { RootStackParamList } from "../Routes/Screen";
import ModalDialog from "../Components/ModalDialog";
import { Toast } from "../Components/Toast";
import { HomeModal } from "../Components/ModalDialog/Components/homeModal";
import { useTransaction } from "../Hook/TransactionsContext";

interface PropsHomeScreen {
  navigation: NativeStackNavigationProp<RootStackParamList, "HomeStack">;
}

export interface PropsTransaction {
  active: boolean;
  createdAt: { nanoseconds: number; seconds: number };
  description: string;
  editedAt: Date;
  price: number;
  type: "ENTRADA" | "SAÍDA";
  place: "CASA" | "LOJA";
  id: string;
}

export const HomeScreen: React.FC<PropsHomeScreen> = ({ navigation }) => {
  const {
    loadData,
    transactions,
    loadTransactionsMonthHome,
    transactionsMonthHome,
  } = useTransaction();
  const focused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [typeToast, setTypeToast] = useState<"SUCCESS" | "DANGER" | "WARNING">(
    "SUCCESS"
  );
  const [titleToast, setTitleToast] = useState<string>("");
  const [selected, setSelected] = useState<PropsTransaction>(
    {} as PropsTransaction
  );

  const handleNewTransaction = () => {
    navigation.navigate("Step", { item: {} });
  };

  useEffect(() => {
    //Carregar as trasações do mês
    loadTransactionsMonthHome();
  }, [transactions]);

  useEffect(() => {
    //Carregar todas as trasações
    loadData();
  }, []);

  useEffect(() => {
    //Resetar o item selecionado no modal
    if (focused) {
      setSelected({} as PropsTransaction);
    }
  }, [focused]);

  const handleSelected = (item: PropsTransaction) => {
    setVisible(true);
    setSelected(item);
  };

  const handleEdit = () => {
    setVisible(false);
    navigation.navigate("Step", { item: selected });
  };

  const handleDelete = () => {
    firestore()
      .collection("transactions")
      .doc(selected.id)
      .update({
        description: selected.description,
        price: selected.price,
        type: selected.type,
        place: selected.place,
        createdAt: selected.createdAt,
        editedAt: firestore.FieldValue.serverTimestamp(),
        active: false,
      })
      .then(() => {
        setTypeToast("SUCCESS");
        setTitleToast("Transação removida com sucesso");
        setVisibleToast(true);
        setVisible(false);
      })
      .catch(() => {
        setTypeToast("DANGER");
        setTitleToast("Erro ao remover a transação");
        setVisibleToast(false);
      });
  };

  const handleDissmis = () => {
    setTitleToast("");
    setVisibleToast(false);
  };

  return (
    <>
      <Toast
        type={typeToast}
        visible={visibleToast}
        onDismissSnackBar={handleDissmis}
        title={titleToast}
      />
      <Container>
        <ModalDialog visible={visible} isModal={() => setVisible(false)}>
          <HomeModal
            item={selected}
            isEdditing={handleEdit}
            isDeleting={handleDelete}
          />
        </ModalDialog>
        <HomeHeader transactions={transactions} />
        <Header>
          <Typograph size={20} color="#778899" weight="700">
            Minhas Transações
          </Typograph>
          <Pressable onPress={handleNewTransaction}>
            <Icon name="add-circle-outline" size={30} />
          </Pressable>
        </Header>
        <Transactions
          data={transactionsMonthHome}
          selected={(value) => handleSelected(value)}
        />
      </Container>
    </>
  );
};
