import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
  FlatList,
TouchableWithoutFeedback,
ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../utils/Theme/Theme';

const Paginator = ({data, scrollX}) => {
      const watchListTabRoutes = [
        {key: 'watchlist_1', title: 'Watchlist 1'},
        {key: 'watchlist_2', title: 'Watchlist 2'},
        {key: 'watchlist_3', title: 'Watchlist 3'},
        {key: 'watchlist_4', title: 'Watchlist 4'},
        {key: 'watchlist_5', title: 'Watchlist 5'},
        {key: 'watchlist_6', title: 'Watchlist 6'},
        {key: 'watchlist_7', title: 'Watchlist 7'},
      ];

    console.log("data");
  const {width} = useWindowDimensions();
  const [selectedWatchListTab, setSelectedWatchListTab] = useState(0);

  
  const renderWatchListTabs = ({item,index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setSelectedWatchListTab(index);
        }}
        >
        <View
          style={
            {
              // backgroundColor:COLORS.primary
            }
          }>
          <Text
            style={{
              fontSize: 18,
              margin: 10,
              color:
                selectedWatchListTab == index ? COLORS.primary : COLORS.gray60,
            }}>
            {item.title}
          </Text>
          {selectedWatchListTab == index && (
            <View
              style={{
                backgroundColor: COLORS.primary,
                height: 3,
                borderRadius: 10,
                margin: 5,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <>
      {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={watchListTabRoutes}
        renderItem={renderWatchListTabs}
      /> */}
      <View style={{flexDirection: 'row', height: 64}}>
        {data.map((val, i) => {
            console.log('val', val);
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <>
              {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderWatchListTabs}
      /> */}
              {/* <Text>{val.title}</Text> */}
              <Animated.View
                style={[styles.dot, {width: dotWidth}]}
                key={i.toString()}></Animated.View>
            </>
          );
        })}
        {/* <Text>Paginator</Text> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#493d8a',
    marginHorizontal: 8,
  },
});
export default Paginator;
