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

import firestore from '@react-native-firebase/firestore';

// import RangeSlider from 'rn-range-slider';
import Slider from '@react-native-community/slider';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';

import {storeWithdrawRequest} from './Actions/WithdrawAction';

function RenderHeader({navigation}) {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        padding: SIZES.padding,
      }}>
      <TouchableOpacity
        style={{width: '20%'}}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{width: 30, height: 30, tintColor: COLORS.primary}}
        />
      </TouchableOpacity>
      <Text
        style={{
          ...FONTS.h3,
          width: '60%',
          padding: 0,
          textAlign: 'center',
          marginRight: SIZES.padding,
          color: COLORS.primary,
        }}>
        Withdraw Request
      </Text>
    </View>
  );
}
// render a title
const WithdrawRequest = ({navigation}) => {
  const [RangeValue, setRangeValue] = React.useState(0);
  const [MinimumLoan, setMinimumLoan] = React.useState(0);
  const [MaximumLoan, setMaximumLoan] = React.useState(100000);
  const [selectedValue, setSelectedValue] = React.useState(0);

  const DepositData = ['individual', 'jambo account', 'Joint', 'group'];

  const user = useSelector(state => state.users.shortUserDetails);
  const dispatch = useDispatch();

  const handleWithRequest = async () => {
    // console.log(user);
    let data = {
      userId: user[0].id,
      userName: user[0].Name,
      phoneNumber: user[0].Phone,
      amount: RangeValue,
      AccountType: selectedValue,
      status: 'pending',

      date: Date.now(),
    };
    dispatch(storeWithdrawRequest({data}));

    alert('Withdraw Request Successful');
    setRangeValue(0);
    setSelectedValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader navigation={navigation} />

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
                Kes {RangeValue}
              </Text>
            </View>
          </View>
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
                ...FONTS.h2,
                textAlign: 'center',
                padding: 0,
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
            <Text style={{...FONTS.h3, color: COLORS.primary}}>
              Kes {MinimumLoan}
            </Text>
            <Text style={{...FONTS.h3, color: COLORS.primary}}>
              Kes {MaximumLoan}
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
                  ...FONTS.h3,
                  color: COLORS.primary,
                  marginTop: SIZES.padding / 0.7,
                }}>
                Select Account
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '50%',
                  flexDirection: 'row',
                  marginTop: SIZES.padding2 * 1.5,
                }}>
                <Picker
                  selectedValue={selectedValue}
                  style={{height: 50, width: '80%', fontSize: 18}}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                  }}>
                  <Picker.Item label="Select Account" value="all" />
                  {DepositData?.map((category, i) => {
                    return (
                      <Picker.Item key={i} label={category} value={category} />
                    );
                  })}
                </Picker>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => handleWithRequest()}
            style={{
              backgroundColor: COLORS.primary,
              width: '90%',
              height: 60,
              // marginTop: SIZES.padding2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              alignSelf: 'center',
              elevation: 3,
            }}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              Submit Request
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(WithdrawRequest);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
