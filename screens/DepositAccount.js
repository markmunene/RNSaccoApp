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

import {StoreDeposit} from './Actions/DepositAction';

// import RangeSlider from 'rn-range-slider';
import Slider from '@react-native-community/slider';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';

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
  const groupData = route.params;
  let user = useSelector(state => state.users.shortUserDetails);
  const [RangeValue, setRangeValue] = React.useState(0);
  const [MinimumLoan, setMinimumLoan] = React.useState(0);
  const [MaximumLoan, setMaximumLoan] = React.useState(300);
  const [selectedValue, setSelectedValue] = React.useState(0);
  const [AllDepositAccounts, setAllDepositAccounts] = React.useState(0);

  // console.log(groupData.item, 'groupData');

  const DepositData = [
    'individual',
    'jamboAccount',
    groupData?.item?.groupName,
  ];

  const HandleSubmit = async () => {
    const data = {
      amount: RangeValue,
      userId: user[0].id,
      accountType: selectedValue,
      Phone: user[0].Phone,
      Name: user[0].Name,
      date: Date.now(),
      depositMethod: 'mobile',
      groupId: groupData?.item?.id ? groupData?.item?.id : 'none',
      groupName: groupData?.item?.groupName
        ? groupData?.item?.groupName
        : 'none',
      status: 'pending',
    };
    dispatch(StoreDeposit({data}));
    navigation.goBack();
    alert('Deposit Successful');
  };

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
                      <Picker.Item
                        key={i}
                        label={category}
                        value={category}
                        style={{fontFamily: '600', fontSize: 18}}
                      />
                    );
                  })}
                </Picker>
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
