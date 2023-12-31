

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
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef, memo, useCallback} from 'react';

import Icons from '../../../constants/Icons';
import Images from '../../../constants/Images';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import {COLORS} from '../../utils/Theme/Theme';
import {color} from '@rneui/base';
import {
  ACCOUNT_FUNDS,
  ACCOUNT_PROFILE,
  ACCOUNT_SETTING,
  STOCK_CHART,
  STOCK_SEARCH,
} from '../../utils/Routes/Routes';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../../../components/IconButton/IconButton';
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview';
import socketServices from '../../utils/SocketIO/socketService';
import RBSheet from 'react-native-raw-bottom-sheet';
import Overview from '../../../components/Overview/Overview';
import {connect} from 'react-redux';
import AddStocksInWatchList from '../../redux/action/watchlistAction';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {Card, DataTable, Surface} from 'react-native-paper';

// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// import {ScrollView} from 'react-native-gesture-handler';

// const dummy = ;

const Orders = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStockData, setSelectedStockData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0));
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const viewWidth = width - 40;
  const headerHeight = 50 * 2;
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
    // {
    //   USER_ID: 'JZ00001',
    //   data: {
    //     WATCH_LIST_1: [
    //       'TATACHEM',
    //       'TATACOFFEE',
    //       'TATACOMM',
    //       'TATACONSUM',
    //       'TATAELXSI',
    //       'TATAINVEST',
    //       'TATAMETALI',
    //       'TATAMOTORS',
    //       'SBILIFE',
    //       'SBICARD',
    //       'SBIN',
    //     ],
    //     WATCH_LIST_2: ['HDFC'],
    //     WATCH_LIST_3: [],
    //     WATCH_LIST_4: [],
    //     WATCH_LIST_5: [],
    //     WATCH_LIST_6: [],
    //     WATCH_LIST_7: [],
    //   },
    // }
    socketServices.initializeSocket();
    socketServices.emit('join', {
      USER_ID: 'JZ00001',
      data: {
        WATCH_LIST_1: props.WATCH_LIST_1,
        WATCH_LIST_2: props.WATCH_LIST_2,
        WATCH_LIST_3: props.WATCH_LIST_3,
        WATCH_LIST_4: props.WATCH_LIST_4,
        WATCH_LIST_5: props.WATCH_LIST_5,
        WATCH_LIST_6: props.WATCH_LIST_6,
        WATCH_LIST_7: props.WATCH_LIST_7,
      },
    });

    // socketServices.on('stockDataGetIO', data => {
    //   console.log('data', data);
    //   // setTBody(data.USER_DATA);
    //   // dispatch({type: 'STOCKS_UPDATE', stocksArray: data.USER_DATA});
    //   //  setWatchListData(data);
    //   // console.log('jabdgavsdgds', props.STOCKS_ARRAY);
    // });
    socketServices.on('newMessage', data => {
      console.log('dataljdnsf', data);
      if (data.USER_DATA != undefined) {
        setTBody(data.USER_DATA);
      }
      // dispatch({type: 'STOCKS_UPDATE', stocksArray: data.USER_DATA});
      //  setWatchListData(data);
      // console.log('jabdgavsdgds', props.STOCKS_ARRAY);
    });
  }, [
    props.WATCH_LIST_1,
    props.WATCH_LIST_2,
    props.WATCH_LIST_3,
    props.WATCH_LIST_4,
    props.WATCH_LIST_5,
    props.WATCH_LIST_6,
    props.WATCH_LIST_7,
  ]);

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
      useNativeDriver: false,
    },
  );
  const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 1.2],
  });
  const translateYNumber = useRef();
  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  useEffect(() => {
    console.log('Datataaa');
    if (tBody[tabs[activeTab]?.Key] != undefined) {
      console.log('data', tBody[tabs[activeTab]?.Key][0]);
    } else {
      console.log('inside else', tBody.Watchlist2);
    }
  }, [activeTab]);

  useEffect(() => {
    setTBody({
      WATCH_LIST_1: props.WATCH_LIST_1,
      WATCH_LIST_2: props.WATCH_LIST_2,
      WATCH_LIST_3: props.WATCH_LIST_3,
      WATCH_LIST_4: props.WATCH_LIST_4,
      WATCH_LIST_5: props.WATCH_LIST_5,
      WATCH_LIST_6: props.WATCH_LIST_6,
      WATCH_LIST_7: props.WATCH_LIST_7,
    });
  }, [props]);

  useEffect(() => {
    console.log('tBody', tabs[activeTab]?.Key);
    if (tBody[tabs[activeTab]?.Key] != undefined) {
      console.log(tBody[tabs[activeTab]?.Key][0]);
      console.log('inside elseakhsbdhjdsbj');
    } else {
      console.log('inside elseakhsbdhjdsbj');
    }
  }, [activeTab]);

  const renderNoDataFound = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // margin: 10,
            }}>
            <IconButton
              icon={Icons.search}
              iconStyle={{
                height: 18,
                width: 18,
                tintColor: '#aac4ef',
              }}
              containerStyle={{
                marginRight: 15,
                marginLeft: 15,
              }}
              // onPress={() => {
              //   console.log('EXP', expanded);
              //   setExpanded(!expanded);
              // }}
            />
            <IconButton
              icon={Icons.filter}
              iconStyle={{
                height: 18,
                width: 18,
                tintColor: '#aac4ef',
              }}
              // onPress={() => {
              //   console.log('EXP', expanded);
              //   setExpanded(!expanded);
              // }}
            />
          </View>
          {tabs[activeTab]?.Key == 'EXECUTED' && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}>
              <ImageIcon
                icon={Icons.contract}
                iconStyle={{
                  height: 18,
                  width: 18,
                  tintColor: COLORS.BlueHighLighter,
                }}
              />
              <Text
                style={{
                  color: COLORS.BlueHighLighter,
                }}>
                Contract Role
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={
              tabs[activeTab]?.Key == 'GTT'
                ? Images.noGTT
                : Images.noExecutedOrders
            }
            style={{
              marginTop: height / 7,
              height: 200,
              width: 270,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
              color: '#3e3e4b',
            }}>
            No Orders
          </Text>
          <Text
            style={{
              fontSize: 14,
              // fontWeight: 'bold',
              padding: 10,
            }}>
            Place an order from your watchlist
          </Text>
        </View>
      </>
    );
  };

  const tabs = [
    {Key: 'OPEN', Title: 'Open'},
    {Key: 'EXECUTED', Title: 'Executed'},
    {Key: 'GTT', Title: 'GTT'},
  ];
  const buildTab = useCallback(
    (label, index) => {
      console.log('Rendering this also', activeTab);
      return (
        <Animated.View
          key={`tab_${index}`}
          tabLabel={label.Title}
          style={{
            // flex: 1,
            height: height,
            backgroundColor: 'white',
          }}>
          <Animated.ScrollView
            // onScroll={handleScroll}
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: COLORS.white,
              // flex: 1,
            }}>
            <Animated.View style={[{backgroundColor: COLORS.primary1}]}>
              <Animated.ScrollView
                onScroll={handleScroll}
                ref={ref}
                style={
                  {
                    // flex: 1,
                  }
                }
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    paddingTop: 10,
                    // marginTop: 45,
                  }}>
                  {tBody[tabs[activeTab]?.Key] != undefined &&
                    tBody[tabs[activeTab]?.Key][0] != undefined &&
                    console.log(
                      'kjasdhjsdhj',
                      tBody[tabs[activeTab]?.Key][0].length,
                    )}

                  {tBody[tabs[activeTab]?.Key] != undefined &&
                  tBody[tabs[activeTab]?.Key][0] != undefined ? (
                    <>
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][0]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][1]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][2]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][3]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][4]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][5]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][6]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][7]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][8]}
                      />
                      <MemoizedRenderStocks
                        item={tBody[tabs[activeTab]?.Key][9]}
                      />
                    </>
                  ) : (
                    renderNoDataFound()
                  )}
                </View>
                {/* </Animated.ScrollView>
              <Animated.ScrollView> */}
                {/* <Animated.View
                  // onScroll={handleScroll}
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
                      navigation.navigate(STOCK_SEARCH, {
                        state: {
                          WATCH_LIST_TYPE: tabs[activeTab].Key,
                        },
                      });
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
                          {tBody[tabs[activeTab]?.Key] != undefined &&
                          tBody[tabs[activeTab]?.Key][0] != undefined
                            ? tBody[tabs[activeTab]?.Key].length
                            : 0}
                        </Text>
                        <Text
                          style={{
                            // marginHorizontal: 15,
                            fontSize: 16,
                          }}>
                          /50
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
                </Animated.View> */}
              </Animated.ScrollView>
            </Animated.View>
          </Animated.ScrollView>
        </Animated.View>
      );
    },
    [tabs],
  );
  const renderStockList = ({item, index}) => {
    //  console.log('Priniting', item);
    return (
      //  item != undefined && (
      //  <View style={{}}>

      item?.SYMBOL != undefined && (
        <>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate(STOCK_CHART)
              ShowOptionButtonModal.current.open();
              setSelectedStockData(item);

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
                {item?.SYMBOL}
                {/* Tata Power */}
              </Text>
              <Text
                style={{
                  color: COLORS.green,
                }}>
                {item?.SYMBOL_CURRENT_PRICE}
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
        </>
      )

      //  </View>
    );
    //  );
  };

  const MemoizedRenderStocks = memo(renderStockList);

  return (
    <View
      style={{
        flex: 1,
      }}>
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
                // {transform: [{translateY}]},
              ]}>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', color: '#373644'}}>
                Orders
              </Text>
              {/* <TouchableOpacity
             > */}
              <IconButton
                icon={Icons.arrow_down}
                iconStyle={{
                  height: 22,
                  width: 22,
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
            // onScroll={handleScroll}
            // ref={ref}
            showsVerticalScrollIndicator={false}>
            <Animated.View
              style={{
                // position: 'absolute',
                // transform: [{translateY}],
                top: 0,
              }}>
              <View
                style={
                  {
                    // top: 70,
                  }
                }>
                <ScrollableTabView
                  initialPage={activeTab}
                  // refreshControlStyle={{backgroundColor: 'red'}}
                  // pullToRefresh={(callback)=>{
                  //   //  networkRequest().then(response => callback(response));
                  //   console.log("Resfreshg");
                  // }}
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
                  contentStyle={{
                    backgroundColor: COLORS.primary1,
                  }}
                  showsVerticalScrollIndicator={false}
                  tabBarUnderlineStyle={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 20,
                    // flex:1
                  }}>
                  {tabs.map((tab, index) => buildTab(tab, index))}
                </ScrollableTabView>
              </View>
            </Animated.View>
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

          <Animated.View style={[{height: 40, transform: [{translateY}]}]}>
            <Animated.View
              style={[
                {
                  marginLeft: 20,
                  marginRight: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                },
                // {transform: [{translateY}]},
              ]}>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', color: '#373644'}}>
                Orders
              </Text>
              {/* <TouchableOpacity
             > */}
              <IconButton
                icon={Icons.arrow_down}
                iconStyle={{
                  height: 22,
                  width: 22,
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
            // onScroll={handleScroll}
            // ref={ref}
            showsVerticalScrollIndicator={false}>
            <Animated.View
              style={{
                // position: 'absolute',
                // transform: [{translateY}],
                top: 0,
              }}>
              <View
                style={
                  {
                    // top: 70,
                  }
                }>
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
                  contentStyle={{
                    backgroundColor: COLORS.primary1,
                  }}
                  showsVerticalScrollIndicator={false}
                  tabBarUnderlineStyle={{
                    backgroundColor: COLORS.primary,
                    borderRadius: 20,
                    // flex:1
                  }}>
                  {tabs.map((tab, index) => buildTab(tab, index))}
                </ScrollableTabView>
              </View>
            </Animated.View>
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
        height={height / 1.3}
        onOpen={() => setShowOptionButtonModalStatusColorFlag(true)}
        onClose={() => setShowOptionButtonModalStatusColorFlag(false)}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            backgroundColor: 'rgba(52, 52, 52, 0.4)',
          },
          draggableIcon: {
            backgroundColor: COLORS.white,
            width: width,
          },
        }}>
        <Card
          style={{
            backgroundColor: COLORS.white,
            marginVertical: 10,
          }}>
          <View
            style={{
              margin: 10,
            }}>
            <Text style={styles.modalHeader}>{selectedStockData?.SYMBOL}</Text>
            <Text>NSE 2740.75</Text>
          </View>
        </Card>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: COLORS.white,
            marginHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CustomButton
              color="#4185f4"
              label="BUY"
              style={{width: '47%'}}
              onPress={() => {
                // props.navigation.navigate(DASHBOARD);
              }}
            />
            <CustomButton
              color="#df514d"
              label="SELL"
              style={{width: '47%'}}
              onPress={() => {
                // props.navigation.navigate(DASHBOARD);
              }}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              margin: 20,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}
              onPress={() => {
                navigation.navigate(STOCK_CHART, {
                  STOCK_SYMBOL: selectedStockData?.SYMBOL,
                });
              }}>
              <ImageIcon
                icon={Icons.three_vertical_line}
                iconStyle={{
                  height: 20,
                  width: 20,
                  tintColor: '#3f85f3',
                }}
              />
              <Text
                style={{
                  color: '#3f85f3',
                  fontSize: 15,
                  marginHorizontal: 10,
                }}>
                View Chart
              </Text>
              <ImageIcon
                icon={Icons.arrow_right}
                iconStyle={{
                  height: 20,
                  width: 20,
                  tintColor: '#3f85f3',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // alignItems: 'center',
              // margin: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}>
              <ImageIcon
                icon={Icons.notification}
                iconStyle={{
                  height: 20,
                  width: 20,
                  tintColor: '#3f85f3',
                }}
              />
              <Text
                style={{
                  color: '#3f85f3',
                  fontSize: 15,
                  marginHorizontal: 10,
                }}>
                Create Alert
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
              }}>
              <ImageIcon
                icon={Icons.info}
                iconStyle={{
                  height: 20,
                  width: 20,
                  tintColor: '#3f85f3',
                }}
              />
              <Text
                style={{
                  color: '#3f85f3',
                  fontSize: 15,
                  marginHorizontal: 10,
                }}>
                Create GTT
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.textHeaderModal}>Open</Text>
              <Text style={styles.priceTextModal}> 2750.22</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.textHeaderModal}>High</Text>
              <Text style={styles.priceTextModal}> 2750.22</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.textHeaderModal}>Low</Text>
              <Text style={styles.priceTextModal}> 2750.22</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.textHeaderModal}>Prev. close</Text>
              <Text style={styles.priceTextModal}> 2750.22</Text>
            </View>
          </View>
        </ScrollView>
      </RBSheet>
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
  divider: {
    height: 1,
    backgroundColor: COLORS.gray,
    margin: 10,
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
  modalHeader: {
    fontSize: 18,
    color: COLORS.gray60,
    // fontWeight: 700,
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
  priceTextModal: {
    color: COLORS.black,
    fontSize: 14,
  },
  textHeaderModal: {
    fontSize: 13,
  },
});
const mapStateToProps = state => ({
  WATCH_LIST_1: state.watchlist.watchlist1,
});

export default connect(mapStateToProps, {
  AddStocksInWatchList,
})(Orders);
