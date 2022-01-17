import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Container} from './styles';

export const Header: React.FC = ({children}) => {
  const navigation = useNavigation();
  return (
    <Container>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon color="#FFF" size={40} name="arrow-undo-circle-outline" />
      </Pressable>
      {children}
      <View />
    </Container>
  );
};
