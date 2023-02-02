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

// import RangeSlider from 'rn-range-slider';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import {UpDate_WithdrawRequest} from './Actions/WithdrawAction';
import {addLoanPayment} from './Actions/LoanRequestAction';

import {
  HandleWithdrawal,
  Delete_WithdrawRequest,
} from './Actions/DepositAction';

function RenderHeader({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: SIZES.padding,
      }}>
      <TouchableOpacity
        style={{height: 50, width: '20%'}}
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{...FONTS.h3, color: COLORS.primary, alignSelf: 'center'}}>
          Withdrawal
        </Text>
      </View>
    </View>
  );
}
// render a title

const HandleWithDrawals = ({navigation, route}) => {
  const dispatch = useDispatch();
  const withdrawalData = route.params;
  const [RangeValue, setRangeValue] = React.useState(0);

  const [selectedValue, setSelectedValue] = React.useState(0);
  //   const DepositData = ['individual', 'jambo account', 'Joint', 'group'];

  const AccountBalance = useSelector(state => state.deposit.depositBalance);
  const [AccountBalanceData1, setAccountBalanceData1] = React.useState([]);
  React.useEffect(() => {
    // let AccountBalanceData = [];

    if (withdrawalData.item?.groupId != 'null') {
      // console.log('groupId', withdrawalData.item?.groupId);
      let tempwithdrawalId =
        withdrawalData.item.groupId + withdrawalData.item.AccountType;
      let tempAccountBalance = AccountBalance.filter(item => {
        if (item.id == tempwithdrawalId) {
          return item;
        }
      });
      setRangeValue(withdrawalData?.item?.amount);
      // console.log(tempAccountBalance[0]?.balance, 'tempAccountBalance');
      setAccountBalanceData1(tempAccountBalance);
    } else {
      let tempAccountBalance = AccountBalance.filter(item => {
        if (
          item.AccountType == withdrawalData.item.AccountType &&
          item.userId == withdrawalData.item.userId
        ) {
          return item;
        }
      });
      setRangeValue(withdrawalData?.item?.amount);
      // console.log(tempAccountBalance[0]?.balance, 'tempAccountBalance');
      setAccountBalanceData1(tempAccountBalance);
    }
  }, [withdrawalData?.item?.amount]);

  const HandleLoanPayment = async () => {
    // let withdrawData = {
    //   ...withdrawalData.item,
    //   status: 'approved',
    // };
    // console.log(withdrawData, 'AccountBalanceData1');
    // dispatch(Delete_WithdrawRequest({id: withdrawalData.item.id}));
    if (RangeValue > 0) {
      dispatch(
        HandleWithdrawal({
          id: withdrawalData.item.id,
          balance: Number(AccountBalanceData1[0].balance) - Number(RangeValue),
          userId: withdrawalData.item.userId,
          AccountType: withdrawalData.item.AccountType,
          groupId:
            withdrawalData.item?.groupId == 'null'
              ? 'null'
              : withdrawalData.item.groupId,
          Date: Date.now(),
        }),
      );
      navigation.goBack() && alert('WithDrawal Successful');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader navigation={navigation} />

      <View style={{height: '85%', marginTop: 0}}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
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
                marginBottom: SIZES.padding2 * 3,
              }}>
              <Text style={{...FONTS.h3, color: 'white'}}>
                Kes {RangeValue}
              </Text>
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
                  padding: 0,
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
            <Text
              style={{
                width: '80%',
                height: 40,
                ...FONTS.h4,
                marginTop: 10,
                color: COLORS.primary,
                textAlign: 'center',
              }}>
              Balance:: {AccountBalanceData1[0]?.balance}
            </Text>
            <Text
              style={{
                width: '80%',
                height: 40,
                ...FONTS.h4,
                color: COLORS.primary,
                textAlign: 'center',
              }}>
              {withdrawalData?.item?.userName}
            </Text>
            <Text
              style={{
                width: '80%',
                height: 40,
                ...FONTS.h4,
                marginTop: 10,
                color: COLORS.primary,
                textAlign: 'center',
              }}>
              {withdrawalData?.item?.AccountType}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => HandleLoanPayment()}
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
            <Text style={{...FONTS.h3, color: COLORS.white}}> Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(HandleWithDrawals);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
