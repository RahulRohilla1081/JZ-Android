import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  TouchableOpacity,
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
import {FlashList} from '@shopify/flash-list';

const StockSearch = props => {


  const [searchedStockName, setSearchedStockName] = useState('');
  const [nseStockTbody, setNseStockTbody] = useState([]);

  const StockSearching = stockName => {
    // console.log('StockSearching', StockSearching);
    setSearchedStockName(stockName.toUpperCase());
    let Tbody_tempArr = [...props.NSE_STOCK_DATA];
    const items = Tbody_tempArr.filter(data => {
      if (stockName == null) return data;
      else if (data.toUpperCase().includes(stockName.toUpperCase())) {
        return data;
      }
    });
    setNseStockTbody(items);
  };
  const MarkStockSelected = stockName => {
    let tempSelectedStocks = [];
    console.log('selectedStocks.length', selectedStocksList);
    selectedStocksList.map(val => {
      console.log('Stock iteration', val);
      tempSelectedStocks.push({...val});
    });

    tempSelectedStocks.push(stockName);

    setSelectedStocksList(tempSelectedStocks);
  };


const [selectedStocksList, setSelectedStocksList] = useState([]);


useEffect(()=>{
  if (props.route.params != undefined) {
    console.log(props.route.params.WATCH_LIST_INDEX);
  }
},[])
  useEffect(() => {
    console.log('selectedStocks hah', selectedStocksList, selectedStocksList.length);
  }, [selectedStocksList]);

  

  const renderSearchedStocks = ({item, index}) => {
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
                backgroundColor: item.Category == 'NSE' ? '#f9e7e7' : '#e6f0fd',
                padding: 5,
                fontSize: 12,
                color: item.Category == 'NSE' ? '#d15753' : '#4983e1',
              }}>
              NSE
            </Text>
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 15,
                color: '#373644',
              }}>
              {item}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconButton
              icon={Icons.add_outlined}
              iconStyle={{
                height: 25,
                width: 25,
                tintColor: '#4781e0',
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
      <FlashList data={nseStockTbody} renderItem={renderSearchedStocks} />
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
});

export default connect(mapStateToProps, {
  nseStocksAction,
})(StockSearch);

// const mapStateToProps = state => ({
//   NSE_STOCK_DATA: state.stocks.nseStockData,
// });
// export default connect(mapStateToProps, {
//   nseStocksAction,
// })(StockSearch);
