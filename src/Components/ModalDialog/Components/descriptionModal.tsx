import React from 'react';
import {Typograph} from '../../Commom';
import {Circle} from '../../Options/styles';
import {Button, Container} from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Item} from '../../Options/OptionsItem';
import {View} from 'react-native';

interface PropsDescriptionModal {
  data: Item;
  isDeleting: () => void;
}

export const DescriptionModal: React.FC<PropsDescriptionModal> = ({
  data,
  isDeleting,
}) => {
  return (
    <Container>
      <Typograph
        style={{textAlign: 'center'}}
        size={20}
        color="rgba(128,128,128, 0.6)">
        Selecione a opção desejada
      </Typograph>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
        <Circle>
          <Icon name="receipt-outline" size={20} color="#778899" />
        </Circle>
        <Typograph left={10} color="#808080">
          {data.description}
        </Typograph>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}>
        <Button
          width="100%"
          onPress={isDeleting}
          style={{flexDirection: 'row'}}>
          <Icon name="trash" size={20} color="#fff" />
          <Typograph left={30} weight="700">
            Excluir
          </Typograph>
        </Button>
      </View>
    </Container>
  );
};
