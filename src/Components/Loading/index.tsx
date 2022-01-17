import React from 'react';
import {Typograph} from '../Commom';

import {LoadingView, SpinnerContainer, Spinner} from './styles';

interface PropLoader {
  show: boolean;
  title?: string;
}

export const Loader: React.FC<PropLoader> = ({show, title}) => {
  if (!show) {
    return null;
  }

  return (
    <LoadingView>
      <SpinnerContainer>
        <Spinner size="large" color="#a6abb0" />
        {title && (
          <Typograph size={14} top={10} color="#a6abb0">
            {title}
          </Typograph>
        )}
      </SpinnerContainer>
    </LoadingView>
  );
};
