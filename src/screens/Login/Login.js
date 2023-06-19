import {
  View,
  Text,
  // TextInput,
  KeyboardAvoidingView,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  Keyboard,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
// import { TextInput } from "react-native-paper";
import {TextInput, useWindowSize} from '@react-native-material/core';

// import CustomButton from '../../../components/CustomButton';
import Icons from '../../../constants/Icons';
import Images from '../../../constants/Images';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { COLORS } from '../../utils/Theme/Theme';
import { DASHBOARD, WELCOME } from '../../utils/Routes/Routes';

const Login = (props) => {
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              width: width,
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 15,
            }}>
            <View style={styles.spaceBetween}>
              <ImageIcon
                icon={Icons.arrow_left}
                iconStyle={{
                  height: 30,
                  width: 25,
                }}
                onPress={() => {
                  props.navigation.navigate(WELCOME);
                }}
              />
              <ImageIcon
                icon={Images.logo}
                iconStyle={{
                  height: 30,
                  width: 60,
                }}
              />
            </View>
            <Text style={styles.loginText}>Login</Text>
            {/* <TextInput style={styles.userId} placeholder={'User ID'} /> */}
            {/* <TextInput style={styles.password} placeholder="Password" /> */}

            <TextInput
              style={{marginTop: 70,}}
              label="User ID"
              variant="outlined"
              color={COLORS.gray}
              tintColor={COLORS.gray}
              baseColor={COLORS.gray}
              trailing={props => (
                <ImageIcon
                  icon={Icons.user}
                  iconStyle={{
                    height: 40,
                    width: 60,
                    tintColor: '#c8c8c8',
                  }}
                />
              )}
            />
            <TextInput
              style={{marginTop: 25}}
              label="Password"
              variant="outlined"
              color={'#c8c8c8'}
              tintColor={COLORS.gray60}
              baseColor={COLORS.gray60}
              trailing={props => (
                <ImageIcon
                  icon={Icons.view}
                  iconStyle={{
                    height: 30,
                    width: 60,
                    tintColor: '#c8c8c8',
                  }}
                />
              )}
            />

            <CustomButton
              color="#4482fb"
              label="LOGIN"
              onPress={() => {
                props.navigation.navigate(DASHBOARD);
              }}
            />
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot user ID or Password?</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginText: {
    marginTop: 70,
    fontWeight: 500,
    fontSize: 25,
    // color: 'Black',
  },

  forgotText: {
    marginTop: 40,
    textAlign: 'right',
    color: '#879fd5',
  },
});

export default Login;
