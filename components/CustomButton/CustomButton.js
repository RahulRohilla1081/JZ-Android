import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import ImageIcon from '../ImageIcon/ImageIcon';
// import ImageIcon from './ImageIcon/ImageIcon';

const CustomButton = ({label, color, onPress, style, icon, iconStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        marginTop: 45,
        height: 50,
        backgroundColor: color,
        borderRadius: 5,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {icon && (
          <View style={{marginRight: 10}}>
            <ImageIcon icon={icon} iconStyle={iconStyle} />
          </View>
        )}
        <Text
          style={{
            marginTop: 13,
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff',
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
