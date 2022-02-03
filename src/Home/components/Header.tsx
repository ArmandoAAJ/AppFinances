import React, { useMemo, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Typograph } from "../../Components/Commom";
import { ITransactions } from "../../Hook/TransactionsContext";
import { Circle } from "../../NewTransaction/styles";
import { Content } from "../styles";

// import { Container } from './styles';

interface PropsHomeHeader {
  transactions: ITransactions[];
}

export const HomeHeader: React.FC<PropsHomeHeader> = ({ transactions }) => {
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);

  const totals = useMemo(() => {
    const sum = transactions
      .map((i) => i)
      .reduce((accum, curr) => {
        if (curr.type === "ENTRADA") {
          setPositive((oldValue) => oldValue + curr.price);
          return (accum += curr.price);
        } else {
          setNegative((oldValue) => oldValue + curr.price);
          return (accum -= curr.price);
        }
      }, 0);
    return sum;
  }, [transactions]);

  return (
    <Content>
      <View>
        <Typograph size={30} weight="700">
          R$ {totals},00
        </Typograph>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Circle style={{ backgroundColor: "#FFF" }}>
            <Icon name="add" size={30} color="#3cb371" />
          </Circle>
          <Typograph top={5} size={20} weight="700">
            R$ {positive},00
          </Typograph>
        </View>
        <View style={{ alignItems: "center" }}>
          <Circle style={{ backgroundColor: "#FFF" }}>
            <Icon name="remove" size={30} color="#B22222" />
          </Circle>
          <Typograph top={5} size={20} weight="700">
            R$ {negative},00
          </Typograph>
        </View>
      </View>
    </Content>
  );
};
