import React from 'react';
import { FlatList } from 'react-native';

import { Service } from './service';
import { styles } from '../styles/services';

type Service = { id: string; name: string };
type ServicesProps = {
  onSelect: (item: Service) => void;
  isSelected: (item: Service) => boolean;
};

const SERVICES: Service[] = [
  { id: '1', name: 'Makeup' },
  { id: '2', name: 'Plumber' },
  { id: '3', name: 'Electrician' },
  { id: '4', name: 'Gold Digger' },
  { id: '5', name: 'Alcoholic' },
  { id: '6', name: 'Barber' },
];

export const Services = (props: ServicesProps) => {
  const { onSelect, isSelected } = props;

  return (
    <FlatList
      data={SERVICES}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <Service item={item} onSelect={onSelect} isSelected={isSelected} />}
      style={styles.resultsList}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
};
