import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Typograph} from '../Commom';
import {useRoute} from '@react-navigation/native';
import {Circle, Container} from './styles';

export interface Item {
  id: string;
  description: string;
  createdAt: Date;
}

interface PropsOptionsItem {
  data: Item;
  handleRemove: () => void;
  handleSelectDescription?: () => void;
  selected?: boolean;
}

export const OptionsItem: React.FC<PropsOptionsItem> = ({
  data,
  handleRemove,
  handleSelectDescription,
  selected,
}) => {
  const route = useRoute();
  return (
    <Container
      onPress={route.name === 'Step2' ? handleSelectDescription : handleRemove}>
      <Circle selected={selected}>
        <Icon
          name="receipt-outline"
          size={20}
          color={selected ? '#FFF' : '#778899'}
        />
      </Circle>
      <Typograph left={10} color="#808080">
        {data.description}
      </Typograph>
    </Container>
  );
};
