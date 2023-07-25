import {View, Text, Animated} from 'react-native';
import React, {useState} from 'react';
import ImageIcon from '../ImageIcon/ImageIcon';
import Icons from '../../constants/Icons';
import IconButton from '../IconButton/IconButton';
import { COLORS } from '../../src/utils/Theme/Theme';
import WebView from 'react-native-webview';


// import Icons from '../../constants/Icons';
// import ImageIcon from '../ImageIcon/ImageIcon';
// import IconButton from '../IconButton';
// import {COLORS} from '../../Theme/Theme';

const Overview = ({animationHeight, onPress}) => {
   const NIFTY_HTML = `<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>
  {
  "symbol": "FX:EURUSD",
  "width": 370,
  "height": 200,
  "locale": "in",
  "dateRange": "12M",
  "colorTheme": "light",
  "trendLineColor": "rgba(109, 158, 235, 1)",
  "underLineColor": "rgba(242, 242, 242, 1)",
  "underLineBottomColor": "rgba(238, 238, 238, 0)",
  "isTransparent": true,
  "autosize": false,
  "largeChartUrl": "",
  "chartOnly": false,
  "noTimeScale": true
}
  </script>
</div>
<!-- TradingView Widget END -->`;
  const [niftyFifty, setNiftyFifty] = useState({
    value: 18688.1,
    changeToday: -67.8,
    changeTodayPercent: -0.36,
  });
  const [funds, setFunds] = useState({equity: 10000});
  return (
    <Animated.View
      style={[
        {
          height: animationHeight,
          backgroundColor: '#e8edeb',
          // padding: expanded ? 20 : null,
        },
        // {backgroundColor: 'white'},
      ]}>
      <View
        style={{
          padding: 20,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#373644',
            }}>
            Overview
          </Text>
          <IconButton
            icon={Icons.cross}
            iconStyle={{
              height: 18,
              width: 18,
            }}
            onPress={onPress}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 40}}>
              NIFTY 50
            </Text>
            <Text style={{fontSize: 20}}>{niftyFifty.value.toFixed(2)}</Text>
            <Text style={{color: 'red', marginTop: 10}}>
              {niftyFifty.changeToday} {'      '}
              {niftyFifty.changeTodayPercent}%
            </Text>
            <View
              style={{marginTop: 20, height: 80, width: 100}}>
              {/* <ImageIcon
                icon={Icons.line_chart}
                iconStyle={{
                  height: 40,
                  width: 50,
                }}
              /> */}
              <WebView
                source={{html: NIFTY_HTML}}
                scalesPageToFit={true}
                scrollEnabled={false}
              />
            </View>
          </View>
          <View style={{marginLeft: 75}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 40}}>
              NIFTY 50
            </Text>
            <Text style={{fontSize: 20}}>{niftyFifty.value.toFixed(2)}</Text>
            <Text style={{color: 'red', marginTop: 10}}>
              {niftyFifty.changeToday} {'      '}
              {niftyFifty.changeTodayPercent}%
            </Text>
            <View
              style={{marginTop: 20, marginLeft: 20, height: 80, width: 100}}>
              {/* <ImageIcon
                icon={Icons.line_chart}
                iconStyle={{
                  height: 40,
                  width: 50,
                }}
              /> */}
              <WebView
                source={{html: NIFTY_HTML}}
                scalesPageToFit={true}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
        <Text style={{color: COLORS.gray20, paddingVertical: 30}}>
          * Charts indicate 52 weeks trend
        </Text>
        <View
          style={{
            backgroundColor: COLORS.gray10,
            paddingHorizontal: 20,
            height: 1,
          }}
        />
        <Text style={{paddingVertical: 10, fontWeight: 'bold', fontSize: 15}}>
          Funds
        </Text>
        <Text style={{color: COLORS.gray20}}>Equity</Text>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <ImageIcon
            icon={Icons.rupee}
            iconStyle={{
              height: 25,
              width: 20,
            }}
          />
          <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: -5}}>
            {Number(funds.equity).toFixed(2)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default Overview;
