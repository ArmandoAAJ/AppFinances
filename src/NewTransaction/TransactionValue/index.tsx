import React, {useEffect, useState} from 'react';
import {TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Typograph} from '../../Components/Commom';
import {Button, Circle, Container} from '../styles';
import {Header} from '../../Components/Header';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../Routes/Screen';

type PropsTransactionValueScreen = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Step4'>;
  route: RouteProp<RootStackParamList, 'Step3'>;
};

export const TransactionValueScreen: React.FC<PropsTransactionValueScreen> = ({
  navigation,
  route,
}) => {
  const [text, setText] = useState('');
  const {item} = route.params;

  useEffect(() => {
    if (item?.price) {
      setText(String(item?.price));
    }
  }, [item]);

  const handleConfirm = () => {
    const value = text.replace(/\D/g, '');
    const newItem = {
      ...item,
      price: Number(value),
    };
    navigation.navigate('Step4', {item: newItem});
  };

  const nameIcon = item?.type === 'ENTRADA' ? 'add' : 'remove';
  const colorIcon = item?.type === 'ENTRADA' ? '#3cb371' : '#B22222';

  return (
    <>
      <Header>
        <Typograph size={20} weight="700">
          Digite o valor
        </Typograph>
      </Header>
      <Container>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginTop: 30,
            alignItems: 'center',
          }}>
          <Circle>
            <Icon size={25} name={nameIcon} color={colorIcon} />
          </Circle>
          <TextInput
            autoFocus={true}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#778899',
              fontSize: 16,
              width: '80%',
              marginLeft: 10,
            }}
            keyboardType="numeric"
            maxLength={8}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => setText(value)}
            value={text}
            placeholder="Digite o VALOR"
          />
        </View>
        <Button
          disabled={text.length < 1}
          color={text.length < 1 ? false : true}
          onPress={handleConfirm}>
          <Typograph size={18} weight="bold">
            Salvar
          </Typograph>
        </Button>
      </Container>
    </>
  );
};
