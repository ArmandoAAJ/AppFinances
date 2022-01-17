import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin-horizontal: 10px;
`;

interface PropsButton {
  color: boolean;
}

export const Button = styled.Pressable<PropsButton>`
  width: 20%;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${({color}) => (color === true ? '#3cb371' : '#778899')};
  margin-top: 5px;
  border-radius: 5px;
`;
