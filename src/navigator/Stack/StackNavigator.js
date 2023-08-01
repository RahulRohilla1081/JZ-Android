import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import Login from '../../screens/Login/Login';
import {
  DASHBOARD,
  LOGIN,
  STOCK_CHART,
  WELCOME,
  STOCK_SEARCH,
  ACCOUNT_FUNDS,
  ACCOUNT_PROFILE,
  ACCOUNT_SETTING,
} from '../../utils/Routes/Routes';
import BottomTabNavigator from '../BottomTab/BottomTabNavigator';
import StockChart from '../../screens/StockCharts/StockChart';
import Login from '../../screens/Login/Login';
import Welcome from '../../screens/Welcome/Welcome';
import StockSearch from '../../screens/StockSearch/StockSearch';
import Funds from '../../screens/AccountDetails/Funds';
import Profile from '../../screens/AccountDetails/Profile';
import AccountSettings from '../../screens/AccountDetails/Settings';

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={WELCOME}>
        <Stack.Screen
          name={LOGIN}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={WELCOME}
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={DASHBOARD}
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={STOCK_CHART}
          component={StockChart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={STOCK_SEARCH}
          component={StockSearch}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ACCOUNT_FUNDS}
          component={Funds}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ACCOUNT_PROFILE}
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ACCOUNT_SETTING}
          component={AccountSettings}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator