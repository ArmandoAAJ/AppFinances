import React, { useEffect, useMemo, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import { Transactions } from "../Components/Transactions";
import { Typograph } from "../Components/Commom";
import { Container, Content, Header } from "./styles";
import { Pressable } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import { RootStackParamList } from "../Routes/Screen";
import ModalDialog from "../Components/ModalDialog";
import { Toast } from "../Components/Toast";
import { HomeModal } from "../Components/ModalDialog/Components/homeModal";

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
  const focused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [transactions, setTransactions] = useState<PropsTransaction[]>([]);
  const [typeToast, setTypeToast] = useState<"SUCCESS" | "DANGER" | "WARNING">(
    "SUCCESS"
  );
  const [titleToast, setTitleToast] = useState<string>("");
  const [selected, setSelected] = useState<PropsTransaction>(
    {} as PropsTransaction
  );
  const [sum, setSum] = useState(0);
  const handleNewTransaction = () => {
    navigation.navigate("Step", { item: {} });
  };

  const handleSelected = (item: PropsTransaction) => {
    setVisible(true);
    setSelected(item);
  };

  useMemo(() => {
    if (transactions.length < 1) {
      setSum(0);
      return;
    }
    const total = transactions
      .map((i) => i)
      .reduce((accum, curr) => {
        if (curr.type === "ENTRADA") {
          return (accum += curr.price);
        } else {
          return (accum -= curr.price);
        }
      }, 0);
    setSum(total);
  }, [transactions]);

  useEffect(() => {
    if (focused) {
      setSelected({} as PropsTransaction);
    }
  }, [focused]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("transactions")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as PropsTransaction[];
        if (data.length < 1) {
          return;
        }
        const filtered = data.filter((d) => d.active);
        setTransactions(filtered);
      });
    return () => subscribe();
  }, []);

  const handleEdit = () => {
    console.log(selected);
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
        <Content style={{ backgroundColor: sum < 0 ? "#B22222" : "#3cb371" }}>
          <Typograph size={40} weight="700">
            R$ {sum},00
          </Typograph>
        </Content>
        <Header>
          <Typograph size={20} color="#778899" weight="700">
            Minhas Transações
          </Typograph>
          <Pressable onPress={handleNewTransaction}>
            <Icon name="add-circle-outline" size={30} />
          </Pressable>
        </Header>
        <Transactions
          data={transactions}
          selected={(value) => handleSelected(value)}
        />
      </Container>
    </>
  );
};
