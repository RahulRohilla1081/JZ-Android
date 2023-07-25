// import { View, Text } from 'react-native'
// import React from 'react'

// const Portfolio = () => {
//   return (
//     <View style={{
//       flex:1
//     }}>
//       <Text>Portfolio</Text>
//     </View>
//   )
// }

// export default Portfolio

// import {StatusBar} from 'expo-status-bar';
import React, {useCallback, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet from './BottomSheet';

export default function Portfolio() {
  const ref = useRef (null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
      
        {/* <StatusBar style="light" /> */}
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <BottomSheet ref={ref}>
          <View style={{flex: 1, backgroundColor: 'orange'}} />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: 'white',
    opacity: 0.6,
  },
});

