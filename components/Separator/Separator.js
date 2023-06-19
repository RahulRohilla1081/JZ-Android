import {View, Text} from 'react-native';
import React from 'react';
import { COLORS } from '../../src/utils/Theme/Theme';


const Separator = () => {
  return (
    <View>
      <View style={{height: 1, backgroundColor: COLORS.gray05}} />
    </View>
  );
};

export default Separator;
