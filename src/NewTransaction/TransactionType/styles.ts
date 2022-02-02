import styled from "styled-components/native";

export const Container = styled.View``;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin: 30px 0;
`;

export const Card = styled.Pressable`
  width: 48%;
  height: 100px;
  border-width: 1.5px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: rgba(220, 220, 220, 0.3);
`;
