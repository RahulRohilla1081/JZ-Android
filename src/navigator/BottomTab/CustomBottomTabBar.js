import React from 'react';

import {
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
// import ImageIcon from '../../../components/IconButton/IconButton';
import Icons from '../../../constants/Icons';
import {COLORS} from '../../utils/Theme/Theme';
import {ScreenNamesList} from './ScreenNamesList';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';

// import NavigationIcon from './navigationIcon';

// import { SelectWheel } from '.';

const {width} = Dimensions.get('window');

const CustomBottomTabBar = ({state, descriptors, navigation}) => {
  // console.log(state.routes);

  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // console.log('isFocused', isFocused);

        const onPress = () => {
          // console.log('CLiced', isFocused);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            // console.log('CLiced 123');
          }
        };
        // if (route.name == 'dashboard') {
        return (
          <TouchableOpacity
            key={index}
            style={styles.mainItemContainer}
            onPress={onPress}>
            <View
              style={{
                alignItems: 'center',
              }}>
              {/* <SelectWheel /> */}
              <ImageIcon
                icon={ScreenNamesList[index].icon}
                iconStyle={{
                  height: 25,
                  width: 25,
                  tintColor: isFocused ? '#4581e5' : '#000',
                }}
              />
              <Text
                style={{
                  color: isFocused ? '#4581e5' : COLORS.black,
                }}>
                {ScreenNamesList[index].label}
              </Text>
            </View>
          </TouchableOpacity>
        );
        // }

        // return (
        //   <View
        //     key={index}
        //     style={[
        //       styles.mainItemContainer,
        //       {borderRightWidth: label == 'notes' ? 3 : 0},
        //     ]}>
        //     <Pressable
        //       onPress={onPress}
        //       style={{
        //         // backgroundColor: isFocused ? '#030D16' : '#182028',
        //         borderRadius: 20,
        //       }}>
        //       <View
        //         style={{
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //           flex: 1,
        //           padding: 15,
        //         }}>
        //         {/* <NavigationIcon route={label} isFocused={isFocused} /> */}
        //       </View>
        //     </Pressable>
        //   </View>
        // );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    // borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    // alignSelf;"center"
    alignSelf: 'center',
    justifyContent: 'center',
     elevation: 20,
    // shadowColor: '#52006A',

    // marginHorizontal: width * 0.1,
  },
  mainItemContainer: {
    // flexDirection:"row",
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // alignSelf;"center"
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // borderRadius: 30,
    // marginHorizontal: 30,
    // borderWidth: 1,
    // borderColor: '#fff',
    padding: 5,
    backgroundColor: '#fff',
  },
});

export default CustomBottomTabBar;
