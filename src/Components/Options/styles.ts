import styled from 'styled-components/native';

export const Container = styled.Pressable`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: rgba(220, 220, 220, 0.3);
  padding-vertical: 5px;
`;

interface PropsCircle {
  selected?: boolean;
}

export const Circle = styled.View<PropsCircle>`
  align-items: center;
  justify-content: center;
  background-color: ${({selected}) =>
    selected ? '#3cb371' : 'rgba(220, 220, 220, 0.3)'};
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
