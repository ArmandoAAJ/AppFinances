import React from "react";
import { View } from "react-native";
import { PropsTransaction } from "../../../Home";
import { Typograph } from "../../Commom";
import { Button, Container } from "../styles";
import { Circle } from "../../Transactions/styles";
import Icon from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome5";

// import { Container } from './styles';
interface PropsHomeModal {
  item: PropsTransaction;
  isEdditing: () => void;
  isDeleting: () => void;
}

export const HomeModal: React.FC<PropsHomeModal> = ({
  item,
  isDeleting,
  isEdditing,
}) => {
  const nameIcon = item.place === "CASA" ? "house-user" : "hotel";
  return (
    <Container>
      <Typograph
        style={{ textAlign: "center" }}
        size={20}
        color="rgba(128,128,128, 0.6)"
      >
        Selecione a opção desejada
      </Typograph>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Circle type={item.type}>
          <IconF size={22} name={nameIcon} color="#FFF" />
        </Circle>
        <View style={{ width: "80%", marginLeft: 8 }}>
          <Typograph weight="100" color="#808080" numberOfLines={1}>
            {item.description}
          </Typograph>
          <Typograph color="rgba(128,128,128, 0.6)">R$ {item.price}</Typograph>
        </View>
        <Typograph
          style={{ position: "absolute", bottom: 10, right: 10 }}
          color="rgba(128,128,128, 0.6)"
          size={12}
        >
          12/12/2021
        </Typograph>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
        }}
      >
        <Button background="#EC571F" onPress={isEdditing}>
          <Typograph weight="700">Editar</Typograph>
        </Button>
        <Button width="20%" onPress={isDeleting}>
          <Icon name="trash" size={20} color="#fff" />
        </Button>
      </View>
    </Container>
  );
};
