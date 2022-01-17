import React from 'react';
import {Modal} from 'react-native';
import {Content} from './styles';

interface PropsModal {
  visible: boolean;
  isModal: () => void;
}

const ModalDialog: React.FC<PropsModal> = ({visible, isModal, children}) => {
  if (!visible) {
    return <></>;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={isModal}>
      <Content onPress={isModal}>{children}</Content>
    </Modal>
  );
};

export default ModalDialog;
