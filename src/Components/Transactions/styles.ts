import styled from "styled-components/native";
import { Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

interface PropsCircle {
  type?: "ENTRADA" | "SAÍDA";
}

export const Card = styled.Pressable`
  width: ${WIDTH - 10}px;
  height: 70px;
  flex-direction: row;
  margin-vertical: 5px;
  align-items: center;
  flex-direction: row;
  align-self: center;
  background-color: #fff;
  border-radius: 5px;
  padding-horizontal: 3px;
`;

export const Circle = styled.View<PropsCircle>`
  align-items: center;
  justify-content: center;
  background-color: ${({ type }) =>
    type === "ENTRADA" ? "#3cb371" : "#B22222"};
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
