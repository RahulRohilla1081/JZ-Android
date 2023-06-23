import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Animated,
  ScrollView,
  StyleSheet
} from 'react-native';
import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useMemo,
  useCallback,
} from 'react';

import {FlashList} from '@shopify/flash-list';
import {color} from '@rneui/base';
import { COLORS } from '../../../utils/Theme/Theme';
import ImageIcon from '../../../../components/ImageIcon/ImageIcon';
import Images from '../../../../constants/Images';
import Icons from '../../../../constants/Icons';
import RBSheet from 'react-native-raw-bottom-sheet';
// import BottomSheet from '@gorhom/bottom-sheet';

import {BottomSheet, SnapPoint} from '@breeffy/react-native-bottom-sheet';



import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview';
import socketServices from '../../../utils/SocketIO/socketService';
import { useNavigation } from '@react-navigation/native';
import { STOCK_CHART, STOCK_SEARCH } from '../../../utils/Routes/Routes';
import nseStocksAction from '../../../redux/action/nseStockAction';
import { connect } from 'react-redux';
import {GestureHandlerRootView} from "react-native-gesture-handler"
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';


const WatchListTab = (props) => {

   const snapPoints = useMemo(
    () => [
      { relativeTo: 'content', percentagesOf: 30 },
      { relativeTo: 'content', percentagesOf: 70 },
      { relativeTo: 'content', percentagesOf: 100 }
    ],
    []
  );

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const navigation=useNavigation()
  const scrollY = useRef(new Animated.Value(0));
  const {width ,height} = useWindowDimensions();
  const viewWidth = width - 40;
  const headerHeight = 60 * 2;
  const ref = useRef(null);
  
  const ShowOptionButtonModal = useRef();
    const [
      ShowOptionButtonModalStatusColorFlag,
      setShowOptionButtonModalStatusColorFlag,
    ] = useState(false);
    useEffect(() => {

      socketServices.initializeSocket();
      socketServices.on('newMessage', data => {
         console.log('data', data);
        setTBody(data.USER_DATA);
        // dispatch({type: 'STOCKS_UPDATE', stocksArray: data.USER_DATA});
        //  setWatchListData(data);
        // console.log('jabdgavsdgds', props.STOCKS_ARRAY);

     
      });
    }, []);



  const [tBody, setTBody] = useState([]);
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

    const handlePresentModalPress = useCallback(() => {
      ShowOptionButtonModal.current?.present();
    }, []);
  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });
  const translateYNumber = useRef();
  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });
  const renderStockList = ({item, index}) => {
    console.log("Priniting");
    return (
      <View
        style={{
          // flex: 1,
        }}>
        {index == 0 && (
          <View
            style={{
              borderColor: COLORS.gray10,
              borderWidth: 0.5,
              // borderTopWidth: 1,
            }}
          />
        )}
        <TouchableOpacity onPress={()=>{
          // navigation.navigate(STOCK_CHART)
            ShowOptionButtonModal.current.present();
            // handleSheetChanges();
        }}> 
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <Text
              style={{
                color: COLORS.black,
              }}>
              {/* {item.RIL} */}
              Tata Power
            </Text>
            <Text
              style={{
                color: COLORS.green,
              }}>
              {item?.RIL}
            </Text>
            {/* <ImageIcon
              icon={item.icon}
              iconStyle={{
                height: 30,
                width: 25,
                tintColor: 'grey',
              }}
            /> */}
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderColor: COLORS.gray10,
            borderWidth: 0.5,
            // borderTopWidth: 1,
          }}
        />
     
      </View>
    );
  };

    const MemoizedRenderStocks = memo(renderStockList);

  
  const tabs = [
    {Key: 'Watchlist1', Title: 'Watchlist 1'},
    {Key: 'Watchlist2', Title: 'Watchlist 2'},
    {Key: 'Watchlist3', Title: 'Watchlist 3'},
    {Key: 'Watchlist4', Title: 'Watchlist 4'},
    {Key: 'Watchlist5', Title: 'Watchlist 5'},
    {Key: 'Watchlist6', Title: 'Watchlist 6'},
    {Key: 'Watchlist7', Title: 'Watchlist 7'},
  ];

  const buildTab = useCallback((label, index) => {
    console.log("Rendering this also");
    return (
      <View
        key={`tab_${index}`}
        tabLabel={label.Title}
        style={{
       
          flex: 1,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
          }}>
          <Animated.View
            style={[
              {backgroundColor: COLORS.primary1, transform: [{translateY}]},
            ]}>
            <Animated.ScrollView
              onScroll={handleScroll}
              ref={ref}
              style={{
                flex: 1,
            
              }}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  // width: width,
                  flex: 1,
                  
                  backgroundColor: '#ffffff',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  marginTop: 45,
                  paddingTop: 45,
                }}>
                {/* <FlashList */}
                {/* <Animated.FlatList
                  // onScroll={handleScroll}
                  // ref={ref}
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                  }}
                  showsVerticalScrollIndicator={false}
                  data={tBody}
                  renderItem={({item, index}) => (
                    <MemoizedRenderStocks item={item} index={index} />
                  )}
                /> */}
                <MemoizedRenderStocks item={tBody[0]} />
                <MemoizedRenderStocks item={tBody[1]} />
                <MemoizedRenderStocks item={tBody[2]} />
                <MemoizedRenderStocks item={tBody[3]} />
                <MemoizedRenderStocks item={tBody[3]} />
                <MemoizedRenderStocks item={tBody[3]} />
                <MemoizedRenderStocks item={tBody[3]} />
              </View>

              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    marginLeft: 20,
                    backgroundColor: COLORS.primary1,
                  },
                  // {transform: [{translateY}]},
                ]}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate(STOCK_SEARCH);
                  }}>
                  <View
                    style={{
                      width: viewWidth,
                      // height: headerHeight,
                      backgroundColor: '#ffffff',
                      borderRadius: 5,
                      shadowColor: '#171717',
                      shadowOffset: {width: -2, height: 4},
                      shadowOpacity: 0.2,
                      elevation: 15,
                      shadowRadius: 3,
                      padding: 15,
                      marginTop: 20,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <ImageIcon
                        icon={Icons.search}
                        iconStyle={{
                          height: 20,
                          width: 20,
                          tintColor: COLORS.gray60,
                        }}
                      />
                      <Text
                        style={{
                          marginHorizontal: 15,
                          fontSize: 16,
                        }}>
                        Search & add
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          // marginHorizontal: 15,
                          fontSize: 16,
                        }}>
                        5/50
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: 15,
                          // marginRight:5,
                          fontSize: 16,
                        }}>
                        |
                      </Text>
                      <ImageIcon
                        icon={Icons.filter}
                        iconStyle={{
                          height: 20,
                          width: 20,
                          tintColor: COLORS.gray60,
                        }}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </Animated.ScrollView>
          </Animated.View>
        </ScrollView>
      </View>
    );
  },[tabs])
  






  const [activeTab, setActiveTab] = useState(0);
  return (
    <View
      style={{
        // width: width,
        flex: 1,
        backgroundColor: '#ebecee',
        paddingTop: 20,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ebecee" />
      <Animated.View style={[{height: 40, transform: [{translateY}]}]}>
        <Animated.View
          style={[
            {
              marginLeft: 20,
              marginRight: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            {transform: [{translateY}]},
          ]}>
          <Text style={styles.header}>Watchlist</Text>
          <ImageIcon
            icon={Icons.arrow_down}
            iconStyle={{
              height: 30,
              width: 25,
            }}
          />
        </Animated.View>
      </Animated.View>
      <ScrollableTabView
        // style={{marginTop: 20}}

        initialPage={activeTab}
        renderTabBar={() => <ScrollableTabBar />}
        tabBarTextStyle={styles.tabText}
        onChangeTab={({i}) => {
          // console.log(i);
          // TabChangeAnimation(i);
          setActiveTab(i);
        }}
        tabBarActiveTextColor="red"
        tabBarInactiveTextColor="red"
        locked={false}
        onScroll={e => {
          // console.log(e);
        }}
        contentStyle={{
          backgroundColor: COLORS.primary1,
        }}
        showsVerticalScrollIndicator={false}
        tabBarUnderlineStyle={{
          backgroundColor: COLORS.primary,
          // flex:1
        }}
        // collapsableBar={
        //   <View style={styles.collapsibleTabBar}>
        //     <Text>{Math.random() * 1000}</Text>
        //     <Text>{Math.random() * 1000}</Text>
        //   </View>
        // }
      >
        {tabs.map((tab, index) => buildTab(tab, index))}
      </ScrollableTabView>
      {/* <RBSheet
        ref={ShowOptionButtonModal}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height / 2}
        onOpen={() => setShowOptionButtonModalStatusColorFlag(true)}
        onClose={() => setShowOptionButtonModalStatusColorFlag(false)}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            backgroundColor: 'rgba(52, 52, 52, 0.4)',
          },
          // draggableIcon: {
          //   backgroundColor: COLORS.gray10,
          //   width: width,
          // },
        }}>
        <View
          style={{
            backgroundColor: COLORS.gray10,
          }}>
          <Text>NIFTY 50</Text>
          <Text>INDICES</Text>
        </View>
      </RBSheet> */}
      {/* <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheet
          ref={ShowOptionButtonModal}
          index={1}
          snapPoints={snapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
      </GestureHandlerRootView> */}
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheet
          ref={ShowOptionButtonModal}
          initialSnapIndex={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          {/* INSERT A SCROLLABLE HERE */}
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: '#493d8a',
    textAlign: 'center',
  },
  header: {
    fontSize: 22,
    color: COLORS.gray60,
    fontWeight: 800,
    // margin:10
  },

  description: {
    fontWeight: '800',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
  dot: {
    height: 2,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: 8,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: COLORS.white,
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray10,
  },
  tabText: {
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'left',
    fontStyle: 'normal',
    color: COLORS.gray60,
  },
  collapsibleTabBar: {
    backgroundColor: COLORS.primary1,
    paddingVertical: 20,
    minHeight: 80,
  },
});


// export default WatchListTab;

const mapStateToProps = state => ({
  IS_AUTH: state.auth.is_auth,

});
export default connect(mapStateToProps, {
  nseStocksAction,
})(WatchListTab);
