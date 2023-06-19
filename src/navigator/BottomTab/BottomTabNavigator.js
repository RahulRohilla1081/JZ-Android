import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/Dashboard/Dashboard';
import { ACCOUNT_DETAILS, DASHBOARD, HOME, ORDERS, PORTFOLIO, WATCH_LIST } from '../../utils/Routes/Routes';
import WatchList from '../../screens/WatchList/WatchList';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from '../../../constants/Icons';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
import Portfolio from '../../screens/Portfolio/Portfolio';
import AccountDetails from '../../screens/AccountDetails/AccountDetails';
import Orders from '../../screens/Orders/Orders';
import { COLORS } from '../../utils/Theme/Theme';
import { Text } from 'react-native';


const Tab = createBottomTabNavigator();

const  BottomTabNavigator=()=>{
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
         

          return (
            <ImageIcon
              icon={Icons.watch_list}
              iconStyle={{
                height: 25,
                width: 25,
                // tintColor: '#21a3f1',
              }}
            />
          );
        },
        tabBarActiveTintColor: COLORS.activeBlue,
        tabBarInactiveTintColor: 'gray',
      })}>
      {/* <Tab.Screen
        name={HOME}
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name={WATCH_LIST}
        component={WatchList}
        options={{
          title: "WatchList",
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <ImageIcon
              icon={Icons.watch_list}
              iconStyle={{
                height: 20,
                width: 20,
                tintColor: focused ? '#21a3f1' : COLORS.gray60,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={PORTFOLIO}
        component={Portfolio}
        options={{
          title: 'Portfolio',
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <ImageIcon
              icon={Icons.portfolio}
              iconStyle={{
                height: 20,
                width: 20,
                tintColor: focused ? '#21a3f1' : COLORS.black,
              }}

              />
          ),
        }}
      />
      <Tab.Screen
        name={ORDERS}
        component={Orders}
        options={{
          title: 'Orders',
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <ImageIcon
              icon={Icons.orders}
              iconStyle={{
                height: 20,
                width: 20,
                tintColor: focused ? '#21a3f1' : COLORS.gray60,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name={ACCOUNT_DETAILS}
        component={AccountDetails}
        options={{
          title: 'LSJ128',
          headerShown: false,
          tabBarIcon: ({focused, size, color}) => (
            <ImageIcon
              icon={Icons.account}
              iconStyle={{
                height: 25,
                width: 25,
                tintColor: focused ? '#21a3f1' : COLORS.gray60,
              }}
            />
          ),
        }}
      />

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
