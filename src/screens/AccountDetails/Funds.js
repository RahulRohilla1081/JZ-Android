import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';

import Icons from '../../../constants/Icons';
import {color} from '@rneui/base';
// import {COLORS} from '../../../Theme/Theme';
// import CustomButton from '../../../components/CustomButton';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import { COLORS } from '../../utils/Theme/Theme';
import CustomButton from '../../../components/CustomButton/CustomButton';
import IconButton from '../../../components/IconButton/IconButton';
import { ACCOUNT_DETAILS } from '../../utils/Routes/Routes';


const Funds = (props) => {
  const {width} = useWindowDimensions();
  const viewWidth = width - 40;
  const headerHeight = 60 * 2;
  const [availableCash, setAvailableCash] = useState('10,000.00');
  const [usedMargin, setUsedMargin] = useState('0.00');

  const fundList = [
    [
      {title: 'Opening Balance', value: availableCash},
      {title: 'Payin', value: '0.00'},
      {title: 'Payout', value: '0.00'},
      {title: 'SPAN', value: '0.00'},
      {title: 'Delivery margin', value: '0.00'},
      {title: 'Exposure', value: '0.00'},
      {title: 'Option premium', value: '0.00'},
    ],
    [
      {title: 'Collateral (Liquid funds)', value: '0.00'},
      {title: 'Collateral (Equity)', value: '0.00'},
      {title: 'Total collateral', value: '0.00'},
    ],
  ];

  const [tBody, setTBody] = useState(fundList);

  const renderHeaderTitle = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: index % 2 == 0 ? '#fafafa' : '#fff',
          }}>
          <Text style={{fontSize: 14}}>{item.title}</Text>
          <Text>{item.value}</Text>
        </View>
        {item.title == 'Total collateral' && (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 34,
                backgroundColor: index % 2 == 0 ? '#fff' : '#fafafa',
              }}></View>
          </>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        width: width,
        flex: 1,
        backgroundColor: '#ebecee',
        paddingTop: 20,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor="#ebecee" />
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
            onPress={() => {
              props.navigation.navigate(ACCOUNT_DETAILS);
            }}
          />
          {/* </TouchableOpacity> */}
          <Text style={{fontSize: 18, color: '#434250', fontWeight: 'bold'}}>
            Equity Funds
          </Text>
          <View style={{width: 30}}></View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: width,
            flex: 1,
            backgroundColor: '#ffffff',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            marginTop: 80,
            paddingTop: 40,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 20,
              marginRight: 20,
            }}>
            <CustomButton
              color="#4cb050"
              icon={Icons.plus}
              iconStyle={{height: 45, width: 15, tintColor: 'white'}}
              label="Add Funds"
              style={{width: '47%'}}
              onPress={() => {
                // props.navigation.navigate(DASHBOARD);
              }}
            />
            <CustomButton
              color="#4185f6"
              icon={Icons.reload}
              iconStyle={{height: 45, width: 15, tintColor: 'white'}}
              label="Withdraw"
              style={{width: '47%'}}
              onPress={() => {
                // props.navigation.navigate(DASHBOARD);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 50,
              marginRight: 50,
              marginTop: 25,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'grey'}}>Available cash</Text>
              <Text
                style={{color: '#4a4b4d', fontWeight: 'bold', fontSize: 20}}>
                {availableCash}
              </Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'grey'}}>Used Margin</Text>
              <Text
                style={{color: '#4a4b4d', fontWeight: 'bold', fontSize: 20}}>
                {usedMargin}
              </Text>
            </View>
          </View>
          <View
            style={{height: 1, backgroundColor: COLORS.gray10, margin: 20}}
          />
          {/* <FlatList */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={tBody[0]}
            renderItem={renderHeaderTitle}
          />
          <View
            style={{height: 1, backgroundColor: COLORS.gray10, margin: 20}}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={tBody[1]}
            renderItem={renderHeaderTitle}
          />
        </View>

        <View
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
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: '#afafaf'}}>
                Available margin (Cash + Collateral){'  '}{' '}
              </Text>
              <ImageIcon
                icon={Icons.info}
                iconStyle={{
                  height: 20,
                  width: 20,
                  tintColor: '#3f84f5',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 5,
              }}>
              <ImageIcon
                icon={Icons.rupee}
                iconStyle={{
                  height: 35,
                  width: 30,
                  tintColor: '#3f84f5',
                }}
              />
              <Text
                style={{color: '#3f84f5', fontSize: 25, fontWeight: 'bold'}}>
                {availableCash}
              </Text>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <ImageIcon
                  icon={Icons.donut_chart}
                  iconStyle={{
                    height: 20,
                    width: 20,
                  }}
                />
                <Text style={{color: '#3f84f5'}}>View statement</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Funds;
