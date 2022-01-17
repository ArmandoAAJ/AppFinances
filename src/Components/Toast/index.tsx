import React from 'react';
import {Snackbar} from 'react-native-paper';

// import { Container } from './styles';

interface PropsToast {
  visible: boolean;
  onDismissSnackBar: () => void;
  type: 'SUCCESS' | 'DANGER' | 'WARNING';
  title: string;
}

export const Toast: React.FC<PropsToast> = ({
  visible,
  onDismissSnackBar,
  type,
  title,
}) => {
  const Options = (
    value: 'SUCCESS' | 'DANGER' | 'WARNING',
    description: string,
  ) => {
    if (value === 'SUCCESS') {
      return {
        title: description,
        color: '#377868',
      };
    }
    if (value === 'DANGER') {
      return {
        title: description,
        color: '#EB4B1F',
      };
    }
  };

  return (
    <Snackbar
      style={{
        marginBottom: 100,
        backgroundColor: Options(type, title)?.color,
      }}
      visible={visible}
      onDismiss={onDismissSnackBar}
      duration={2000}>
      {Options(type, title)?.title}
    </Snackbar>
  );
};
