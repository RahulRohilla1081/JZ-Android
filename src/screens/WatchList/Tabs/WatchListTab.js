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
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef, memo, useCallback} from 'react';

import Icons from '../../../../constants/Icons';
import Images from '../../../../constants/Images';
import ImageIcon from '../../../../components/ImageIcon/ImageIcon';
import {FlashList} from '@shopify/flash-list';
import {COLORS} from '../../../utils/Theme/Theme';
import {color} from '@rneui/base';
import {
  ACCOUNT_FUNDS,
  ACCOUNT_PROFILE,
  ACCOUNT_SETTING,
  STOCK_SEARCH,
} from '../../../utils/Routes/Routes';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../../../../components/IconButton/IconButton';
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview';
import socketServices from '../../../utils/SocketIO/socketService';
import RBSheet from 'react-native-raw-bottom-sheet';
import Overview from '../../../../components/Overview/Overview';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// import {ScrollView} from 'react-native-gesture-handler';

const WatchListTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0));
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const viewWidth = width - 40;
  const headerHeight = 60 * 2;
  const animationHeight = useRef(new Animated.Value(0)).current;
  const ref = useRef(null);

  const ShowOptionButtonModal = useRef();
  const [
    ShowOptionButtonModalStatusColorFlag,
    setShowOptionButtonModalStatusColorFlag,
  ] = useState(false);

  const [niftyFifty, setNiftyFifty] = useState({
    value: 18688.1,
    changeToday: -67.8,
    changeTodayPercent: -0.36,
  });
  const [funds, setFunds] = useState({equity: 10000});

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
  useEffect(() => {
    if (expanded) {
      Animated.timing(animationHeight, {
        duration: 100,
        toValue: 0.55 * height,
        // easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 200,
        toValue: 0,
        // easing: Easing.linear,
      }).start();
    }
  }, [expanded]);
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
  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });
  const translateYNumber = useRef();
  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const tabs = [
    {Key: 'Watchlist1', Title: 'Watchlist 1'},
    {Key: 'Watchlist2', Title: 'Watchlist 2'},
    {Key: 'Watchlist3', Title: 'Watchlist 3'},
    {Key: 'Watchlist4', Title: 'Watchlist 4'},
    {Key: 'Watchlist5', Title: 'Watchlist 5'},
    {Key: 'Watchlist6', Title: 'Watchlist 6'},
    {Key: 'Watchlist7', Title: 'Watchlist 7'},
  ];
  const buildTab = useCallback(
    (label, index) => {
      console.log('Rendering this also');
      return (
        <View
          key={`tab_${index}`}
          tabLabel={label.Title}
          style={{
            flex: 1,
            height: height,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: COLORS.white,
              // flex: 1,
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
                    // flex: 1,

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
                  <MemoizedRenderStocks item={tBody[1]} />
                  {/* <MemoizedRenderStocks item={tBody[1]} />
                  <MemoizedRenderStocks item={tBody[2]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} />
                  <MemoizedRenderStocks item={tBody[3]} /> */}
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
    },
    [tabs],
  );

  const renderStockList = ({item, index}) => {
    console.log('Priniting', index);
    return (
      <View
        style={
          {
            // flex: 1,
          }
        }>
        {index == 0 && (
          <View
            style={{
              borderColor: COLORS.gray10,
              borderWidth: 0.5,
              // borderTopWidth: 1,
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate(STOCK_CHART)
            ShowOptionButtonModal.current.open();
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

  return (
    <>
      <Overview
        animationHeight={animationHeight}
        onPress={() => {
          setExpanded(false);
        }}
      />

      {!expanded && (
        <View
          style={{
            width: width,
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
              {/* <TouchableOpacity
             > */}
              <IconButton
                icon={Icons.arrow_down}
                iconStyle={{
                  height: 30,
                  width: 25,
                }}
                onPress={() => {
                  console.log('EXP', expanded);
                  setExpanded(!expanded);
                }}
              />
              {/* </TouchableOpacity> */}
            </Animated.View>
          </Animated.View>
          <Animated.ScrollView
            onScroll={handleScroll}
            ref={ref}
            showsVerticalScrollIndicator={false}>
            <ScrollableTabView
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
              }}>
              {tabs.map((tab, index) => buildTab(tab, index))}
            </ScrollableTabView>
          </Animated.ScrollView>
          {expanded && (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                opacity: 0.75,
                height: height,
                width: width,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() => setExpanded(false)}></TouchableOpacity>
          )}
        </View>
      )}
      {expanded && (
        <View
          style={{
            width: width,
            flex: 1,
            backgroundColor: '#ebecee',
            paddingTop: 20,
            shadowColor: '#000',
            shadowOffset: {width: 2, height: -30},
            shadowOpacity: 2,
            elevation: 40,
            shadowRadius: 30,
          }}>
          <StatusBar barStyle="dark-content" backgroundColor="#ebecee" />

          <Animated.View
            style={{
              height: 40,
            }}>
            <Animated.View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: expanded ? 7 : null,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.header}>Watchlist</Text>
              {/* <Animated.View
            ref={translateYIconNumber}
            style={{
              height: 30,
              transform: [{translateY: translateYIcon}],
            // }}> */}

              <IconButton
                icon={Icons.arrow_down}
                iconStyle={{
                  height: 30,
                  width: 25,
                }}
                onPress={() => {
                  console.log('EXP', expanded);
                  setExpanded(!expanded);
                }}
              />
            </Animated.View>
          </Animated.View>
          <Animated.ScrollView
            onScroll={handleScroll}
            ref={ref}
            showsVerticalScrollIndicator={false}>
            <ScrollableTabView
              initialPage={activeTab}
              renderTabBar={() => <ScrollableTabBar />}
              tabBarTextStyle={styles.tabText}
              onChangeTab={({i}) => {
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
              }}>
              {tabs.map((tab, index) => buildTab(tab, index))}
            </ScrollableTabView>
          </Animated.ScrollView>
          {expanded && (
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                opacity: 0.75,
                height: height,
                width: width,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() => setExpanded(false)}>
              {/* <TouchableOpacity onPress={() => setExpanded(false)}>
              <View style={{height: 20, width: 30}}></View>
            </TouchableOpacity> */}
            </TouchableOpacity>
          )}
        </View>
      )}
      <RBSheet
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
      </RBSheet>
    </>
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
export default WatchListTab;
