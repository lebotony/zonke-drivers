import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';

import { CustomButton } from '@/src/components/elements/button';
import { Colors } from '@/constants/ui';
import { Modal } from '@/src/components/elements/modal';

import { styles } from '../styles/modals';

export const RateModal = () => {
  const [rating, setRating] = useState<number | null>(null);

  return (
    <Modal>
      <View style={styles.container}>
        <Text style={styles.title}>Rate my work</Text>
        <View style={styles.starsWrapper}>
          {[1, 1, 1, 1, 1].map((_, idx) => (
            <TouchableOpacity key={idx} onPress={() => setRating(idx)}>
              <Octicons
                name="star-fill"
                size={30}
                color={idx <= (rating as number) ? Colors.yellow : Colors.starGrey}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.thanksText}>
          Your rating is important to me, thanks for checking out my work
        </Text>
        <CustomButton
          customStyle={{ position: 'absolute', bottom: 35, width: '100%', paddingVertical: 13 }}
          color="primaryBlue"
          onPress={() => null}
        >
          <Text style={styles.postBtnText}>SUBMIT RATING</Text>
        </CustomButton>
      </View>
    </Modal>
  );
};
