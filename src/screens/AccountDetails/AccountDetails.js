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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
// import Animated from 'react-native-reanimated';

import Icons from '../../../constants/Icons';
import Images from '../../../constants/Images';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import {COLORS} from '../../utils/Theme/Theme';
import {color} from '@rneui/base';
import {
  ACCOUNT_FUNDS,
  ACCOUNT_PROFILE,
  ACCOUNT_SETTING,
} from '../../utils/Routes/Routes';
import {useNavigation} from '@react-navigation/native';
import IconButton from '../../../components/IconButton/IconButton';
import Overview from '../../../components/Overview/Overview';
// import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// import {ScrollView} from 'react-native-gesture-handler';

const Account = () => {
  const [expanded, setExpanded] = useState(false);
  const scrollY = useRef(new Animated.Value(0));
  const navigation = useNavigation();
  const {height, width} = useWindowDimensions();
  const viewWidth = width - 40;
  const headerHeight = 60 * 2;
  const animationHeight = useRef(new Animated.Value(0)).current;
  const ref = useRef(null);
  const [UserData, setUserData] = useState({
    name: 'Sakshi',
    ID: 'LJS128',
    email: 'sakshisingh064@gmail.com',
  });
  const profile = UserData.name.slice(0, 2);
  const [niftyFifty, setNiftyFifty] = useState({
    value: 18688.1,
    changeToday: -67.8,
    changeTodayPercent: -0.36,
  });
  const [funds, setFunds] = useState({equity: 10000});
  const accountList = [
    {
      head: 'Account',
      list: [
        {title: 'Funds', icon: Icons.rupee, route: ACCOUNT_FUNDS},
        {title: 'Profile', icon: Icons.profile, route: ACCOUNT_PROFILE},
        {title: 'Settings', icon: Icons.settings, route: ACCOUNT_SETTING},
        {title: 'Logout', icon: Icons.logout, route: ACCOUNT_FUNDS},
      ],
    },
    {
      head: 'Support',
      list: [
        {title: 'Support Portal', icon: Icons.info, route: ACCOUNT_FUNDS},
        {title: 'User Manual', icon: Icons.question, route: ACCOUNT_FUNDS},
        {title: 'Contact', icon: Icons.telephone, route: ACCOUNT_FUNDS},
      ],
    },
  ];

  const [tBody, setTBody] = useState(accountList);
  useEffect(() => {
    if (expanded) {
      Animated.timing(animationHeight, {
        duration: 100,
        toValue: 0.55 * height,
        useNativeDriver: false,

        // easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(animationHeight, {
        duration: 100,
        toValue: 0,
        useNativeDriver: false,

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
    outputRange: [0, -(headerHeight / 2)],
  });
  const translateYNumber = useRef();
  translateY.addListener(({value}) => {
    translateYNumber.current = value;
  });

  const renderHeaderTitle = ({item, index}) => {
    let headerTitleIndex = index;

    return (
      <View>
        <Text
          style={{
            marginLeft: 20,
            //   marginTop: 20,
            paddingTop: 20,
            marginBottom: 20,
            fontWeight: 'bold',
            color: COLORS.black,
            // fontSize: 17,
          }}>
          {item.head}
        </Text>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          ref={ref}
          data={item.list}
          // ListHeaderComponent={}
          renderItem={({item, index}) =>
            renderSubCategory({item, index}, headerTitleIndex)
          }
        />
      </View>
    );
  };

  const renderSubCategory = ({item, index}, headerTitleIndex) => {
    return (
      <View>
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
            setTimeout(() => {
              navigation.navigate(item.route);
            }, 20);
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
              {item.title}
            </Text>
            <ImageIcon
              icon={item.icon}
              iconStyle={{
                height: 30,
                width: 25,
                tintColor: 'grey',
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderColor: COLORS.gray10,
            borderWidth: 0.5,
            // borderTopWidth: 1,
          }}
        />
        {tBody.length - 1 == headerTitleIndex &&
          tBody[tBody.length - 1].list.length - 1 == index && (
            <>
              <Text style={{color: 'grey', padding: 20}}>
                Version v1.0.0 Beta
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 20,
                }}>
                <ImageIcon
                  icon={Images.logo}
                  iconStyle={{
                    height: 30,
                    width: 30,
                    //   tintColor: 'grey',
                  }}
                />
                <Text style={{fontSize: 20, color: '#c8c8c8'}}>
                  JOIN ZERODA
                </Text>
              </View>
            </>
          )}
      </View>
    );
  };
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
                // {transform: [{translateY}]},
              ]}>
              <Text
                style={{fontSize: 24, fontWeight: 'bold', color: '#373644'}}>
                Account
              </Text>
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

            <View
              style={{
                // marginLeft: 20,
                // marginRight: 20,
                marginHorizontal: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, color: '#3c3b48'}}>
                {UserData.name}
              </Text>
              <ImageIcon
                icon={Icons.notification}
                iconStyle={{
                  height: 30,
                  width: 25,
                }}
              />
            </View>
          </Animated.View>
          <Animated.ScrollView
            onScroll={handleScroll}
            ref={ref}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: width,
                flex: 1,
                backgroundColor: '#ffffff',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                marginTop: 130,
                paddingTop: 75,
              }}>
              <Animated.FlatList
                // onScroll={handleScroll}
                // ref={ref}
                showsVerticalScrollIndicator={false}
                data={tBody}
                renderItem={renderHeaderTitle}
              />
            </View>

            <Animated.View
              style={[
                {
                  position: 'absolute',
                  marginLeft: 20,
                },
                // {transform: [{translateY}]},
              ]}>
              <View
                style={{
                  width: viewWidth,
                  height: headerHeight,
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  shadowColor: '#171717',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.2,
                  elevation: 15,
                  shadowRadius: 3,
                  padding: 15,
                  marginTop: 60,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#41404e',
                    }}>
                    {UserData.ID}
                  </Text>
                  <Text style={{marginTop: 5, fontSize: 14, color: '#b0b0b0'}}>
                    {UserData.email}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 0,
                    width: 80,
                    height: 80,
                    backgroundColor: '#e6f0fd',
                    borderRadius: 50,
                    padding: 20,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 30, color: '#a4c4f6'}}>
                    {profile}
                  </Text>
                </View>
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
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: '#373644', // marginTop: 20,
                }}>
                Account
              </Text>
              {/* <Animated.View
            ref={translateYIconNumber}
            style={{
              height: 30,
              transform: [{translateY: translateYIcon}],
            }}> */}
              <TouchableOpacity
                onPress={() => {
                  console.log('EXP', expanded);
                  setExpanded(!expanded);
                }}>
                <ImageIcon
                  icon={Icons.arrow_down}
                  iconStyle={{
                    height: 30,
                    width: 25,
                  }}
                />
              </TouchableOpacity>
              {/* </Animated.View> */}
            </Animated.View>

            <View
              style={{
                // marginLeft: 20,
                // marginRight: 20,
                marginHorizontal: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, color: '#3c3b48'}}>
                {UserData.name}
              </Text>
              <ImageIcon
                icon={Icons.notification}
                iconStyle={{
                  height: 30,
                  width: 25,
                }}
              />
            </View>
          </Animated.View>
          <Animated.ScrollView
            onScroll={handleScroll}
            ref={ref}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: width,
                flex: 1,
                backgroundColor: '#ffffff',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                marginTop: 130,
                paddingTop: 75,
              }}>
              <Animated.FlatList
                // onScroll={handleScroll}
                // ref={ref}
                showsVerticalScrollIndicator={false}
                data={tBody}
                renderItem={renderHeaderTitle}
              />
            </View>

            <Animated.View
              style={[
                {
                  position: 'absolute',
                  marginLeft: 20,
                },
                // {transform: [{translateY}]},
              ]}>
              <View
                style={{
                  width: viewWidth,
                  height: headerHeight,
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  shadowColor: '#171717',
                  shadowOffset: {width: -2, height: 4},
                  shadowOpacity: 0.2,
                  elevation: 15,
                  shadowRadius: 3,
                  padding: 15,
                  marginTop: 60,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      marginTop: 15,
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#41404e',
                    }}>
                    {UserData.ID}
                  </Text>
                  <Text style={{marginTop: 5, fontSize: 14, color: '#b0b0b0'}}>
                    {UserData.email}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 0,
                    width: 80,
                    height: 80,
                    backgroundColor: '#e6f0fd',
                    borderRadius: 50,
                    padding: 20,
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 30, color: '#a4c4f6'}}>
                    {profile}
                  </Text>
                </View>
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
    </>
  );
};

export default Account;
