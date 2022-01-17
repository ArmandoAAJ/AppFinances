import styled from 'styled-components/native';

export const Container = styled.Pressable`
  background-color: white;
  border-radius: 5px;
  width: 90%;
  height: 50%;
  padding: 20px;
`;

export const Content = styled.Pressable`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

interface PropsButton {
  background?: string;
  width?: string;
}

export const Button = styled.Pressable<PropsButton>`
  width: ${({width}) => width || '78%'};
  background-color: ${({background}) => background || '#B22222'};
  border-radius: 4px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;
