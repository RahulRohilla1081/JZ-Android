import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import Icons from '../../../constants/Icons';
import ImageIcon from '../../../components/ImageIcon/ImageIcon';
// import Separator from '../../../components/Separator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
// import {Modal} from 'react-native-paper';
// import {COLORS} from '../../utils/Theme/Theme';
// import {Modal} from '../../../components/Modal.tsx';
import {color} from '@rneui/base';
// import {COLORS} from '../../../Theme/Theme';
import Separator from '../../../components/Separator/Separator';
import { COLORS } from '../../utils/Theme/Theme';
import { Modal } from '../../../components/ProfileModal/Modal';
import IconButton from '../../../components/IconButton/IconButton';
import { ACCOUNT_DETAILS } from '../../utils/Routes/Routes';

const Profile = (props) => {
  const {width} = useWindowDimensions();

  const [activeSessionFlag, setActiveSessionFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeSessions, setActiveSessions] = useState([
    {key: 1, value: 'Kite Android'},
    {key: 2, value: 'Kite'},
  ]);
  const [UserData, setUserData] = useState({
    name: 'Sakshi',
    ID: 'LJS128',
    email: 'sakshisingh064@gmail.com',
    phone: '1234567890',
  });
  const profile = UserData.name.slice(0, 2);
  //   const modalRef = useClickOutside < View > (() => setShowModal(false));

  return (
    <SafeAreaProvider>
      <View
        style={{
          width: width,
          flex: 1,
          backgroundColor: '#fff',
          paddingTop: 20,
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={showModal ? '#4d4d4d' : '#fff'}
        />
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
                onPress={()=>{
props.navigation.navigate(ACCOUNT_DETAILS)
                }}
              />
            {/* </TouchableOpacity> */}
            {/* <Text style={{fontSize: 20}}>Profile</Text> */}
            <Text style={{fontSize: 18, color: '#434250', fontWeight: 'bold'}}>
              Profile
            </Text>
            <View style={{width: 30}}></View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 25, fontWeight: 'normal'}}>
                {UserData.name}
              </Text>
              <Text style={styles.grayText}>{UserData.ID}</Text>
            </View>
            <View
              style={{
                marginTop: 0,
                width: 80,
                height: 80,
                backgroundColor: '#e6f0fd',
                borderRadius: 50,
                padding: 20,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 30, color: '#a4c4f6'}}>{profile}</Text>
              <View
                style={{
                  marginTop: -5,
                  marginLeft: 50,
                  alignItems: 'center',
                }}>
                <ImageIcon
                  icon={Icons.pen}
                  iconStyle={{
                    height: 25,
                    width: 30,
                  }}
                />
              </View>
            </View>
          </View>
          <Separator />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 25,
            }}>
            <Text style={styles.grayText}>Password & Security</Text>
            <TouchableOpacity>
              <Text style={styles.blueText}>Manage</Text>
            </TouchableOpacity>
          </View>
          <Separator />
          <View style={styles.containerOuter}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text style={styles.grayText}>Support code</Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <ImageIcon
                  icon={Icons.donut_chart}
                  iconStyle={{
                    height: 25,
                    width: 15,
                  }}
                />
                <Text style={styles.blueText}> View</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text style={styles.grayText}>E-mail</Text>

              <Text style={{fontSize: 16}}> {UserData.email}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text style={styles.grayText}>Phone</Text>

              <Text style={{fontSize: 16}}> {UserData.phone}</Text>
            </View>

            <TouchableOpacity style={{paddingVertical: 10}}>
              <Text style={styles.blueText}>Manage Account</Text>
            </TouchableOpacity>
          </View>
          <Separator />
          <View style={styles.containerOuter}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <Text style={styles.grayText}>Segments</Text>

              <Text style={styles.blueText}> BSE, NSE</Text>
            </View>
          </View>
          <Separator />
          {!activeSessionFlag && (
            <TouchableOpacity
              style={styles.containerOuter}
              onPress={() => setActiveSessionFlag(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}>
                <Text style={styles.blueText}>View active sessions</Text>
                <ImageIcon
                  icon={Icons.arrow_down}
                  iconStyle={{
                    height: 20,
                    width: 15,
                    tintColor: COLORS.primary,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          {activeSessionFlag && (
            <>
              <View style={{paddingTop: 25, paddingHorizontal: 25}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                  }}>
                  <Text style={styles.grayText}>Active sessions</Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.blueText}
                      onPress={() => setShowModal(true)}>
                      Clear sessions
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{paddingHorizontal: 25, paddingBottom: 25}}>
                {activeSessions.map(val => {
                  return (
                    <View
                      key={val.key}
                      style={{
                        // paddingTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                          marginRight: 20,
                          height: 5,
                          width: 5,
                          backgroundColor: 'black',
                          borderRadius: 50,
                        }}
                      />
                      <Text style={{fontSize: 16}}>{val.value}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          <Separator />
          <View style={styles.containerOuter}>
            <View
              style={{
                paddingVertical: 5,
              }}>
              <Text style={{fontSize: 16}}>Account closure</Text>
              <Text style={{color: COLORS.gray, marginTop: 10}}>
                Account closure is permanent and irreversible. Please read{' '}
                <Text style={{color: COLORS.primary}} onPress={() => {}}>
                  this
                </Text>{' '}
                before proceeding
              </Text>
              <TouchableOpacity>
                <Text style={[styles.blueText, {marginTop: 15}]}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <View>
        <Modal
          isVisible={showModal}
          onBackdropPress={() => setShowModal(false)}>
          <Modal.Container>
            {/* <Modal.Header title="this app is fab!" /> */}
            <Modal.Body>
              <Text
                style={{fontSize: 15, paddingTop: 20, color: COLORS.gray60}}>
                Logout from here and all other sessions?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 40,
                  justifyContent: 'flex-end',
                  marginHorizontal: 5,
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    // fontWeight: 'bold',
                    color: COLORS.primary,
                    marginRight: 30,
                  }}
                  onPress={() => setShowModal(false)}>
                  Cancel
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    //  fontWeight: 'bold',
                    color: '#d44945',
                  }}
                  onPress={() => {
                    setActiveSessionFlag(false);
                    setShowModal(false);
                  }}>
                  Logout
                </Text>
              </View>
            </Modal.Body>
            {/* <Modal.Footer></Modal.Footer> */}
          </Modal.Container>
        </Modal>
      </View>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  containerOuter: {paddingHorizontal: 25, paddingVertical: 25},
  grayText: {
    fontSize: 16,
    color: COLORS.gray20,
  },
  blueText: {fontSize: 16, color: COLORS.primary},
});

export default Profile;
