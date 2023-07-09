import { View, Text } from 'react-native'
import React from 'react'
import BottomSheet from 'react-native-bottomsheet-reanimated';

const Portfolio = () => {
  return (
    // <View>
    //   <Text>Portfolio</Text>
    // </View>
    <View style={styles.container}>
      <BottomSheet
        keyboardAware
        bottomSheerColor="#FFFFFF"
        ref="BottomSheet"
        initialPosition={'50%'} //200, 300
        snapPoints={['50%', '100%']}
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
        // backDropColor="red"
        // isModal
        // containerStyle={{backgroundColor:"red"}}
        // tipStyle={{backgroundColor:"red"}}
        // headerStyle={{backgroundColor:"red"}}
        // bodyStyle={{backgroundColor:"red",flex:1}}
        header={
          <View>
            <Text style={styles.text}>Header</Text>
          </View>
        }
        body={
          <View style={styles.body}>
            <Text style={styles.text}>Body</Text>
          </View>
        }
      />
    </View>
  );
}

export default Portfolio