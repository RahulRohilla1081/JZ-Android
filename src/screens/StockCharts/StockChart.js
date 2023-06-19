// import { View, Text } from 'react-native'
import React from 'react'
import {View,Text ,useWindowDimensions} from 'react-native';
import WebView from 'react-native-webview';



const StockChart = () => {
  const {width,height}=useWindowDimensions()
  console.log();
   const HTML =
     "<html><head><meta name='viewport' content='width=device-width, initial-scale=1'><script type='text/javascript' src='https://s3.tradingview.com/tv.js'></script></head><body style='margin: auto;width:100%;'><div id='tradingview-widget-container'></div><script type='text/javascript'>;new TradingView.widget({'width':" +
     width +
     ",'height':" +
     height  +
     ",'symbol':'RELIANCE','interval':'D','timezone':'Etc/UTC','theme':'light','style':'1','locale':'en','toolbar_bg':'#f1f3f6','enable_publishing':!1,'allow_symbol_change':!0,'container_id':'tradingview-widget-container'});</script></body></html>";
  return (
    <View style={{flex: 1}}>
      {/* <Text>StockChart</Text> */}
      <WebView
        source={{html: HTML}}
        scalesPageToFit={true}
        scrollEnabled={false}
      />
    </View>
  );
}

export default StockChart