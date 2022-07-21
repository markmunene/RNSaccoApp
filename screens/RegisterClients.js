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
import {useDispatch} from 'react-redux';

import {UpdateUser, AddnewUser} from './Actions/RegisteredUsers';

const RegisterClients = ({navigation, route}) => {
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
  const [Village, setVillage] = React.useState('nduuri');
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
    }
  }, []);
  const dispatch = useDispatch();

  async function HandleSubmit() {
    // save users data in firebase
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
        dispatch(
          UpdateUser({
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
          }),
        );
        await firestore()
          .collection('users')
          .doc(user.item.id)
          .update({
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
            IntroducedBy,
            registeredBy,
            BusinessAddress,
          })
          .then(() => {
            navigation.goBack();
            // console.log('user updated');
            alert('user updated');
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        await auth()
          .createUserWithEmailAndPassword(Email, password)
          .then(async user =>
          {
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
                Phone,
                Email,
                IdNo,
                BusinessAddress,
                IntroducedBy,
                registeredBy,
                date: Date.now(),
            }
            await firestore()
              .collection('users')
              .doc(user.user.uid)
              .set({
                ...userData,
              })
              .then(() =>
              {
                dispatch(AddUser({userData}));
                navigation.navigate('login');
              })
              .catch(error => {
                alert(error);
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      }
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
            <Text style={styles.legend}>phone </Text>
            <TextInput
             
              keyboardType="number-pad"
              value={Phone}
              onChangeText={text => setPhone(text)}
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
          <Text style={styles.legend}>Phone Number</Text>
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
    borderRadius:2,
  },
});
