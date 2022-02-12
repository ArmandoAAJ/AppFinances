import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyTab } from "./Tab";
import { NewTransactionScreen } from "../NewTransaction";
import { TransactionDescriptionScreen } from "../NewTransaction/TransactionDescription";
import { TransactionValueScreen } from "../NewTransaction/TransactionValue";
import { ReceiptScreen } from "../NewTransaction/Receipt";
import { TransactionType } from "../NewTransaction/TransactionType";

export interface PropsItem {
  active?: boolean;
  createdAt?: { nanoseconds: number; seconds: number };
  description?: string;
  editedAt?: Date;
  price?: number;
  type?: "ENTRADA" | "SAÍDA";
  id?: string;
}

export type RootStackParamList = {
  HomeStack: undefined;
  Step: { item: PropsItem };
  Step1: { item: PropsItem };
  Step2: { item: PropsItem };
  Step3: { item: PropsItem };
  Step4: { item: PropsItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const MyStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeStack" component={MyTab} />
      <Stack.Screen name="Step" component={TransactionType} />
      <Stack.Screen name="Step1" component={NewTransactionScreen} />
      <Stack.Screen name="Step2" component={TransactionDescriptionScreen} />
      <Stack.Screen name="Step3" component={TransactionValueScreen} />
      <Stack.Screen name="Step4" component={ReceiptScreen} />
    </Stack.Navigator>
  );
};
