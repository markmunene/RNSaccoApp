import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import {HandleAuthPin} from './Actions/LoginAction';
import {email} from '../constants/icons';

const Login = ({navigation}) => {
  const [Pin, setPin] = React.useState('');
  const [PinError, setPinError] = React.useState('');
  const [userId, setuserId] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [UserForDisplay, setUserForDisplay] = React.useState('');
  const [password, setpassword] = React.useState('');
  const dispatch = useDispatch();
  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setuserId(user?.uid);
      setEmail(user?.email);
      setUserForDisplay(user?.email);
      setpassword(user?.password);
    });
  }, []);
  // console.log('userId', userId);

  const HandleLogin = async () => {
    if (Email != '' || password != '' || Pin != '') {
      auth()
        .signInWithEmailAndPassword(Email, password)
        .then(async user => {
          await firestore()
            .collection('users')
            .doc(user.user.uid)
            .get()
            .then(async doc => {
              if (doc.exists) {
                if (doc.data().Pin == Pin) {
                  setPin('');
                  let data = doc.data();
                  dispatch(HandleAuthPin({data}));
                  navigation.navigate('home');
                } else {
                  Alert.alert('Invalid Pin');
                  setPinError('Invalid Pin');
                }
              } else {
                Alert.alert('User not found');
                console.log('User does not exist');
                setPinError('Invalid Pin');
              }
            })
            .catch(error => {
              Alert.alert('Error', error.message);
            });
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    }
  };
  const HandlePinLogin = async () => {
    if (Pin != '') {
      await firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then(async doc => {
          if (doc.exists) {
            if (doc.data().Pin == Pin) {
              setPin('');
              let data = doc.data();
              dispatch(HandleAuthPin({data}));

              navigation.navigate('home');
            } else {
              Alert.alert('Invalid Pin');
              setPinError('Invalid Pin');
            }
          } else {
            Alert.alert('User not found');
            console.log('User does not exist');
            setPinError('Invalid Pin');
          }
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '25%',
          width: '100%',
        }}>
        <Text style={{...FONTS.h2, color: COLORS.secondary, marginBottom: 20}}>
          Welcome To Sky Star Sacco
        </Text>
        <Text style={{...FONTS.h2, color: COLORS.primary}}>
          {UserForDisplay}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            width: '100%',
            height: '75%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: SIZES.padding,
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              width: '95%',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
              margin: SIZES.padding,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',

                height: '60%',
              }}>
              {UserForDisplay == undefined ? (
                <>
                  <View
                    style={{
                      ...styles.fieldSet,
                      height: 40,
                      width: '90%',
                      padding: SIZES.padding,
                      borderColor: COLORS.lightGray,
                      borderWidth: 1,
                      flexDirection: 'row',
                      margin: SIZES.padding,
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}>
                    <Text style={styles.legend}>Email</Text>
                    <TextInput
                      value={Email}
                      onChangeText={text => setEmail(text)}
                      style={{
                        width: '90%',
                        height: 40,
                        alignSelf: 'center',
                        color: COLORS.lightGray,
                      }}
                    />
                    <Image
                      source={icons.email}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 40,
                        alignSelf: 'center',
                        tintColor: COLORS.lightGray,
                      }}
                    />
                  </View>
                  {/* password */}
                  <View
                    style={{
                      ...styles.fieldSet,
                      height: 40,
                      width: '90%',
                      padding: SIZES.padding,
                      borderColor: COLORS.lightGray,
                      borderWidth: 1,
                      flexDirection: 'row',
                      marginRight: SIZES.padding2,
                      alignSelf: 'center',
                      borderRadius: 10,
                    }}>
                    <Text style={styles.legend}>Password</Text>
                    <TextInput
                      value={password}
                      secureTextEntry={true}
                      onChangeText={text => setpassword(text)}
                      style={{
                        width: '90%',
                        height: 40,
                        alignSelf: 'center',
                        color: COLORS.lightGray,
                      }}
                    />
                    <Image
                      source={icons.password}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 40,
                        alignSelf: 'center',
                        tintColor: COLORS.lightGray,
                      }}
                    />
                  </View>
                </>
              ) : (
                <View></View>
              )}
              {/* Email */}

              <View
                style={{
                  ...styles.fieldSet,
                  height: 40,
                  width: '90%',
                  padding: SIZES.padding,
                  borderColor: COLORS.lightGray,
                  borderWidth: 1,
                  flexDirection: 'row',
                  marginRight: SIZES.padding2,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}>
                <Text style={styles.legend}>Pin</Text>
                <TextInput
                  secureTextEntry={true}
                  keyboardType="numeric"
                  value={Pin}
                  placeholderTextColor={COLORS.white}
                  onChangeText={text => setPin(text)}
                  style={{
                    width: '90%',
                    height: 40,
                    alignSelf: 'center',
                    color: COLORS.lightGray,
                  }}
                />
                <Image
                  source={icons.password}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 40,
                    alignSelf: 'center',
                    tintColor: COLORS.lightGray,
                  }}
                />
              </View>
            </View>
            {/* <View style={{width: '100%', justifyContent: 'flex-end'}}> */}
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.white,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 2,
                marginBottom: SIZES.padding,
                textAlign: 'center',
                position: 'absolute',
                bottom: 0,

                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              forgot pin?
            </Text>
            {/* </View> */}
          </View>

          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                UserForDisplay == undefined ? HandleLogin() : HandlePinLogin()
              }
              style={{
                backgroundColor: COLORS.secondary,
                borderRadius: 10,
                marginTop: SIZES.padding,
                justifyContent: 'center',
                alignItems: 'center',
                width: '95%',
                padding: SIZES.padding,
                elevation: 5,
              }}>
              <Text style={{...FONTS.h2, color: COLORS.white}}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: COLORS.lightGray,
  },
  legend: {
    position: 'absolute',
    top: -12,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: COLORS.primary,
    color: COLORS.lightGray,
    borderRadius: 2,
  },
});
