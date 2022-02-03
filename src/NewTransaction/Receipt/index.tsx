import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Typograph } from "../../Components/Commom";
import { Header } from "../../Components/Header";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes/Screen";
import firestore from "@react-native-firebase/firestore";

import { Container, Receipt, Circle, Button } from "../styles";
import { Loader } from "../../Components/Loading";
import { Toast } from "../../Components/Toast";

type PropsTransactionValueScreen = {
  navigation: NativeStackNavigationProp<RootStackParamList, "HomeStack">;
  route: RouteProp<RootStackParamList, "Step4">;
};

export const ReceiptScreen: React.FC<PropsTransactionValueScreen> = ({
  route,
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [typeToast, setTypeToast] = useState<"SUCCESS" | "DANGER" | "WARNING">(
    "SUCCESS"
  );
  const [titleToast, setTitleToast] = useState<string>("");
  const { item } = route.params;

  const nameIcon = item?.type === "ENTRADA" ? "add" : "remove";
  const colorIcon = item?.type === "ENTRADA" ? "#3cb371" : "#B22222";

  const handleAddEditTransaction = async () => {
    setLoading(true);
    firestore()
      .collection("transactions")
      .doc(item.id)
      .update({
        description: item.description,
        price: item.price,
        type: item.type,
        createdAt: item.createdAt,
        editedAt: firestore.FieldValue.serverTimestamp(),
        active: true,
      })
      .then(() => {
        setTitleToast("Transação atualizada com sucesso");
        setTypeToast("SUCCESS");
        setVisible(true);
        setTimeout(() => {
          navigation.navigate("HomeStack");
        }, 800);
      })
      .catch(() => {
        setTypeToast("DANGER");
        setTitleToast("Erro ao editar transação");
        setVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddNewTransaction = async () => {
    setLoading(true);
    firestore()
      .collection("transactions")
      .add({
        description: item.description,
        price: item.price,
        type: item.type,
        createdAt: firestore.FieldValue.serverTimestamp(),
        editedAt: firestore.FieldValue.serverTimestamp(),
        active: true,
      })
      .then(() => {
        setTitleToast("Transação cadastrada com sucesso");
        setTypeToast("SUCCESS");
        setVisible(true);
        setTimeout(() => {
          navigation.navigate("HomeStack");
        }, 800);
      })
      .catch(() => {
        setTitleToast("Erro ao cadastrar transação");
        setTypeToast("DANGER");
        setVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDissmis = () => {
    setTitleToast("");
    setVisible(false);
  };

  return (
    <>
      <Header>
        <Typograph size={20} weight="700">
          Comprovante
        </Typograph>
      </Header>
      <Container>
        <Receipt>
          <Circle>
            <Icon size={30} name={nameIcon} color={colorIcon} />
          </Circle>
          <Typograph size={20} color="#778899" left={25}>
            {item?.type}
          </Typograph>
        </Receipt>
        <Receipt>
          <Circle>
            <Icon name="receipt-outline" size={30} color="#778899" />
          </Circle>
          <Typograph size={20} color="#778899" left={25}>
            {item?.description}
          </Typograph>
        </Receipt>
        <Receipt>
          <Circle>
            <Typograph size={20} color="#778899">
              R$
            </Typograph>
          </Circle>
          <Typograph size={20} color="#778899" left={25}>
            {item?.price}
          </Typograph>
        </Receipt>
        <Button
          color={true}
          onPress={item.id ? handleAddEditTransaction : handleAddNewTransaction}
        >
          <Typograph size={18} weight="bold">
            Salvar
          </Typograph>
        </Button>
      </Container>
      <Toast
        type={typeToast}
        visible={visible}
        onDismissSnackBar={handleDissmis}
        title={titleToast}
      />
      {loading && <Loader show={loading} title="Salvando, aguarde" />}
    </>
  );
};
