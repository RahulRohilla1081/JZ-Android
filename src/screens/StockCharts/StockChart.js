// import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {View,Text ,useWindowDimensions} from 'react-native';
import WebView from 'react-native-webview';



const StockChart = (props) => {
const [RenderStockTradingViewChart, setRenderStockTradingViewChart] = useState(
  "<html><head><meta name='viewport' content='width=device-width, initial-scale=1'><script type='text/javascript' src='https://s3.tradingview.com/tv.js'></script></head><body style='margin: auto;width:100%;'><div id='tradingview-widget-container'></div><script type='text/javascript'>;new TradingView.widget({'width':" +
    width +
    ",'height':" +
    height +
    ",'symbol':'TATACHEM','interval':'D','timezone':'Etc/UTC','theme':'light','style':'1','locale':'en','toolbar_bg':'#f1f3f6','enable_publishing':!1,'allow_symbol_change':!0,'container_id':'tradingview-widget-container'});</script></body></html>",
);

  const {width,height}=useWindowDimensions()
  console.log(props.route.params.STOCK_SYMBOL);
   const HTML =
     "<html><head><meta name='viewport' content='width=device-width, initial-scale=1'><script type='text/javascript' src='https://s3.tradingview.com/tv.js'></script></head><body style='margin: auto;width:100%;'><div id='tradingview-widget-container'></div><script type='text/javascript'>;new TradingView.widget({'width':" +
     width +
     ",'height':" +
     height +
     ",'symbol':'TATACHEM','interval':'D','timezone':'Etc/UTC','theme':'light','style':'1','locale':'en','toolbar_bg':'#f1f3f6','enable_publishing':!1,'allow_symbol_change':0,'container_id':'tradingview-widget-container'});</script></body></html>";
  // useEffect(() => {
  //   setRenderStockTradingViewChart(
  //     "<html><head><meta name='viewport' content='width=device-width, initial-scale=1'><script type='text/javascript' src='https://s3.tradingview.com/tv.js'></script></head><body style='margin: auto;width:100%;'><div id='tradingview-widget-container'></div><script type='text/javascript'>;new TradingView.widget({'width':" +
  //       width +
  //       ",'height':" +
  //       height +
  //       ",'symbol':" +
  //       props.route.params.STOCK_SYMBOL +
  //       ",'interval':'D','timezone':'Etc/UTC','theme':'light','style':'1','locale':'en','toolbar_bg':'#f1f3f6','enable_publishing':!1,'allow_symbol_change':!0,'container_id':'tradingview-widget-container'});</script></body></html>",
  //   );
  // }, [props.route.params.STOCK_SYMBOL]);

  const abcd = `<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div id="tradingview_49421"></div>
  <div class="tradingview-widget-copyright"><a href="https://in.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "autosize": true,
  "symbol": "NASDAQ:AAPL",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "light",
  "style": "1",
  "locale": "in",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "container_id": "tradingview_49421"
}
  );
  </script>
</div>
<!-- TradingView Widget END -->`;
 
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