import React, { useMemo } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Typograph } from "../../Components/Commom";
import { ITransactions } from "../../Hook/TransactionsContext";
import { Circle } from "../../NewTransaction/styles";
import { Content } from "../styles";

// import { Container } from './styles';

interface PropsHomeHeader {
  transactions: ITransactions[];
}

export const HomeHeader: React.FC<PropsHomeHeader> = ({ transactions }) => {
  const totals = useMemo(() => {
    const sum = transactions
      .map((i) => i)
      .reduce((accum, curr) => {
        if (curr.type === "ENTRADA") {
          return (accum += curr.price);
        } else {
          return (accum -= curr.price);
        }
      }, 0);
    return sum;
  }, [transactions]);

  const totalStore = useMemo(() => {
    const transactionStore = transactions
      .map((t) => t)
      .filter((t) => t.place === "LOJA");
    const sum = transactionStore.reduce((accum, curr) => {
      if (curr.type === "ENTRADA") {
        return (accum += curr.price);
      } else {
        return (accum -= curr.price);
      }
    }, 0);
    return sum;
  }, [transactions]);

  const totalHouse = useMemo(() => {
    const transactionStore = transactions
      .map((t) => t)
      .filter((t) => t.place === "CASA");
    const sum = transactionStore.reduce((accum, curr) => {
      if (curr.type === "ENTRADA") {
        return (accum += curr.price);
      } else {
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
          <Circle>
            <Icon name="house-user" size={22} color="#FFF" />
          </Circle>
          <Typograph top={5} size={20} weight="700">
            R$ {totalHouse},00
          </Typograph>
        </View>
        <View style={{ alignItems: "center" }}>
          <Circle>
            <Icon name="hotel" size={22} color="#FFF" />
          </Circle>
          <Typograph top={5} size={20} weight="700">
            R$ {totalStore},00
          </Typograph>
        </View>
      </View>
    </Content>
  );
};
