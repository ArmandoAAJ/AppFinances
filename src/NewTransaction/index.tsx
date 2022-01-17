import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Typograph} from '../Components/Commom';
import {Header} from '../Components/Header';

import {Button, Card, Container, Content} from './styles';
import {RootStackParamList} from '../Routes/Screen';
import {RouteProp} from '@react-navigation/native';

interface PropsNewTransactionScreen {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Step1'>;
  route: RouteProp<RootStackParamList, 'Step1'>;
}

export const NewTransactionScreen: React.FC<PropsNewTransactionScreen> = ({
  navigation,
  route,
}) => {
  const {item} = route.params;
  const [type, setType] = useState<'ENTRADA' | 'SAÍDA' | ''>('');

  useEffect(() => {
    if (item?.type) {
      setType(item?.type);
    }
  }, [item]);

  const handleChnageType = () => {
    if (!type) {
      return;
    }
    let newItem = {};
    if (item) {
      newItem = {
        ...item,
        type,
      };
    } else {
      newItem = {
        type,
      };
    }
    navigation.navigate('Step2', {item: newItem});
  };

  return (
    <>
      <Header>
        <Typograph size={20} weight="700">
          Descrição
        </Typograph>
      </Header>
      <Container>
        <Content>
          <Card
            style={{
              borderColor:
                type === 'ENTRADA' ? '#3cb371' : 'rgba(220, 220, 220, 0.3)',
            }}
            onPress={() => setType(type === 'ENTRADA' ? '' : 'ENTRADA')}>
            <Icon name="add" size={30} color="#3cb371" />
            <Typograph top={10} size={14} color="#3cb371" weight="700">
              RECEITA
            </Typograph>
          </Card>
          <Card
            style={{
              borderColor:
                type === 'SAÍDA' ? '#B22222' : 'rgba(220, 220, 220, 0.3)',
            }}
            onPress={() => setType(type === 'SAÍDA' ? '' : 'SAÍDA')}>
            <Icon name="remove" size={30} color="#B22222" />
            <Typograph top={10} size={14} color="#B22222" weight="700">
              DESPESA
            </Typograph>
          </Card>
        </Content>
        <Button
          disabled={type === ''}
          color={type === '' ? false : true}
          onPress={handleChnageType}>
          <Typograph size={18} weight="bold">
            Continuar
          </Typograph>
        </Button>
      </Container>
    </>
  );
};
