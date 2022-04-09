import React, { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { Options } from "../../Components/Options";
import { Item } from "../../Components/Options/OptionsItem";
import { Button, Container } from "../styles";
import { Typograph } from "../../Components/Commom";
import { Header } from "../../Components/Header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../Routes/Screen";

type PropsTransactionDescriptionScreen = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Step3">;
  route: RouteProp<RootStackParamList, "Step2">;
};

export const TransactionDescriptionScreen: React.FC<
  PropsTransactionDescriptionScreen
> = ({ navigation, route }) => {
  const { item } = route.params;

  const [descriptions, setDescriptions] = useState<Item[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (item?.description) {
      setSelected(item?.description);
    }
    const subscribe = firestore()
      .collection("descriptions")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as Item[];
        setDescriptions(data);
      });
    return () => subscribe();
  }, [item]);

  const handleChangedDescription = () => {
    const newItem = {
      ...item,
      description: selected,
    };
    navigation.navigate("Step3", { item: newItem });
  };

  return (
    <>
      <Header>
        <Typograph size={20} weight="700">
          Selecione a descrição
        </Typograph>
      </Header>
      <Container>
        <Options
          title=""
          data={descriptions}
          selected={selected}
          handleSelected={(value) => setSelected(value)}
          handleRemove={() => {}}
        />
        <Button
          disabled={selected === ""}
          color={selected === "" ? false : true}
          onPress={handleChangedDescription}
        >
          <Typograph size={18} weight="bold">
            Continuar
          </Typograph>
        </Button>
      </Container>
    </>
  );
};
