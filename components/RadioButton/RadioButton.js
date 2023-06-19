import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { COLORS } from '../../src/utils/Theme/Theme';
// import {COLORS} from '../Theme/Theme';


const RadioButton = ({selected, style, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        {
          height: 18,
          width: 18,
          borderRadius: 9,
          borderWidth: 2,
          borderColor: selected ? COLORS.primary : COLORS.gray20,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      {selected ? (
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            backgroundColor: COLORS.primary,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default RadioButton;
