import styled from 'styled-components/native';

export const LoadingView = styled.View.attrs({
  elevation: 10,
})`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  flex: 1;
  height: 100%;
  width: 100%;
`;

export const SpinnerContainer = styled.View`
  height: 150px;
  width: 150px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  elevation: 5;
`;

export const Spinner = styled.ActivityIndicator``;
