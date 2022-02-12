import styled from "styled-components/native";
import { Dimensions, Animated } from "react-native";
export const { width } = Dimensions.get("window");
export const SPACING = 6;
export const WIDTHITEM = width * 0.8;
export const SPACERITEM = (width - WIDTHITEM) / 2;

export const Content = styled(Animated.View)`
  margin: 10px 10px;
`;

export const Card = styled(Animated.View)`
  width: ${WIDTHITEM - 10}px;
  height: 200px;
  background-color: #f9f8f8f7;
`;

export const Header = styled.View`
  width: 100%;
  height: 15%;
  background-color: #60a7de;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  align-items: center;
  justify-content: center;
`;

interface PropsBorder {
  borderB?: boolean;
  borderL?: boolean;
}

export const Border = styled.View<PropsBorder>`
  ${({ borderB }) =>
    borderB &&
    `
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  margin: 5px 30px;
`}
  ${({ borderL }) =>
    borderL &&
    `
  border-Left-width: 1px;
  border-Left-color: #ddd;
  margin-left: 1%;
  margin-vertical: 20px;
`}
`;

export const CardType = styled.View`
  width: 49%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
