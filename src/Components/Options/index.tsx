import React from 'react';
import {Typograph} from '../Commom';
import {Item} from './OptionsItem';
import {OptionsList} from './OptionsList';

// import { Container } from './styles';

interface PropsOptions {
  data: Item[];
  title: string;
  selected?: string;
  handleSelected?: (value: string) => void;
  handleRemove: (value: Item) => void;
}

export const Options: React.FC<PropsOptions> = ({
  data,
  title,
  selected,
  handleSelected,
  handleRemove,
}) => {
  return (
    <>
      {title.length !== 0 && (
        <Typograph top={10} bottom={10} size={20} color="#778899" weight="700">
          {title}
        </Typograph>
      )}
      <OptionsList
        data={data}
        handleSelected={value => handleSelected && handleSelected(value)}
        selected={selected}
        handleRemove={value => handleRemove(value)}
      />
    </>
  );
};
