import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Switch} from 'react-native-switch';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import Icons from '../../../constants/Icons';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import RadioButton from '../../../components/RadioButton/RadioButton';
import { COLORS } from '../../utils/Theme/Theme';
import Separator from '../../../components/Separator/Separator';
import IconButton from '../../../components/IconButton/IconButton';
import { ACCOUNT_DETAILS } from '../../utils/Routes/Routes';

const AccountSettings = (props) => {
  const {width} = useWindowDimensions();

  const [theme, setTheme] = useState([
    {title: 'Default', selected: true},
    {title: 'Dark', selected: false},
  ]);
  const [settings, setSettings] = useState([
    {
      header: 'Order notifications',
      description: '',
      flag: false,
    },
    {
      header: 'Sticky order window',
      description:
        "Don't automatically hide order window after order placement",
      flag: false,
    },
    {
      header: 'Accessibility mode',
      description: 'Disables transitions and simplifies UI',
      flag: false,
    },
    {
      header: 'Fullscreen',
      description: 'May not work on certain devices',
      flag: false,
    },
    {
      header: 'Sticky pins',
      description: 'Show pinned stock tickers on the top on all screens',
      flag: false,
    },
  ]);
  const [chart, setChart] = useState([
    {title: 'ChartIQ', icon: Icons.chart_iq, selected: false},
    {title: 'TradingView', icon: Icons.trading_view, selected: true},
  ]);
  //   chart icons to be changed. Custom icons to be made
  const [watchListChange, setWatchListChange] = useState([
    {title: 'Close price', selected: true},
    {title: 'Open price', selected: false},
  ]);

  const renderSettings = ({item, index}) => {
    return (
      <>
        <View style={styles.containerOuter}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 2,
            }}>
            <View
              style={
                {
                  // width:width-100
                }
              }>
              <Text style={{fontSize: 15, color: '#434250'}}>
                {item.header}
              </Text>
              {item.description != '' && (
                <View style={{maxWidth: 200}}>
                  <Text
                    style={{
                      color: COLORS.gray20,
                      marginTop: 3,
                      fontSize: 13,
                    }}>
                    {item.description}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity>
              <Switch
                backgroundActive={COLORS.primary}
                backgroundInactive={'#e6e6e6'}
                circleActiveColor={'#fff'}
                circleInActiveColor={'#fff'}
                disabled={false}
                circleBorderWidth={0}
                value={item.flag}
                innerCircleStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#171717',
                  shadowOffset: {width: 1, height: 2},
                  shadowOpacity: 0.2,
                  elevation: 5,
                  shadowRadius: 3,
                }}
                outerCircleStyle={{padding: 2}}
                onValueChange={() => {
                  let tempSettings = [...settings];
                  tempSettings[index].flag = !tempSettings[index].flag;
                  setSettings(tempSettings);
                }}
                circleSize={28}
                barHeight={32}
                renderActiveText={false}
                renderInActiveText={false}
                switchWidthMultiplier={1.7}
                //   circleBorderWidth={3}
                //   style={{transform: [{scaleX: 1}, {scaleY: 1.2}]}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Separator />
      </>
    );
  };

  const toggleButton = (data, index) => {
    let tempTheme = [...data];
    function toggle(tempTheme, index) {
      let outerIndex = index;
      tempTheme.map((val, index) => {
        if (index != outerIndex) {
          tempTheme[index].selected = !tempTheme[index].selected;
        }
      });
    }
    if (!tempTheme[index].selected) {
      tempTheme[index].selected = !tempTheme[index].selected;
      toggle(tempTheme, index);
    }
    setTheme(tempTheme);
  };

  return (
    <SafeAreaProvider>
      <View
        style={{
          width: width,
          flex: 1,
          backgroundColor: '#fff',
          paddingTop: 20,
        }}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={{height: 40}}>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* <TouchableOpacity> */}
              <IconButton
                icon={Icons.arrow_left}
                iconStyle={{
                  height: 35,
                  width: 30,
                }}
                onPress={()=>{
                  props.navigation.navigate(ACCOUNT_DETAILS)
                }}
              />
            {/* </TouchableOpacity> */}
            <Text style={{fontSize: 18, color: '#434250',}}>
              Settings
            </Text>
            <View style={{width: 30}}></View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Separator />
          <View style={styles.containerOuter}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Theme</Text>
            {theme.map((val, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                  }}>
                  <Text style={{fontSize: 16}}>{val.title}</Text>
                  <TouchableOpacity>
                    <RadioButton
                      selected={val.selected}
                      onPress={() => toggleButton(theme, index)}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <Separator />

          <FlatList data={settings} renderItem={renderSettings} />
          <View style={styles.containerOuter}>
            <Text style={{fontSize: 16}}>Disable battery optimization</Text>
            <Text
              style={{
                color: COLORS.gray20,
                marginTop: 3,
              }}>
              Get regular widget updates and reduces app closes
            </Text>
          </View>
          <Separator />
          <View style={styles.containerOuter}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Chart</Text>
            {chart.map((val, index) => {
              return (
                index == 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 20,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <ImageIcon
                        icon={val.icon}
                        iconStyle={{
                          height: 25,
                          width: 30,
                        }}
                      />
                      <Text style={{fontSize: 16, marginLeft: 10}}>
                        {val.title}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <RadioButton
                        selected={val.selected}
                        onPress={() => toggleButton(chart, index)}
                      />
                    </TouchableOpacity>
                  </View>
                )
              );
            })}
          </View>
          <Separator />
          <View style={styles.containerOuter}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Watchlist Change
            </Text>
            {watchListChange.map((val, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 20,
                  }}>
                  <Text style={{fontSize: 16}}>{val.title}</Text>
                  <TouchableOpacity>
                    <RadioButton
                      selected={val.selected}
                      onPress={() => toggleButton(watchListChange, index)}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <Separator />
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  containerOuter: {paddingHorizontal: 25, paddingVertical: 20},
  grayText: {
    fontSize: 16,
    color: COLORS.gray20,
  },
  blueText: {fontSize: 16, color: COLORS.primary},
});

export default AccountSettings;
