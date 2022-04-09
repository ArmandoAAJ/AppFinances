import React, { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "../Components/Header";
import { Typograph } from "../Components/Commom";
import { Card } from "./components/Card";
import { SPACERITEM, WIDTHITEM } from "./styles";
import { Animated, FlatList, View } from "react-native";
import { ITransactions, useTransaction } from "../Hook/TransactionsContext";
import { TransactionsItem } from "../Components/Transactions/TransactionItem";
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
  {
    initial: new Date("2022-05-01T03:00:00"),
    final: new Date("2022-05-31T03:00:00"),
  },
];

interface PropsMonth {
  transactions: ITransactions[] | undefined;
  total: number;
  positive: number;
  negative: number;
}

export const Analytics: React.FC = () => {
  const { loadData, transactions } = useTransaction();
  const flatListRef = useRef<FlatList>(null);
  const flatListTransaction = useRef<FlatList>(null);
  const [monthFiltered, setMonthFiltered] = useState([] as any);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [transactionsToIndex, setTransactionsToIndex] = useState<
    ITransactions[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState<ITransactions[]>([]);
  useEffect(() => {
    //Carregar todas as trasações
    loadData();
  }, []);

  useEffect(() => {
    if (transactions.length < 1) return;
    const auxT = [];
    for (var i = 0; i < FILTERED.length; i++) {
      const x = transactions
        .map((t) => {
          if (!t.createdAt) return;
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
          if (curr && curr.price && curr.type === "ENTRADA") {
            return (accum += curr.price);
          }
          if (curr && curr.price && curr.type === "SAÍDA") {
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
        auxT.push({
          transactions: x,
          total,
          positive,
          negative,
        });
      }
    }
    setMonthFiltered(auxT);
    console.log(auxT.length);
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        animated: true,
        offset: auxT.length * WIDTHITEM - WIDTHITEM,
      });
    }, 700);
  }, [transactions]);

  useEffect(() => {
    if (
      transactionsToIndex.length > 0 &&
      currentIndex.length > 0 &&
      currentIndex[0].id === transactionsToIndex[0].id
    )
      return;
    flatListTransaction.current?.scrollToOffset({ animated: true, offset: 0 });
    setTransactionsToIndex(currentIndex);
  }, [currentIndex]);

  const handlex = useCallback(({ changed }) => {
    if (changed.length < 1) return;
    const x = changed[0];
    setCurrentIndex(x.item.transactions);
  }, []);

  return (
    <>
      <Header>
        <Typograph size={20} weight="700">
          Resumo
        </Typograph>
      </Header>
      <Animated.FlatList
        ref={flatListRef}
        data={monthFiltered}
        renderItem={({ item, index }) => {
          const INPUTRANGE = [
            (index - 1) * WIDTHITEM,
            index * WIDTHITEM,
            (index + 1) * WIDTHITEM,
          ];
          const scaleY = scrollX.interpolate({
            inputRange: INPUTRANGE,
            outputRange: [0.7, 1, 0.7],
          });
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * WIDTHITEM,
              index * WIDTHITEM,
              (index + 1) * WIDTHITEM,
            ],
            outputRange: [0, 1, 0],
          });
          const opacityCard = scrollX.interpolate({
            inputRange: [
              (index - 1) * WIDTHITEM,
              index * WIDTHITEM,
              (index + 1) * WIDTHITEM,
            ],
            outputRange: [0.5, 1, 0.5],
          });
          return (
            <>
              {index === 0 && <View style={{ width: SPACERITEM + 5 }} />}
              <Card
                scaleY={scaleY}
                opacity={opacity}
                opacityCard={opacityCard}
                item={item && item.transactions}
                total={item.total}
                positive={item.positive}
                negative={item.negative}
              />
              {index === monthFiltered.length - 1 && (
                <View style={{ width: SPACERITEM - 5 }} />
              )}
            </>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: WIDTHITEM,
          offset: WIDTHITEM * index,
          index,
        })}
        keyExtractor={(_, index) => String(index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          marginVertical: 5,
        }}
        onViewableItemsChanged={handlex}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 95,
        }}
        snapToInterval={WIDTHITEM}
        decelerationRate={0}
        style={{ maxHeight: 210 }}
      />
      <Animated.View style={{ flex: 1 }}>
        <FlatList
          data={transactionsToIndex}
          ref={flatListTransaction}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TransactionsItem selected={() => {}} item={item} />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </>
  );
};
