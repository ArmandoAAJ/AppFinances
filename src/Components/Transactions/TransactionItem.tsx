import React from "react";
import { View } from "react-native";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/Ionicons";
import { PropsTransaction } from "../../Home";
import { Typograph } from "../Commom";

import { Card, Circle } from "./styles";

interface TransactionCard {
  item: PropsTransaction;
  selected: () => void;
}

export const TransactionsItem: React.FC<TransactionCard> = ({
  item,
  selected,
}) => {
  const nameIcon = item.type === "ENTRADA" ? "add" : "remove";
  const colorIcon = item.type === "ENTRADA" ? "#3cb371" : "#B22222";
  console.log(item);
  const date =
    item && item.createdAt
      ? new Date(
          item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000
        )
      : new Date();
  return (
    <Card onPress={selected}>
      <Circle>
        <Icon size={25} name={nameIcon} color={colorIcon} />
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
        {format(new Date(date), "dd/MM/yyyy")}
      </Typograph>
    </Card>
  );
};
