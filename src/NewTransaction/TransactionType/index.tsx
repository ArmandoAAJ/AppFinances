import React, { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { Typograph } from "../../Components/Commom";
import { Button, Container } from "../styles";
import { Content, Card } from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes/Screen";
import { RouteProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

type PropsTransactionDescriptionScreen = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Step">;
  route: RouteProp<RootStackParamList, "Step">;
};

export const TransactionType: React.FC<PropsTransactionDescriptionScreen> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;
  const [titleToast, setTitleToast] = useState<string>("");
  const [place, setPlace] = useState<"CASA" | "LOJA" | "">("");

  useEffect(() => {
    if (item?.place) {
      setPlace(item?.place);
    }
  }, [item]);

  const handleChangedType = () => {
    if (place === "") {
      return;
    }
    const newItem = {
      ...item,
      place: place,
    };
    navigation.navigate("Step1", { item: newItem });
  };

  return (
    <>
      <Header>
        <Typograph size={20} weight="700">
          Tipo
        </Typograph>
      </Header>
      <Container>
        <Content>
          <Card
            onPress={() => setPlace(place === "CASA" ? "" : "CASA")}
            style={{
              borderColor:
                place === "CASA" ? "#3cb371" : "rgba(220, 220, 220, 0.3)",
            }}
          >
            <Icon name="house-user" size={30} />
            <Typograph weight="bold" color="#778899" size={18} top={5}>
              CASA
            </Typograph>
          </Card>
          <Card
            onPress={() => setPlace(place === "LOJA" ? "" : "LOJA")}
            style={{
              borderColor:
                place === "LOJA" ? "#3cb371" : "rgba(220, 220, 220, 0.3)",
            }}
          >
            <Icon name="hotel" size={30} />
            <Typograph weight="bold" color="#778899" size={18} top={5}>
              LOJA
            </Typograph>
          </Card>
        </Content>
        <Button
          disabled={place === ""}
          color={place === "" ? false : true}
          onPress={handleChangedType}
        >
          <Typograph size={18} weight="bold">
            Continuar
          </Typograph>
        </Button>
      </Container>
    </>
  );
};
