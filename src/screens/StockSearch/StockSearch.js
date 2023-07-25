import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icons from '../../../constants/Icons';
import IconButton from '../../../components/IconButton/IconButton';
import {COLORS} from '../../utils/Theme/Theme';
// import { connect } from 'socket.io-client';
// import  {connect}  from 'react-redux';
import nseStocksAction from '../../redux/action/nseStockAction';
import {connect} from 'react-redux';
import {WATCH_LIST} from '../../utils/Routes/Routes';
import AddStocksInWatchList from '../../redux/action/watchlistAction';

const StockSearch = props => {
  const [searchedStockName, setSearchedStockName] = useState('');
  const [nseStockTbody, setNseStockTbody] = useState([]);
  const [selectedStocksList, setSelectedStocksList] = useState([]);


  const StockSearching = stockName => {
    // console.log('StockSearching', StockSearching);
    setSearchedStockName(stockName.toUpperCase());
    let Tbody_tempArr = [...props.NSE_STOCK_DATA];
    const items = Tbody_tempArr.filter(data => {
      if (stockName == null) return data;
      else if (data?.SYMBOL.toUpperCase().includes(stockName.toUpperCase())) {
        return data;
      }
    });
    setNseStockTbody(items);
  };

  const MarkStockSelected = stockName => {
    console.log('stockName', stockName);
    let tempSelectedStocks = [];
    selectedStocksList.map(val => {
      // console.log('Stock iteration', val);
      tempSelectedStocks.push(val);
    });

    const StockIndex = tempSelectedStocks.findIndex(
      val => val.SYMBOL == stockName.SYMBOL,
    );
    console.log('StockIndexskdjbfhdsj', StockIndex);

    if (StockIndex == -1) {
      tempSelectedStocks.push(stockName);
    } else {
      tempSelectedStocks.splice(StockIndex, 1);
    }

    console.log(StockIndex);

    setSelectedStocksList(tempSelectedStocks);

    props.AddStocksInWatchList(
      props.route.params.state.WATCH_LIST_TYPE,
      tempSelectedStocks,
    );

    // console.log('selectedStocks.length', selectedStocksList);
  };

  useEffect(() => {
    // console.log(
    //   'props.WATCH_LIST_1',
    //   props[props.route.params.state.WATCH_LIST_TYPE],
    //   props.route.params.state.WATCH_LIST_TYPE,
    // );
    setSelectedStocksList(props[props.route.params.state.WATCH_LIST_TYPE]);
    // console.log(
    //   'props.props.route.params.WATCH_LIST_TYPE',
    //   props.route.params.state.WATCH_LIST_TYPE,
    // );
  }, []);

  useEffect(() => {
    console.log(
      'selectedStocks hah',
      selectedStocksList,
      selectedStocksList.length,
    );
  }, [selectedStocksList]);

  const renderSearchedStocks = ({item, index}) => {
    const StockIndex = selectedStocksList.findIndex(val => val == item);

    console.log('item.Category', item.Category);
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5,
            padding: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                backgroundColor: item.EXCHANGE == 'NSE' ? '#f9e7e7' : '#e6f0fd',
                padding: 5,
                fontSize: 12,
                color: item?.EXCHANGE == 'NSE' ? '#d15753' : '#4983e1',
              }}>
              {item?.EXCHANGE}
            </Text>
            <View>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 14,
                  color: '#373644',
                  margin: 2,
                }}>
                {item?.SYMBOL}
              </Text>
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 14,
                  color: COLORS.gray20,
                  margin: 2,
                }}>
                {item?.ISSUER_NAME}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconButton
              icon={
                StockIndex == -1 ? Icons.add_outlined : Icons.green_check_mark
              }
              iconStyle={{
                height: 25,
                width: 25,
                tintColor: StockIndex == -1 ? '#4781e0' : null,
              }}
              onPress={() => {
                // console.log('index', index);
                MarkStockSelected(item);
                // props.navigation.navigate(WATCH_LIST);
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: COLORS.gray10,
          }}
        />
      </>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          // marginTop:10
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconButton
            icon={Icons.arrow_left}
            iconStyle={{
              height: 30,
              width: 30,
              tintColor: COLORS.gray60,
            }}
            onPress={() => {
              props.navigation.navigate(WATCH_LIST);
            }}
          />
          <TextInput
            autoFocus={true}
            value={searchedStockName}
            placeholder="Search eg: infy base, nifty fut"
            selectionColor="#357df3"
            autoCapitalize={'characters'}
            onChangeText={stockName => {
              // console.log(stockName);
              StockSearching(stockName);
              if (stockName == '') {
                setNseStockTbody([]);
              }
            }}
          />
        </View>
        {searchedStockName != '' && (
          <TouchableOpacity
            onPress={() => {
              setSearchedStockName('');
              setNseStockTbody([]);
            }}>
            <Text
              style={{
                color: '#4781e0',
                fontSize: 15,
              }}>
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.gray10,
        }}
      />
      <FlatList data={nseStockTbody} renderItem={renderSearchedStocks} />
      {/* <Text>StockSearch</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
// export default StockSearch

const mapStateToProps = state => ({
  NSE_STOCK_DATA: state.stocks.nseStockData,
  WATCH_LIST_1: state.watchlist.watchlist1,
  WATCH_LIST_2: state.watchlist.watchlist2,
  WATCH_LIST_3: state.watchlist.watchlist3,
  WATCH_LIST_4: state.watchlist.watchlist4,
  WATCH_LIST_5: state.watchlist.watchlist5,
  WATCH_LIST_6: state.watchlist.watchlist6,
  WATCH_LIST_7: state.watchlist.watchlist7,
});

export default connect(mapStateToProps, {
  nseStocksAction,
  AddStocksInWatchList,
})(StockSearch);

// const mapStateToProps = state => ({
//   NSE_STOCK_DATA: state.stocks.nseStockData,
// });
// export default connect(mapStateToProps, {
//   nseStocksAction,
// })(StockSearch);
