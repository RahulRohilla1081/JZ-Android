// import { View, Text } from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';
import IconButton from '../../../components/IconButton/IconButton';
import Icons from '../../../constants/Icons';
import {COLORS} from '../../utils/Theme/Theme';
import {useNavigation} from '@react-navigation/native';
import {DASHBOARD, STOCK_BUY_SELL} from '../../utils/Routes/Routes';

const StockChart = props => {
  const navigation = useNavigation();

  const WebViewRef = useRef();

  const {width, height} = useWindowDimensions();
  console.log('asdasdjb', props.route.params.STOCK_SYMBOL);


  const [StockChartHtmlView, setStockChartHtmlView] =useState( `<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script
      type="text/javascript"
      src="https://s3.tradingview.com/tv.js"></script>
  </head>
  <body style="margin: auto; width: 100%">
    <div id="tradingview-widget-container"></div>
    <script type="text/javascript">
      ;new TradingView.widget({'width':
          ${width} 
        ,'height':
          ${height - 60}
          ,'symbol':'${
            props.route.params.STOCK_SYMBOL
          }','interval':'D','timezone':'Etc/UTC','theme':'light','style':'1','locale':'en','toolbar_bg':'#f1f3f6','enable_publishing':!1,'allow_symbol_change':0,'container_id':'tradingview-widget-container'});
    </script>
  </body>
</html>
`);


  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.BarGray} />
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: COLORS.BarGray,
          padding: 10,
          justifyContent: 'space-between',
        }}>
        <IconButton
          icon={Icons.cross_light}
          iconStyle={{
            height: 22,
            width: 22,
          }}
          onPress={() => {
            navigation.navigate(DASHBOARD);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton
            icon={Icons.refresh}
            iconStyle={{
              height: 20,
              width: 20,
            }}
            onPress={() => {
              WebViewRef.current.reload();
            }}
          />
          <IconButton
            icon={Icons.smartphone_call}
            iconStyle={{
              height: 20,
              width: 20,
            }}
            containerStyle={{
              marginLeft: 20,
            }}
            // onPress={onPress}
          />
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.buy,
              padding: 5,
              borderRadius: 20,
              width: 35,
              height: 35,
              marginLeft: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate(STOCK_BUY_SELL, {PAGE_TYPE: 'BUY'});
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.white,
                textAlign: 'center',
              }}>
              B
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.sell,
              padding: 5,
              borderRadius: 20,
              width: 35,
              height: 35,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
            }}
            onPress={() => {
              navigation.navigate(STOCK_BUY_SELL, {PAGE_TYPE: 'SELL'});
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: COLORS.white,
                textAlign: 'center',
              }}>
              S
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Text>StockChart</Text> */}
      <WebView
        ref={WebViewRef}
        source={{html: StockChartHtmlView}}
        scalesPageToFit={true}
        scrollEnabled={false}
      />
    </View>
  );
};

export default StockChart;
