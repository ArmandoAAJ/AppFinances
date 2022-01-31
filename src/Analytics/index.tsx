import React, { useEffect, useRef, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { TransactionsItem } from "../Components/Transactions/TransactionItem";
import { PropsTransaction } from "../Home";
import { Header } from "../Components/Header";
import { Typograph } from "../Components/Commom";
import { Card } from "./components/Card";
import { SPACERITEM, WIDTHITEM } from "./styles";
import { Animated, FlatList, View } from "react-native";

const FILTERED = [
  {
    initial: new Date("2022-01-01T03:00:00"),
    final: new Date("2022-01-31T03:00:00"),
  },
  {
    initial: new Date("2022-02-01T03:00:00"),
    final: new Date("2022-02-28T03:00:00"),
  },
  {
    initial: new Date("2022-03-01T03:00:00"),
    final: new Date("2022-03-31T03:00:00"),
  },
  {
    initial: new Date("2022-04-01T03:00:00"),
    final: new Date("2022-04-30T03:00:00"),
  },
];

interface PropsMonth {
  transactions?: (PropsTransaction | undefined)[];
  total?: number;
  positive?: number;
  negative?: number;
  key?: "left" | "right";
}

export const Analytics: React.FC = () => {
  const [transactions, setTransactions] = useState<PropsTransaction[]>([]);
  const [monthFiltered, setMonthFiltered] = useState<PropsMonth[] | []>([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currenIndex, setCurrentIndex] = useState(0);
  const [transactionsToIndex, setTransactionsToIndex] = useState<
    PropsTransaction[]
  >([]);

  useEffect(() => {
    if (transactions.length < 1) return;
    let arr = [] as PropsMonth[];
    for (var i = 0; i < FILTERED.length; i++) {
      const x = transactions
        .map((t) => {
          if (
            new Date(
              t.createdAt.seconds * 1000 + t.createdAt.nanoseconds / 1000000
            ) >= FILTERED[i].initial &&
            new Date(
              t.createdAt.seconds * 1000 + t.createdAt.nanoseconds / 1000000
            ) <= FILTERED[i].final
          ) {
            return t;
          }
        })
        .filter((t) => t !== undefined && t.active);
      const total = x
        .map((i) => i)
        .reduce((accum, curr) => {
          if (curr && curr.type === "ENTRADA") {
            return (accum += curr.price);
          }
          if (curr && curr.type === "SAÍDA") {
            return (accum -= curr.price);
          }
          return accum;
        }, 0);
      const positive = x
        .filter((i) => i?.type === "ENTRADA")
        .reduce((accum, curr) => (accum += curr?.price || 0), 0);
      const negative = x
        .filter((i) => i?.type === "SAÍDA")
        .reduce((accum, curr) => (accum += curr?.price || 0), 0);
      if (x.length > 0) {
        arr.push({ transactions: x, total, positive, negative });
      }
    }
    if (arr.length > 0) {
      arr.splice(0, 0, { key: "left" });
      arr.splice(arr.length, 0, { key: "right" });
      setMonthFiltered(arr);
      setCurrentIndex(1);
    }
  }, [transactions]);

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

  useEffect(() => {
    if (monthFiltered.length < 1) return;
    console.log(currenIndex);
    const filtered = monthFiltered[currenIndex].transactions;
    setTransactionsToIndex(filtered);
  }, [currenIndex, monthFiltered]);

  return (
    <>
      <Header>
        <Typograph size={20} weight="700">
          Resumo
        </Typograph>
      </Header>
      <Animated.FlatList
        data={monthFiltered}
        renderItem={({ item, index }) => {
          if (item.key) {
            return (
              <View
                style={{
                  width: SPACERITEM,
                  height: 210,
                }}
              />
            );
          }
          const INPUTRANGE = [
            (index - 2) * WIDTHITEM,
            (index - 1) * WIDTHITEM,
            index * WIDTHITEM,
          ];
          const scaleY = scrollX.interpolate({
            inputRange: INPUTRANGE,
            outputRange: [0.7, 1, 0.7],
          });
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 2) * WIDTHITEM,
              (index - 1) * WIDTHITEM,
              index * WIDTHITEM,
            ],
            outputRange: [0, 1, 0],
          });
          const opacityCard = scrollX.interpolate({
            inputRange: [
              (index - 2) * WIDTHITEM,
              (index - 1) * WIDTHITEM,
              index * WIDTHITEM,
            ],
            outputRange: [0.5, 1, 0.5],
          });
          return (
            <Card
              scaleY={scaleY}
              opacity={opacity}
              opacityCard={opacityCard}
              item={item && item.transactions}
              total={item.total}
              positive={item.positive}
              negative={item.negative}
            />
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => String(index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          marginVertical: 5,
        }}
        snapToInterval={WIDTHITEM}
        decelerationRate={0}
        style={{ maxHeight: 210 }}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.x / WIDTHITEM
          );
          if (index + 1 === currenIndex) return;
          setCurrentIndex(index + 1);
        }}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={transactionsToIndex}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionsItem selected={() => {}} item={item} />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};
