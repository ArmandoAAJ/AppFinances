import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-horizontal: 10px;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: 30px;
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

interface PropsButton {
  color?: boolean;
}

export const Button = styled.Pressable<PropsButton>`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${({color}) => (color === true ? '#3cb371' : '#778899')};
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
`;

export const Receipt = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 30px;
`;

export const Circle = styled.View`
  align-items: center;
  justify-content: center;
  background-color: rgba(220, 220, 220, 0.3);
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
