import {View, StyleSheet, TouchableOpacity, Animated, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const NextButton = ({percentage, scrollTO, index, slideLength}) => {
  const navigation = useNavigation();
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const [showStartButton, setshowStartButton] = useState(false);

  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    console.log('index', index);
    console.log('slides', slideLength);
    if (index == slideLength - 1) {
      setshowStartButton(true);
    } else {
      setshowStartButton(false);
    }
  }, [percentage]);

  // useEffect(()=>{
  //   progressAnimation.addListener((value)=>{
  //       const strokeDashoffset=circumference-(circumference*value*value)/100;

  //       if(progressRef?.current){
  //           progressRef.current.setNativeProps({
  //               strokeDashoffset
  //           })

  //       }
  //   },[percentage])

  //    return()=>{
  //   progressAnimation.removeAllListeners()
  // }
  // });

  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset = circumference - percentage * 4 + 4.15;

      // console.log("stroke",strokeDashoffset);
      // console.log("percentage",percentage);
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    }); //here
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#E6E7E8"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="#493d8a"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            // strokeDashoffset={circumference - (circumference * 60) / 100}
          />
        </G>
      </Svg>

      {showStartButton ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.button}
          activeOpacity={0.6}>
          <Text
            style={{
              color: '#fff',
            }}>
            Start
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={scrollTO}
          style={styles.button}
          activeOpacity={0.6}>
          <Text
            style={{
              color: '#fff',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#98a6ef',
    borderRadius: 100,
    padding: 20,
  },
});

export default NextButton;
