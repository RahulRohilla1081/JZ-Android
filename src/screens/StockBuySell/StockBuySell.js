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
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef, memo, useCallback} from 'react';

import Slider from 'react-native-slide-to-unlock';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import Icons from '../../../constants/Icons';
import {COLORS} from '../../utils/Theme/Theme';
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar,
} from '@valdio/react-native-scrollable-tabview';
import IconButton from '../../../components/IconButton/IconButton';
import Images from '../../../constants/Images';

const StockBuySell = props => {
  const [activeTab, setActiveTab] = useState(0);
  const {height, width} = useWindowDimensions();
  const [SelectedColorTheme, setSelectedColorTheme] = useState('');
  const [tBody, setTBody] = useState([]);
  const viewWidth = width - 40;

  useEffect(() => {
    // const page = 'SELL';
    if(props.route.params?.PAGE_TYPE=="SELL"){
    // if (page == 'BUY') {
      setSelectedColorTheme(COLORS.primary);
    } else {
      setSelectedColorTheme(COLORS.secondary);
    }
  }, []);

  const tabs = [
    {Key: 'REGULAR', Title: 'Regular'},
    {Key: 'COVER', Title: 'Cover'},
    {Key: 'AMO', Title: 'AMO'},
    {Key: 'ICEBERG', Title: 'Iceberg'},
  ];



  const renderNoDataFound = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            justifyContent: 'space-between',
          }}>
          {tabs[activeTab]?.Key == 'HOLDINGS' && (
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
                Family
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
            source={Images.noExecutedOrders}
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

  const [BuySellChipsOption, setBuySellChipsOption] = useState([
    {
      TITLE: 'Product',
      KEY: 'PRODUCT',
      SHOW_BUTTON: true,
      SUB_CAT: [
        {
          SUB_TITLE: 'Intraday',
          SECONDARY_TITLE: 'MIS',
          IS_SELECTED: true,
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
        },
        {
          SUB_TITLE: 'Longterm',
          SECONDARY_TITLE: 'CNC',
          IS_SELECTED: false,
          ACCESSED_BY: ['REGULAR',  'AMO', 'ICEBERG'],
        },
      ],
    },
    {
      TITLE: 'Type',
      KEY: 'TYPE',
      SHOW_BUTTON: true,
      SUB_CAT: [
        {
          SUB_TITLE: 'Market',
          SUB_KEY: 'MARKET',
          IS_SELECTED: true,
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"MIS"
        },
        {
          SUB_TITLE: 'Limit',
          SUB_KEY: 'LIMIT',
          IS_SELECTED: false,
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"CNC"
        },
        {
          SUB_TITLE: 'SL',
          SUB_KEY: 'SL',
          IS_SELECTED: false,
          ACCESSED_BY: ['REGULAR',  'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"CNC"
        },
        {
          SUB_TITLE: 'SL-ML',
          SUB_KEY: 'SL_ML',
          IS_SELECTED: false,
          ACCESSED_BY: ['REGULAR',  'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"CNC"
        },
      ],
    },

    // {
    //   TITLE: 'Trigger',
    //   KEY: 'TRIGGER',
    //   SHOW_BUTTON: true,
    //   SUB_CAT: [
    //     {
    //       SUB_TITLE: '+ Trigger',
    //       IS_SELECTED: true,
    //       ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
    //       // SECONDARY_TITLE:"MIS"
    //     },
    //   ],
    // },
    // {
    //   TITLE: 'Tags',
    //   KEY: 'TAGS',
    //   SHOW_BUTTON: true,
    //   SUB_CAT: [
    //     {
    //       SUB_TITLE: 'Add Tags',
    //       IS_SELECTED: true,
    //       ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
    //       // SECONDARY_TITLE:"MIS"
    //     },
    //   ],
    // },
    {
      TITLE: 'Validity',
      KEY: 'VALIDITY',
      SHOW_BUTTON: true,
      SUB_CAT: [
        {
          SUB_TITLE: 'Day',
          IS_SELECTED: true,
          // ACCESSED_BY: [],
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"MIS"
        },
        {
          SUB_TITLE: 'IOC',
          IS_SELECTED: false,
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"CNC"
        },
        {
          SUB_TITLE: 'Minutes',
          IS_SELECTED: false,
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"CNC"
        },
      ],
    },
    {
      TITLE: 'Disc Qty.',
      KEY: 'DISC_QTY',
      SHOW_BUTTON: true,
      TYPE: 'INPUT',
      SUB_CAT: [
        {
          SUB_TITLE: 'Day',
          IS_SELECTED: true,
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
          // SECONDARY_TITLE:"MIS"
          TYPE: 'INPUT',
        },
        {
          SUB_TITLE: 'IOC',
          IS_SELECTED: false,
          // SECONDARY_TITLE:"CNC"
          TYPE: 'INPUT',
          ACCESSED_BY: ['REGULAR', 'COVER', 'AMO', 'ICEBERG'],
        },
      ],
    },
  ]); 

  const markTabSelected=(MainIndex,SubIndex)=>{
    let tempBuySellChipOptions=[...BuySellChipsOption]
    console.log(
      'MainIndex',
      MainIndex,
      SubIndex,
      tempBuySellChipOptions[MainIndex].SUB_CAT
    );

tempBuySellChipOptions[MainIndex].SUB_CAT.map(val => {
  val.IS_SELECTED = false;
});
// const index = tempBuySellChipOptions.findIndex(val => val.KEY == 'TRIGGER');
// if (
//   tempBuySellChipOptions[MainIndex].SUB_CAT[SubIndex].SUB_KEY == 'LIMIT' ||
//   tempBuySellChipOptions[MainIndex].SUB_CAT[SubIndex].SUB_KEY == 'MARKET'
// ) {
  
//   tempBuySellChipOptions[index].SHOW_BUTTON = false;
// }
// else if (
//   tempBuySellChipOptions[MainIndex].SUB_CAT[SubIndex].SUB_KEY == 'SL_ML' ||
//   tempBuySellChipOptions[MainIndex].SUB_CAT[SubIndex].SUB_KEY == 'SL'
// ) {
//   tempBuySellChipOptions[index].SHOW_BUTTON = true;
// }
  tempBuySellChipOptions[MainIndex].SUB_CAT[SubIndex].IS_SELECTED =
    !tempBuySellChipOptions[MainIndex].SUB_CAT[SubIndex].IS_SELECTED;

  setBuySellChipsOption(tempBuySellChipOptions);



  }

  const renderBuySellChipsHeader = ({item,index}) => {

    let MainIndex=index
    return (
      <>
        {item.SHOW_BUTTON && (
          <View
            style={{
              margin: 10,
            }}>
            <Text style={styles.BuySellHeading}>{item.TITLE}</Text>
            <FlatList
              data={item.SUB_CAT}
              renderItem={
                ({item, index}) =>
                  renderBuySellChipsButtons({item, index}, MainIndex)
                //   item={item}
                //   index={index}
                //   MainIndex={MainIndex}
                // />
              }
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            />
            <View style={styles.Divider} />
          </View>
        )}
      </>
    );
  };
  const renderBuySellChipsButtons = ({item,index},MainIndex) => {

    const KeyIndex=item.ACCESSED_BY.findIndex((val)=>val==tabs[activeTab]?.Key)
    console.log(item);
    return (
      // <View>
      KeyIndex != -1 ? (
        <>
          {item?.TYPE == 'INPUT' ? (
            <View
              style={[
                styles.InputBox,
                {width: width / 2 - 40, margin: 10, padding: 0},
              ]}>
              <TextInput value="" placeholder={item.SUB_TITLE} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                markTabSelected(MainIndex, index);
              }}
              style={[
                styles.TextInputStyle,
                {
                  padding: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: 10,
                  borderColor: item.IS_SELECTED
                    ? SelectedColorTheme
                    : COLORS.gray20,
                },
              ]}>
              <Text
                style={[
                  styles.sub_title_style,
                  {color: item.IS_SELECTED ? SelectedColorTheme : null},
                ]}>
                {item.SUB_TITLE}
              </Text>
              {item?.SECONDARY_TITLE != undefined && (
                <Text
                  style={[
                    styles.secondary_title_style,
                    {
                      color: item.IS_SELECTED ? SelectedColorTheme : null,
                      marginLeft: 10,
                    },
                  ]}>
                  {item?.SECONDARY_TITLE}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </>
      ) : (
        //Dummy View
        <View
          // onPress={() => {
          //   markTabSelected(MainIndex, index);
          // }}
          style={[
            // styles.TextInputStyle,
            {
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
              borderColor: item.IS_SELECTED
                ? SelectedColorTheme
                : COLORS.gray20,
            },
          ]}>
          <Text
            style={[
              styles.sub_title_style,
              {color: item.IS_SELECTED ? SelectedColorTheme : null},
            ]}>
            {/* {item.SUB_TITLE} */}
          </Text>
          {item?.SECONDARY_TITLE != undefined && (
            <Text
              style={[
                styles.secondary_title_style,
                {
                  color: item.IS_SELECTED ? SelectedColorTheme : null,
                  marginLeft: 10,
                },
              ]}>
              {/* {item?.SECONDARY_TITLE} */}
            </Text>
          )}
        </View>
      )

      // </View>
    );
  };
  const buildTab = useCallback(
    (label, index) => {
      console.log('Rendering this also', activeTab);
      return (
        <View
          key={`tab_${index}`}
          tabLabel={label.Title}
          style={{
            // flex: 1,
            height: height,
            backgroundColor: 'white',
          }}>
          <ScrollView
            // onScroll={handleScroll}
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: COLORS.white,
              // flex: 1,
            }}>
            <View style={[{backgroundColor: COLORS.primary1}]}>
              <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    marginTop: 70,
                    paddingTop: 80,
                  }}>
                  <FlatList
                    data={BuySellChipsOption}
                    renderItem={renderBuySellChipsHeader}
                  />
                </View>
                {/* </Animated.ScrollView>
              <Animated.ScrollView> */}
                <View
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
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            margin: 5,
                          }}>
                          <Text
                            style={{
                              // marginHorizontal: 15,
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: COLORS.black,
                            }}>
                            Quantity
                          </Text>
                          <Text
                            style={{
                              marginHorizontal: 15,
                              fontSize: 16,
                            }}>
                            Lot size 1
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            margin: 5,
                          }}>
                          <Text
                            style={{
                              // marginHorizontal: 15,
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: COLORS.black,
                            }}>
                            Price
                          </Text>
                          <Text
                            style={{
                              marginHorizontal: 15,
                              fontSize: 16,
                            }}>
                            Lot size 1
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <TextInput
                            style={[
                              styles.TextInputStyle,
                              {width: width / 2 - 40},
                            ]}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <TextInput
                            style={[
                              styles.TextInputStyle,
                              {width: width / 2 - 40},
                            ]}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      );
    },
    [tabs],
  );

  // const renderStockList = ({item, index}) => {
  //   //  console.log('Priniting', item);
  //   return (
  //     //  item != undefined && (
  //     //  <View style={{}}>

  //     item?.SYMBOL != undefined && (
  //       <>
  //         <TouchableOpacity
  //           onPress={() => {
  //             // navigation.navigate(STOCK_CHART)
  //             ShowOptionButtonModal.current.open();
  //             setSelectedStockData(item);

  //             // handleSheetChanges();
  //           }}>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               padding: 20,
  //             }}>
  //             <Text
  //               style={{
  //                 color: COLORS.black,
  //               }}>
  //               {item?.SYMBOL}
  //               {/* Tata Power */}
  //             </Text>
  //             <Text
  //               style={{
  //                 color: COLORS.green,
  //               }}>
  //               {item?.SYMBOL_CURRENT_PRICE}
  //             </Text>
  //             {/* <ImageIcon
  //             icon={item.icon}
  //             iconStyle={{
  //               height: 30,
  //               width: 25,
  //               tintColor: 'grey',
  //             }}
  //           /> */}
  //           </View>
  //         </TouchableOpacity>
  //         <View
  //           style={{
  //             borderColor: COLORS.gray10,
  //             borderWidth: 0.5,
  //             // borderTopWidth: 1,
  //           }}
  //         />
  //       </>
  //     )

  //     //  </View>
  //   );
  //   //  );
  // };


  const [NSE_BSE_Radio,setNSE_BSE_Radio]=useState([
    {

      LABEL:"NSE",
      CHECKED:true,
   
    },
    {

      LABEL:"BSE",
      CHECKED:false,
   
    }
  ])

    const switchNse_Bse = (CLickedIndex) => {
      
      let tempNSeBseRadio=[...NSE_BSE_Radio]

      console.log('CLickedIndex', CLickedIndex);
      
      tempNSeBseRadio.map((val,index)=>{
        if(index==CLickedIndex){
          val.CHECKED=true
          
          console.log('CLickedIndex', CLickedIndex,index);
          
          
        }
        else{
          val.CHECKED=false

        }
      })
      setNSE_BSE_Radio(tempNSeBseRadio);


    };


  // const MemoizedRenderStocks = memo(renderStockList);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.BarGray} />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.BarGray,
        }}>
        <IconButton
          icon={Icons.arrow_left}
          iconStyle={{
            height: 30,
            width: 30,
          }}
          containerStyle={{
            // marginLeft: 20,
            padding: 10,
          }}
          // onPress={onPress}
        />
        <View
          style={{
            // marginHorizontal:10,
            marginVertical: 5,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: COLORS.black,
            }}>
            Reliance
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            
            {NSE_BSE_Radio.map((val, index) => {
              return (
                <>
                  <IconButton
                    icon={
                      val.CHECKED ? Icons.radio_checked : Icons.radio_unchecked
                    }
                    iconStyle={{
                      height: 30,
                      width: 30,
                    }}
                    containerStyle={{
                      // marginLeft: 20,
                      // padding: 10,
                      marginVertical: 5,
                    }}
                    onPress={() => {
                      switchNse_Bse(index);
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={{
                        marginRight: 10,
                      }}>
                      {val.LABEL}
                    </Text>
                    <Text>28000</Text>
                  </View>
                </>

                // data.CHECKED == true ? (

                // ) : (
                //   <IconButton
                //     icon={Icons.radio_unchecked}
                //     iconStyle={{
                //       height: 30,
                //       width: 30,
                //     }}
                //     containerStyle={{
                //       // marginLeft: 20,
                //       padding: 10,
                //     }}
                //     // onPress={onPress}
                //   />
                // )
              );
            })}
          </View>
        </View>
      </View>
      <ScrollView
        // onScroll={handleScroll}
        // ref={ref}
        showsVerticalScrollIndicator={false}>
        <View
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
              tabBarInactiveTexhiitColor="red"
              locked={false}
              contentStyle={{
                backgroundColor: COLORS.primary1,
              }}
              showsVerticalScrollIndicator={false}
              tabBarUnderlineStyle={{
                backgroundColor: SelectedColorTheme,
                borderRadius: 20,
                // flex:1
              }}>
              {tabs.map((tab, index) => buildTab(tab, index))}
            </ScrollableTabView>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Slider
          onEndReached={() => {
            Alert.alert('Attention', 'onEndReached!');
          }}
          containerStyle={{
            margin: 8,
            backgroundColor: SelectedColorTheme,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
            alignContent: 'center',
          }}
          sliderElement={
            <View
              style={{
                height: 70,
                width: 70,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 70,
                backgroundColor: 'white',
                margin: 5,
              }}>
              <ImageIcon
                icon={Icons.arrow_right_no_stock}
                iconStyle={{
                  height: 20,
                  width: 20,
                  margin: 4,
                  tintColor: SelectedColorTheme,
                }}
              />
            </View>
          }>
          <Text
            style={{
              color:
                props.route.params?.PAGE_TYPE == 'SELL' ? '#f7cdca' : '#e1f3ff',
              fontSize: 20,
              textAlign: 'center',
              marginLeft: 30,
            }}>
            SWIPE TO {props.route.params?.PAGE_TYPE}
          </Text>
        </Slider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabText: {
    fontSize: 13,
    lineHeight: 17,
    textAlign: 'left',
    fontStyle: 'normal',
    color: COLORS.gray60,
  },
  TextInputStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: COLORS.gray,
  },
  BuySellHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  Divider: {
    height: 2,
    backgroundColor: COLORS.gray10,
  },
  sub_title_style: {
    fontSize: 15,
    // fontWeight:"bold"
  },
  secondary_title_style: {},
  InputBox: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    // width:"49%"
  },
});

export default StockBuySell;
