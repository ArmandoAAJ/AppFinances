import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
const WIDTH = Dimensions.get('window').width;

export const Card = styled.Pressable`
  width: ${WIDTH - 10}px;
  height: 70px;
  flex-direction: row;
  margin-vertical: 5px;
  align-items: center;
  flex-direction: row;
  align-self: center;
`;

export const Circle = styled.View`
  align-items: center;
  justify-content: center;
  background-color: rgba(220, 220, 220, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
