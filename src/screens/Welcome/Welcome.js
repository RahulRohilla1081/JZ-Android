import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Images from '../../../constants/Images';
import Icons from '../../../constants/Icons';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import { LOGIN } from '../../utils/Routes/Routes';
import { COLORS } from '../../utils/Theme/Theme';

const Welcome = (props) => {
  const {width} = useWindowDimensions();
  return (
    <View
      style={{
        width: width,
        padding: 30,
        backgroundColor: COLORS.white,
        flex: 1,
      }}>
      <ImageIcon
        icon={Images.logo}
        iconStyle={{
          height: 40,
          width: 50,
        }}
      />
      <Text style={{marginTop: 70, fontWeight: 700, fontSize: 35}}>
        Welcome to {'\n'}Join Zeroda
      </Text>
      <View
        style={{
          marginTop: 70,
          // paddingTop: 20,
          // paddingBottom: 20,
          borderColor: '#e1e1e1',
          borderBottomWidth: 1,
          // borderTopWidth: 1,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(LOGIN);
        }}>
        <View
          style={{
            // marginTop: 70,
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: 'row',

            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, }}>
            Login to Join Zeroda
          </Text>
          <ImageIcon
            icon={Icons.login}
            iconStyle={{
              height: 25,
              width: 25,
              tintColor: 'grey',
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          // paddingTop: 20,
          // paddingBottom: 20,
          borderColor: '#e1e1e1',
          borderBottomWidth: 1,
        }}
      />
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
            paddingBottom: 20,
          }}>
          <Text style={{fontSize: 20, }}>
            Open a new account
          </Text>
          <ImageIcon
            icon={Icons.user}
            iconStyle={{
              height: 30,
              width: 30,
              tintColor: 'grey',
            }}
          />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderColor: '#e1e1e1',
          borderBottomWidth: 1,
        }}
      />
    </View>
  );
};

export default Welcome;
