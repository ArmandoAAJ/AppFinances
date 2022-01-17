import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, TextInput, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Typograph} from '../Components/Commom';
import {Options} from '../Components/Options';
import {Button, Container} from './styles';
import {Loader} from '../Components/Loading';
import {Toast} from '../Components/Toast';
import {Item} from '../Components/Options/OptionsItem';
import {Header} from '../Components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalDialog from '../Components/ModalDialog';
import {DescriptionModal} from '../Components/ModalDialog/Components/descriptionModal';

export const Descriptions: React.FC = () => {
  const isFocus = useIsFocused();
  const ref = useRef<TextInput>(null);
  const [typeToast, setTypeToast] = useState<'SUCCESS' | 'DANGER' | 'WARNING'>(
    'SUCCESS',
  );
  const [titleToast, setTitleToast] = useState<string>('');
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [descriptions, setDescriptions] = useState<Item[]>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selected, setSelected] = useState<Item>({} as Item);

  useEffect(() => {
    if (isFocus) {
      ref.current?.focus();
    }
  }, [isFocus]);

  useEffect(() => {
    const subscribe = firestore()
      .collection('descriptions')
      .orderBy('description', 'asc')
      .onSnapshot(querySnapShot => {
        const data = querySnapShot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as Item[];
        setDescriptions(data);
      });
    return () => subscribe();
  }, []);

  const handleDescriptionAdd = async () => {
    Keyboard.dismiss();
    setLoading(true);
    firestore()
      .collection('descriptions')
      .add({
        description: text,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTitleToast('Descrição cadastrada com sucesso');
        setTypeToast('SUCCESS');
        setVisible(true);
        setText('');
      })
      .catch(() => {
        setTypeToast('DANGER');
        setTitleToast('Erro ao cadastrar transação');
        setVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDissmis = () => {
    setTitleToast('');
    setVisible(false);
  };

  const handleRemove = (value: Item) => {
    setVisibleModal(true);
    setSelected(value);
  };

  const handleDelete = () => {
    firestore().collection('descriptions').doc(selected.id).delete();
    setVisibleModal(false);
    setTitleToast('Descrição removido com sucesso');
    setVisible(true);
  };

  return (
    <>
      <Toast
        type={typeToast}
        visible={visible}
        onDismissSnackBar={handleDissmis}
        title={titleToast}
      />
      <Header>
        <Typograph size={20} weight="700">
          Descrição
        </Typograph>
      </Header>
      <Container>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <TextInput
            ref={ref}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#778899',
              fontSize: 16,
              width: '78%',
              height: 45,
            }}
            autoCapitalize="characters"
            autoCorrect={false}
            onChangeText={value => setText(value.toUpperCase())}
            value={text}
            autoFocus={true}
            placeholder="Digite aqui sua despesa ou receita"
          />
          <Button
            disabled={text.length < 1}
            color={text.length < 1 ? false : true}
            onPress={handleDescriptionAdd}>
            <Icon name="checkmark-outline" size={25} color="#FFF" />
          </Button>
        </View>
        <Options
          data={descriptions}
          title=""
          handleRemove={(value: Item) => handleRemove(value)}
        />
      </Container>
      <ModalDialog
        visible={visibleModal}
        isModal={() => setVisibleModal(false)}>
        <DescriptionModal data={selected} isDeleting={handleDelete} />
      </ModalDialog>
      {loading && <Loader show={loading} title="Salvando, aguarde" />}
    </>
  );
};
