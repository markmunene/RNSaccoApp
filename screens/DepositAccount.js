import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

import {StoreDeposit} from './Actions/DepositAction';
import ModalFilterPicker from 'react-native-modal-filter-picker';

// import RangeSlider from 'rn-range-slider';
import Slider from '@react-native-community/slider';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function RenderHeader({navigation}) {
  return (
    <TouchableOpacity
      style={{height: 50, width: 200}}
      onPress={() => navigation.goBack()}>
      <Image
        source={icons.back}
        style={{
          height: 30,
          width: 30,
          tintColor: COLORS.primary,
          margin: SIZES.padding,
          padding: SIZES.padding,
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
// render a title
const RenderTitle = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: '100%',
      }}>
      <Text style={{...FONTS.h3, color: COLORS.primary}}>
        Select Deposit Amount
      </Text>
    </View>
  );
};

const DepositAccount = ({navigation, route}) => {
  const dispatch = useDispatch();
  const deposit = useSelector(state => state.deposit.deposit);

  React.useEffect(() => {
    if (route.params?.item) {
      setSelectedValue(route?.params?.item.groupName);
    }
  }, [route.params]);
  console.log(selectedValue);

  const groupData = route.params;
  const [RangeValue, setRangeValue] = React.useState(0);
  const [MinimumLoan, setMinimumLoan] = React.useState(0);
  const [MaximumLoan, setMaximumLoan] = React.useState(300000);
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [AccountBalance, setAccountBalance] = React.useState(0);
  const [AllDepositAccounts, setAllDepositAccounts] = React.useState(0);
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [SelectedUserId, setSelectedUserId] = React.useState('');
  let user = useSelector(state => state.users.AllusersMinData);
  let options = useSelector(state => state.users.userDataforModal);
  const AccountBalance1 = useSelector(state => state.deposit.depositBalance);

  const onSearch = text => {
    setSelectedUserId(text);

    setModalVisible(false);
  };
  //  <ModalFilterPicker
  //    visible={ModalVisible}
  //    onSelect={value => onSearch(value)}
  //    onCancel={() => setModalVisible(false)}
  //    options={options}
  //  />;
  // <TouchableOpacity
  //   onPress={() => setModalVisible(!ModalVisible)}
  //   style={{
  //     width: 80,
  //     height: 40,
  //     marginTop: 10,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderRadius: 10,
  //     backgroundColor: COLORS.darkgray,
  //   }}>
  //   <Text
  //     style={{
  //       ...FONTS.body4,
  //       color: COLORS.black,
  //       textAlign: 'center',
  //     }}>
  //     select User
  //   </Text>
  // </TouchableOpacity>
  //  <Text
  //    style={{
  //      ...FONTS.h4,
  //      color: COLORS.primary,
  //      marginTop: SIZES.padding / 0.7,
  //    }}>
  //    {SelectedUserId.label}
  //  </Text>
  // console.log(options, 'groupData');

  const DepositData = [
    'individual',
    'jamboAccount',
    groupData?.item?.groupName,
  ];
  React.useEffect(() => {
    let tempBalance = AccountBalance1.filter(bal => {
      if (bal.id == SelectedUserId.key + selectedValue) {
        return bal;
      }
    });
    // console.log(tempBalance, 'tempBalaneeeeeeeeeeeeeeeeeeeeece');

    setAccountBalance(tempBalance);
    // console.log(tempBalance);
  }, [selectedValue, SelectedUserId]);

  const HandleSubmit = async () => {
    let filteredUser = user.filter(item => item.id === SelectedUserId.key);
    const data = {
      collection: 'deposits',
      amount: RangeValue,
      userId: filteredUser[0].id,
      accountType: selectedValue,
      PhoneNumber: filteredUser[0].PhoneNumber,
      Name: filteredUser[0].Name,
      date: Date.now(),
      balance:
        AccountBalance.length > 0
          ? Number(AccountBalance[0].balance) + Number(RangeValue)
          : Number(RangeValue),
      depositMethod: 'mobile',
      groupId: groupData?.item?.id ? groupData?.item?.id : 'none',
      groupName: groupData?.item?.groupName
        ? groupData?.item?.groupName
        : 'none',
      status: 'pending',
    };

    if (groupData?.item?.groupName) {
      let tempBalance2 = AccountBalance1.filter(bal => {
        if (bal.id == groupData?.item?.id + groupData?.item?.groupName) {
          return bal;
        }
      });

      // Update accounts collection
      if (SelectedUserId) {
        // console.log(data, 'data');
        await firestore()
          .collection('Accounts')
          .doc(groupData?.item?.id + groupData?.item?.groupName)
          .set({
            date: Date.now(),
            userId: filteredUser[0].id,
            balance:
              tempBalance2.length > 0
                ? Number(tempBalance2[0].balance) + Number(RangeValue)
                : Number(RangeValue),
            accountType: groupData?.item.groupName,
          })
          .catch(error => {
            console.log(error);
          });
        await firestore()
          .collection('deposits')
          .add({...data})
          .then(() => {
            alert('deposit added');
            console.log('deposit added');
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else {
      if (SelectedUserId) {
        axios
          .post(
            'https://us-central1-saccomgapp.cloudfunctions.net/main/lipaNaMpesaOnline',
            {...data},
          )
          .then(async res => {
            dispatch(StoreDeposit({data}));
            navigation.goBack();
            alert('Deposit Successful');
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        alert('Please Select User');
      }
    }
  };
  // const accounts = firestore().collection('Accounts');

  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader navigation={navigation} />
      <RenderTitle />

      <View style={{height: '85%', marginTop: 0}}>
        <View style={{width: '100%'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginBottom: SIZES.padding2 * 3,
            }}>
            <View
              style={{
                width: '90%',
                height: 60,
                borderRadius: 5,
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: SIZES.padding2,
              }}>
              <Text style={{...FONTS.h2, color: 'white'}}>
                Ksh {RangeValue}
              </Text>
            </View>
          </View>
          <ModalFilterPicker
            visible={ModalVisible}
            onSelect={value => onSearch(value)}
            onCancel={() => setModalVisible(false)}
            options={options}
          />
          <View
            style={{
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
            <TextInput
              placeholderTextColor={COLORS.primary}
              placeholder="Amount"
              value={RangeValue}
              keyboardType="numeric"
              onChangeText={text => setRangeValue(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                ...FONTS.h3,
                textAlign: 'center',
                color: COLORS.primary,
              }}
            />
            <Image
              source={icons.money}
              resizeMode="contain"
              style={{
                width: 20,
                height: 40,
                alignSelf: 'center',
                tintColor: COLORS.primary,
              }}
            />
          </View>
          <View
            style={{
              width: '90%',
              height: 40,
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginLeft: SIZES.padding2,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.primary}}>
              ksh {MinimumLoan}
            </Text>
            <Text style={{...FONTS.h4, color: COLORS.primary}}>
              ksh {MaximumLoan}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '47%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: SIZES.padding2,
            }}>
            <View
              style={{
                borderRadius: 20,
                backgroundColor: COLORS.white,
                width: '90%',
                height: '80%',
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.primary,
                  marginTop: SIZES.padding / 0.7,
                }}>
                Select Deposit Account
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.primary,
                  marginTop: SIZES.padding / 0.7,
                }}>
                {SelectedUserId.label}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(!ModalVisible)}
                style={{
                  width: 80,
                  height: 40,
                  marginTop: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: COLORS.darkgray,
                }}>
                <Text
                  style={{
                    ...FONTS.body4,
                    color: COLORS.black,
                    textAlign: 'center',
                  }}>
                  select User
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '50%',
                  flexDirection: 'row',
                  marginTop: SIZES.padding2 * 0.5,
                }}>
                {groupData?.item?.groupName == undefined ? (
                  <Picker
                    selectedValue={selectedValue}
                    style={{height: 40, width: '80%', fontSize: 18}}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedValue(itemValue);
                    }}>
                    <Picker.Item label="Select Account" value="all" />
                    {DepositData?.map((category, i) => {
                      return (
                        <Picker.Item
                          key={i}
                          label={category}
                          value={category}
                          style={{fontFamily: '600', fontSize: 18}}
                        />
                      );
                    })}
                  </Picker>
                ) : (
                  <Text style={{...FONTS.body1, color: COLORS.primary}}>
                    {groupData?.item?.groupName}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => HandleSubmit()}
            style={{
              backgroundColor: COLORS.secondary,
              width: '90%',
              height: 60,
              // marginTop: SIZES.padding2,
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: 20,
              alignSelf: 'center',
              elevation: 3,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}> Deposit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(DepositAccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
