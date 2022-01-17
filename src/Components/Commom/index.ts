import styled from 'styled-components/native';
import {TextProps} from 'react-native';

interface PropsTypograh extends TextProps {
  color?: string;
  size?: number;
  weight?: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export const Typograph = styled.Text<PropsTypograh>`
  color: ${({color}) => color || '#FFF'};
  font-size: ${({size}) => size || 16}px;
  font-weight: ${({weight}) => weight || 'normal'};
  margin-top: ${({top}) => top || 0}px;
  margin-left: ${({left}) => left || 0}px;
  margin-bottom: ${({bottom}) => bottom || 0}px;
  margin-right: ${({right}) => right || 0}px;
`;
