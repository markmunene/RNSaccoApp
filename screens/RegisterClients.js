import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {useDispatch, useSelector} from 'react-redux';

import {
  UpdateUser,
  AddnewUser,
  RegisteredUsers,
} from './Actions/RegisteredUsers';

import SendSMS from 'react-native-sms';
import {pin} from '../constants/icons';

const RegisterClients = ({navigation, route}) => {
  let admin = useSelector(state => state.users.AllAdmins);
  console.log(admin);

  const user = route.params;
  const [Name, setName] = React.useState('');
  const [FirstName, setFirstName] = React.useState('');
  const [DOB, setDOB] = React.useState('');
  const [MaritalStatus, setMaritalStatus] = React.useState('');
  const [Pin, setPin] = React.useState('');
  const [Location, setLocation] = React.useState('');
  const [SubLocation, setSubLocation] = React.useState('');
  const [County, setCounty] = React.useState('');
  const [District, setDistrict] = React.useState('');
  const [Division, setDivision] = React.useState('');
  const [SubCounty, setSubCounty] = React.useState('');
  const [Village, setVillage] = React.useState('');
  const [BusinessLocation, setBusinessLocation] = React.useState('');
  const [BusinessName, setBusinessName] = React.useState('');
  const [Estate, setEstate] = React.useState('');
  const [PhaseSection, setPhaseSection] = React.useState('');
  const [KFirstName, setKFirstName] = React.useState('');
  const [KOtherNames, setKOtherNames] = React.useState('');
  const [KLastName, setKLastName] = React.useState('');
  const [kPhoneNumber, setkPhoneNumber] = React.useState('');
  const [kAddress, setkAddress] = React.useState('');
  const [RegAmount, setRegAmount] = React.useState('');
  const [RecieptNo, setRecieptNo] = React.useState('');
  const [KRelation, setKRelation] = React.useState('');
  const [Phone, setPhone] = React.useState('');
  const [Email, setEmail] = React.useState('');
  const [IdNo, setIdNo] = React.useState('');
  const [BusinessAddress, setBusinessAddress] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [IntroducedBy, setIntroducedBy] = React.useState('');
  const [registeredBy, setregisteredBy] = React.useState('');

  React.useEffect(() => {
    if (user != undefined) {
      let userData = user?.item;
      setName(userData?.Name);
      setFirstName(userData?.FirstName);
      setDOB(userData?.DOB);
      setMaritalStatus(userData?.MaritalStatus);
      setPin(userData?.Pin);
      setLocation(userData?.Location);
      setSubLocation(userData?.SubLocation);
      setCounty(userData?.County);
      setDistrict(userData?.District);
      setDivision(userData?.Division);
      setSubCounty(userData?.SubCounty);
      setVillage(userData?.Village);
      setBusinessLocation(userData?.BusinessLocation);
      setBusinessName(userData?.BusinessName);
      setEstate(userData?.Estate);
      setPhaseSection(userData?.PhaseSection);
      setKFirstName(userData?.KFirstName);
      setKOtherNames(userData?.KOtherNames);

      setkPhoneNumber(userData?.kPhoneNumber);
      setkAddress(userData?.kAddress);
      setRegAmount(userData?.RegAmount);
      setRecieptNo(userData?.RecieptNo);
      setKRelation(userData?.KRelation);
      setPhone(userData?.Phone);
      setEmail(userData?.Email);
      setIdNo(userData?.IdNo);
      setBusinessAddress(userData?.BusinessAddress);
      setpassword(userData?.password);
      setIntroducedBy(userData?.IntroducedBy);
      setregisteredBy(userData?.registeredBy);
    }
  }, []);
  const dispatch = useDispatch();
  const formatNumber = number => {
    if (number.length <= 12) {
      let num = number.toString();
      let results = '';
      if (num.charAt(0) == '0') {
        results = num.replace(/[^a-zA-Z0-9+]/g, '').substr(1);
        results = `254${results}`;
      } else if (num.charAt(0) == '2') {
        results = number;
      } else {
        results = `254${number}`;
      }
      // console.log(results);
      setPhone(results);
    } else {
      alert('Invalid phone number');
    }
  };

  async function HandleSubmit() {
    // save users data in firebase

    try {
      if (
        Name !== '' &&
        Pin !== '' &&
        Phone !== '' &&
        Email !== '' &&
        IdNo !== '' &&
        BusinessAddress !== ''
      ) {
        if (user != undefined) {
          // update users collection
          let data = {
            id: user.item.id,
            Name,
            FirstName,
            DOB,
            MaritalStatus,
            Pin,
            Location,
            SubLocation,
            County,
            District,
            Division,
            SubCounty,
            Village,
            BusinessLocation,
            Estate,
            PhaseSection,
            KFirstName,
            KOtherNames,
            kPhoneNumber,
            kAddress,
            RegAmount,
            RecieptNo,
            KRelation,
            Phone,
            Email,
            IdNo,
            BusinessAddress,
            isadmin: admin.length > 0 ? true : false,
          };
          dispatch(
            UpdateUser({
              ...data,
            }),
          );
          await firestore()
            .collection('users')
            .doc(user.item.id)
            .update({
              ...data,
            })
            .then(() => {
              navigation.goBack();
              dispatch(RegisteredUsers());
              // console.log('user updated');
              alert('user updated');
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          await auth()
            .createUserWithEmailAndPassword(Email, password)
            .then(async user => {
              let userData = {
                id: user.user.uid,
                FirstName,
                Name,
                DOB,
                MaritalStatus,
                Location,
                SubLocation,
                County,
                District,
                Division,
                SubCounty,
                Village,
                BusinessLocation,
                PhaseSection,
                Estate,
                KFirstName,
                KOtherNames,
                KRelation,
                kAddress,
                kPhoneNumber,
                RegAmount,
                RecieptNo,
                Pin,
                password,
                Phone,
                Email,
                IdNo,
                BusinessAddress,
                IntroducedBy,
                registeredBy,
                isadmin: false,
                date: Date.now(),
              };
              await firestore()
                .collection('users')
                .doc(user.user.uid)
                .set({
                  ...userData,
                })
                .then(() => {
                  alert('Member Registered successively');
                  SendSMS.send(
                    {
                      body: `You have been sucessively Registered to sky star sacco.Your email :${Email} password : ${password} pin : ${pin}.use These details to login to our app coming soon. Registered By : ${registeredBy}`,
                      recipients: [Phone],
                      successTypes: ['sent', 'queued'],
                      allowAndroidSendWithoutReadPermission: true,
                    },
                    (completed, cancelled, error) => {
                      alert(
                        'SMS Callback: completed: ' +
                          completed +
                          ' cancelled: ' +
                          cancelled +
                          'error: ' +
                          error,
                      );
                      console.log(
                        'SMS Callback: completed: ' +
                          completed +
                          ' cancelled: ' +
                          cancelled +
                          'error: ' +
                          error,
                      );
                    },
                  );
                  navigation.goBack();

                  dispatch(RegisteredUsers({userData}));
                  auth().signInWithEmailAndPassword(
                    admin[0]?.Email,
                    admin[0]?.password,
                  );
                  // navigation.navigate('login');
                })
                .catch(error => {
                  alert(error);
                  // console.log(error);
                });
            })
            .catch(error => {
              alert(error.message);
              console.log(error);
            });
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 150,
          padding: SIZES.padding,
          justifyContent: 'center',
          alignItems: 'center',
          margin: SIZES.padding2,
        }}>
        <Text style={{...FONTS.h1, color: COLORS.primary}}>
          Register Clients
        </Text>
        <Image
          source={icons.user}
          resizeMode="contain"
          style={{width: 130, height: 130, tintColor: COLORS.primary}}
        />
      </View>
      <ScrollView>
        {/* names */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>FirstName</Text>

            <TextInput
              value={FirstName}
              onChangeText={text => setFirstName(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              marginRight: SIZES.padding2,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Other Names</Text>
            <TextInput
              value={Name}
              onChangeText={text => setName(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {/* phone number */}
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Mpesa PhoneNumber</Text>
            <TextInput
              keyboardType="number-pad"
              value={Phone}
              onChangeText={text => formatNumber(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          {/* id number */}
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              marginRight: SIZES.padding2,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>ID</Text>
            <TextInput
              keyboardType="number-pad"
              value={IdNo}
              onChangeText={text => setIdNo(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        {/* DOB and marital status */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>DOB</Text>
            <TextInput
              value={DOB}
              onChangeText={text => setDOB(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              marginRight: SIZES.padding2,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Marital status</Text>
            <TextInput
              value={MaritalStatus}
              onChangeText={text => setMaritalStatus(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>

        {/* address */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {/* business address */}
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Business Name</Text>
            <TextInput
              value={BusinessAddress}
              onChangeText={text => setBusinessAddress(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              marginRight: SIZES.padding2,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Business Location</Text>
            <TextInput
              value={BusinessLocation}
              onChangeText={text => setBusinessLocation(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>

        {/* address  */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>County</Text>
            <TextInput
              value={County}
              onChangeText={text => setCounty(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Sub County</Text>
            <TextInput
              value={SubCounty}
              onChangeText={text => setSubCounty(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>

        {/* address  */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>District</Text>
            <TextInput
              value={District}
              onChangeText={text => setDistrict(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Division</Text>
            <TextInput
              value={Division}
              onChangeText={text => setDivision(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        {/* address  */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Location</Text>
            <TextInput
              value={Location}
              onChangeText={text => setLocation(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Sub Location</Text>
            <TextInput
              value={SubLocation}
              onChangeText={text => setSubLocation(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.fieldSet,
            height: 40,
            width: '90%',

            padding: SIZES.padding,
            borderColor: COLORS.primary,
            borderWidth: 1,
            flexDirection: 'row',
            margin: SIZES.padding,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.legend}>Village</Text>
          <TextInput
            value={Village}
            onChangeText={text => setVillage(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
        </View>
        {/* address  */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Phase/Section</Text>
            <TextInput
              value={PhaseSection}
              onChangeText={text => setPhaseSection(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Estate</Text>
            <TextInput
              value={Estate}
              onChangeText={text => setEstate(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        <Text style={{...FONTS.h4, textAlign: 'center', color: COLORS.primary}}>
          Next Keen Info
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>First Name</Text>
            <TextInput
              value={KFirstName}
              onChangeText={text => setKFirstName(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              marginRight: SIZES.padding2,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Other Name</Text>
            <TextInput
              value={KOtherNames}
              onChangeText={text => setKOtherNames(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',

              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Relation</Text>
            <TextInput
              value={KRelation}
              onChangeText={text => setKRelation(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              marginRight: SIZES.padding2,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Address</Text>
            <TextInput
              value={kAddress}
              onChangeText={text => setkAddress(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        {/* Next of keen Phone Number */}
        <View
          style={{
            ...styles.fieldSet,
            height: 40,
            width: '90%',
            padding: SIZES.padding,
            borderColor: COLORS.primary,
            borderWidth: 1,
            flexDirection: 'row',
            margin: SIZES.padding,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.legend}>phone 7...(no 07)</Text>
          <TextInput
            value={kPhoneNumber}
            onChangeText={text => setkPhoneNumber(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
        </View>

        <Text style={{...FONTS.h4, textAlign: 'center', color: COLORS.primary}}>
          Amount Paid during Reg
        </Text>
        {/* Reg Amount */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Amount</Text>
            <TextInput
              keyboardType="numeric"
              value={RegAmount}
              onChangeText={text => setRegAmount(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>RecieptNo</Text>
            <TextInput
              keyboardType="numeric"
              value={RecieptNo}
              onChangeText={text => setRecieptNo(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
          </View>
        </View>
        <Text style={{...FONTS.h4, textAlign: 'center', color: COLORS.primary}}>
          Authorization Information
        </Text>
        {/* Email */}
        <View
          style={{
            ...styles.fieldSet,
            height: 40,
            width: '90%',
            padding: SIZES.padding,
            borderColor: COLORS.primary,
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
              color: COLORS.primary,
            }}
          />
          <Image
            source={icons.email}
            resizeMode="contain"
            style={{
              width: 20,
              height: 40,
              alignSelf: 'center',
              tintColor: COLORS.primary,
            }}
          />
        </View>

        {/* pins */}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {/* pin */}
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Pin</Text>
            <TextInput
              keyboardType="number-pad"
              value={Pin}
              onChangeText={text => setPin(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
            <Image
              source={icons.pin}
              resizeMode="contain"
              style={{
                width: 20,
                height: 40,
                alignSelf: 'center',
                tintColor: COLORS.primary,
              }}
            />
          </View>
          {/* password */}
          <View
            style={{
              ...styles.fieldSet,
              height: 40,
              width: '45%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              marginRight: SIZES.padding2,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text style={styles.legend}>Password</Text>
            <TextInput
              value={password}
              onChangeText={text => setpassword(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
            <Image
              source={icons.password}
              resizeMode="contain"
              style={{
                width: 20,
                height: 40,
                alignSelf: 'center',
                tintColor: COLORS.primary,
              }}
            />
          </View>
        </View>
        {/* registered by */}
        <View
          style={{
            ...styles.fieldSet,
            height: 40,
            width: '90%',
            padding: SIZES.padding,
            borderColor: COLORS.primary,
            borderWidth: 1,
            flexDirection: 'row',
            margin: SIZES.padding,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.legend}>Registered By</Text>
          <TextInput
            value={registeredBy}
            onChangeText={text => setregisteredBy(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
        </View>
        {/* Email */}
        <View
          style={{
            ...styles.fieldSet,
            height: 40,
            width: '90%',
            padding: SIZES.padding,
            borderColor: COLORS.primary,
            borderWidth: 1,
            flexDirection: 'row',
            margin: SIZES.padding,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.legend}>IntroducedBy</Text>
          <TextInput
            value={IntroducedBy}
            onChangeText={text => setIntroducedBy(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
        </View>
        {/* others */}
        <TouchableOpacity
          onPress={() => HandleSubmit()}
          style={{
            alignSelf: 'center',
            width: '90%',
            backgroundColor: COLORS.secondary,
            padding: SIZES.padding2,
            borderRadius: 10,
            elevation: 5,
          }}>
          <Text style={{...FONTS.h2, color: COLORS.white, textAlign: 'center'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterClients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#000',
  },
  legend: {
    position: 'absolute',
    top: -12,
    left: 10,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    color: COLORS.primary,
    borderRadius: 2,
  },
});
