import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

const ImageIcon = ({containerStyle, icon, iconStyle, onPress}) => {
  return (
    <TouchableWithoutFeedback style={{...containerStyle}} onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 30,
          height: 30,
          //   tintColor: COLORS.white,
          ...iconStyle,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

export default ImageIcon;
