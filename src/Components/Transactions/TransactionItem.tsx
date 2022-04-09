import React from "react";
import { View } from "react-native";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/Ionicons";
import { ITransactions } from "../../Hook/TransactionsContext";
import { Typograph } from "../Commom";

import { Card, Circle } from "./styles";

interface TransactionCard {
  item: ITransactions;
  selected: () => void;
}

export const TransactionsItem: React.FC<TransactionCard> = ({
  item,
  selected,
}) => {
  const nameIcon = item.type === "ENTRADA" ? "add" : "remove";
  const date =
    item && item.createdAt && item.createdAt.seconds
      ? new Date(
          item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000
        )
      : new Date();
  return (
    <Card onPress={selected}>
      <Circle type={item.type}>
        <Icon size={22} name={nameIcon} color="#FFF" />
      </Circle>
      <View style={{ width: "80%", marginLeft: 8 }}>
        <Typograph weight="100" color="#808080" numberOfLines={1}>
          {item.description}
        </Typograph>
        <Typograph color="rgba(128,128,128, 0.6)">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(item.price || 0)}
        </Typograph>
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
