import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Collapsible from 'react-native-collapsible';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import Icons from '../../../constants/Icons';
import {COLORS} from '../../utils/Theme/Theme';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import WatchListTab from './Tabs/WatchListTab';
import socketServices from '../../utils/SocketIO/socketService';
import { FlashList } from '@shopify/flash-list';

const WatchList = () => {


  //  useEffect(() => {
  //    socketServices.initializeSocket();
  //    socketServices.on('newMessage', data => {
  //      console.log('data', data);
  //    });
  //  }, []);
  const [HeaderCollapseFlag, setHeaderCollapseFlag] = useState(true);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const watchListTabRoutes = [
    {key: 'watchlist_1', title: 'Watchlist 1'},
    {key: 'watchlist_2', title: 'Watchlist 2'},
    {key: 'watchlist_3', title: 'Watchlist 3'},
    {key: 'watchlist_4', title: 'Watchlist 4'},
    {key: 'watchlist_5', title: 'Watchlist 5'},
    {key: 'watchlist_6', title: 'Watchlist 6'},
    {key: 'watchlist_7', title: 'Watchlist 7'},
  ];

  const [selectedWatchListTab,setSelectedWatchListTab]=useState(0)

  const renderWatchListTabs = ({item,index}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setSelectedWatchListTab(index);
        }}>
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
                height:3,
                borderRadius: 10,
                margin: 5,
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderTable=({item})=>{
    return(
      <Text>Hello</Text>
    )
  }
  return (
    <>
    
      <StatusBar
        animated={true}
        backgroundColor={COLORS.primary1}
        barStyle={'dark-content'}
      />
      {/* <View
        style={{
          backgroundColor: COLORS.primary1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,

            // backgroundColor: COLORS.primary1,
            alignItems: 'center',
          }}>
          <Text style={styles.header}>Watchlist</Text>
          <TouchableOpacity
            onPress={() => {
              console.log("Caaling");
              setHeaderCollapseFlag(!HeaderCollapseFlag);
            }}>
            <ImageIcon
              icon={HeaderCollapseFlag ? Icons.arrow_down : Icons.cross}
              iconStyle={{
                height: 20,
                width: 20,
                tintColor: COLORS.gray60,
              }}
              containerStyle={{
                marginHorizontal: 20,
              }}
              onPress={()=>{
              setHeaderCollapseFlag(!HeaderCollapseFlag);
                
              }}
            />
          </TouchableOpacity/>
        </View>
        <Collapsible collapsed={HeaderCollapseFlag}>
          <Text>WatchList</Text>
          <Text>WatchList</Text>
        </Collapsible> */}
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={watchListTabRoutes}
          renderItem={renderWatchListTabs}
        /> */}
        {/* <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        /> */}

        {/* <TextInput placeholder="Search" style={styles.search} /> */}
        {/* <View
          style={{
            flex: 1,
          }}></View> */}
      {/* </View> */}
      <WatchListTab />
      {/* <FlashList
        renderItem={renderTable}
        // getItemType={({item}) => {
        //   return item.type;
        // }}
        data={watchListTabRoutes}
      /> */}
      
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: COLORS.gray60,
    fontWeight:800,
    // margin:10
  },
  search: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default WatchList;
