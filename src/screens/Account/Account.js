// import {
//   View,
//   Text,
//   useWindowDimensions,
//   StatusBar,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   FlatList,
// } from 'react-native';
// import React, {useState} from 'react';

// import Icons from '../../../constants/Icons';
// import Images from '../../../constants/Images';
// import ImageIcon from '../../../components/ImageIcon/ImageIcon';
// // import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// // import {TouchableOpacity} from 'react-native-gesture-handler';

// // import {ScrollView} from 'react-native-gesture-handler';

// const Account = () => {
//   const {width} = useWindowDimensions();
//   const viewWidth = width - 40;
//   const [UserData, setUserData] = useState({
//     name: 'Sakshi',
//     ID: 'LJS128',
//     email: 'sakshisingh064@gmail.com',
//   });
//   const accountList = [
//     {
//       head: 'Account',
//       list: [
//         {title: 'Funds', icon: Icons.rupee},
//         {title: 'Profile', icon: Icons.profile},
//         {title: 'Settings', icon: Icons.settings},
//         {title: 'Logout', icon: Icons.logout},
//       ],
//     },
//     {
//       head: 'Support',
//       list: [
//         {title: 'Support Portal', icon: Icons.info},
//         {title: 'User Manual', icon: Icons.question},
//         {title: 'Contact', icon: Icons.telephone},
//       ],
//     },
//   ];

//   const [tBody, setTBody] = useState(accountList);

//   const renderHeaderTitle = ({item, index}) => {
//     let headerTitleIndex = index;

//     return (
//       <View>
//         <Text
//           style={{
//             marginLeft: 20,
//             //   marginTop: 20,
//             paddingTop: 20,
//             marginBottom: 20,
//             fontWeight: 'bold',
//             fontSize: 17,
//           }}>
//           {item.head}
//         </Text>
//         <FlashList
//           //  <FlatList
//           data={item.list}
//           // ListHeaderComponent={}
//           renderItem={({item, index}) =>
//             renderSubCategory({item, index}, headerTitleIndex)
//           }
//         />
//       </View>
//     );
//   };

//   const renderSubCategory = ({item, index}, headerTitleIndex) => {
//     return (
//       <View>
//         <TouchableWithoutFeedback>
//           <View
//             style={{
//               borderColor: '#e1e1e1',
//               borderBottomWidth: 1,
//               borderTopWidth: 1,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               padding: 20,
//             }}>
//             <Text>{item.title}</Text>
//             <ImageIcon
//               icon={item.icon}
//               iconStyle={{
//                 height: 30,
//                 width: 25,
//                 tintColor: 'grey',
//               }}
//             />
//           </View>
//         </TouchableWithoutFeedback>
//         {tBody.length - 1 == headerTitleIndex &&
//           tBody[tBody.length - 1].list.length - 1 == index && (
//             <>
//               <Text style={{color: 'grey', padding: 20}}>
//                 Version 1.0.0a123
//               </Text>
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'center',
//                   marginBottom: 20,
//                 }}>
//                 <ImageIcon
//                   icon={Images.logo}
//                   iconStyle={{
//                     height: 30,
//                     width: 30,
//                     //   tintColor: 'grey',
//                   }}
//                 />
//                 <Text style={{fontSize: 20, color: '#c8c8c8'}}>
//                   JOIN ZERODA
//                 </Text>
//               </View>
//             </>
//           )}
//       </View>
//     );
//   };
//   return (
//     <View
//       style={{
//         width: width,
//         flex: 1,
//         backgroundColor: '#ebecee',
//         paddingTop: 20,
//       }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ebecee" />

//       <View
//         style={{
//           marginLeft: 20,
//           marginRight: 20,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <Text style={{fontSize: 30, fontWeight: 'bold'}}>Account</Text>
//         <ImageIcon
//           icon={Icons.arrow_down}
//           iconStyle={{
//             height: 30,
//             width: 25,
//           }}
//         />
//       </View>
//       <View
//         style={{
//           marginLeft: 20,
//           marginRight: 20,
//           marginTop: 25,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <Text style={{fontSize: 20}}>{UserData.name}</Text>
//         <ImageIcon
//           icon={Icons.notification}
//           iconStyle={{
//             height: 30,
//             width: 25,
//           }}
//         />
//       </View>
//       {/* <ScrollView> */}
//       <View
//         style={{
//           width: width,
//           flex: 1,
//           backgroundColor: '#ffffff',
//           borderTopRightRadius: 20,
//           borderTopLeftRadius: 20,
//           marginTop: 110,
//           paddingTop: 75,
//         }}>
//         {/* <FlashList */}
//         <FlatList data={tBody} renderItem={renderHeaderTitle} />
//       </View>

//       <View
//         style={{
//           position: 'absolute',
//           marginLeft: 20,
//         }}>
//         <View
//           style={{
//             width: viewWidth,
//             height: 140,
//             backgroundColor: '#ffffff',
//             borderRadius: 5,
//             shadowColor: '#171717',
//             shadowOffset: {width: -2, height: 4},
//             shadowOpacity: 0.2,
//             elevation: 15,
//             shadowRadius: 3,
//             padding: 20,
//             marginTop: 150,
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//           }}>
//           <View>
//             <Text style={{marginTop: 20, fontSize: 20, fontWeight: 'bold'}}>
//               {UserData.ID}
//             </Text>
//             <Text style={{marginTop: 5, fontSize: 14, color: '#b0b0b0'}}>
//               {UserData.email}
//             </Text>
//           </View>
//           <View
//             style={{
//               width: 100,
//               height: 100,
//               backgroundColor: '#e7f1fd',
//               borderRadius: 50,
//             }}></View>
//         </View>
//       </View>
//       {/* </ScrollView> */}
//     </View>
//   );
// };

// export default Account;

