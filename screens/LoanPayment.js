import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Switch
} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

// import RangeSlider from 'rn-range-slider';
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import {addLoanPayment} from './Actions/LoanRequestAction';
import moment from 'moment';
import axios from 'axios';

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
          Loan Payment
        </Text>
      </View>
    </View>
  );
}
// render a title

const LoanPayment = ({navigation, route}) => {
  const dispatch = useDispatch();
  const loanData = route.params;
  const [useMpesa, setUseMpesa]= React.useState(false)

  const [RangeValue, setRangeValue] = React.useState(0);
  const [MinimumLoan, setMinimumLoan] = React.useState(0);
  const [MaximumLoan, setMaximumLoan] = React.useState(300000);
  const [selectedValue, setSelectedValue] = React.useState(0);
  const DepositData = ['individual', 'jambo account', 'Joint', 'group'];
  // const user = useSelector(state => state.users.shortUserDetails);

  const HandleLoanPayment = async () => {
    // let filteredUser = user.filter(item => item.id === SelectedUserId.key);
    // loanData.item.phone_number,
    const data = {
      collection: 'loanPayment',
      userId: loanData.item.user_id,
      LoanId: loanData.item.id,
      payment: 'mobile',
      PhoneNumber: loanData.item.PhoneNumber,

      
      amount: RangeValue,
      date: Date.now(),
    };
    let loanToBeUpdated = {
      ...loanData.item,
      date: moment(Date.now()).format('MMMM Do YYYY'),
      collection: 'loanPayment',
    
      amount: RangeValue,
      Balance: Number(loanData.item.Balance) - Number(RangeValue),
    };
    if (useMpesa) {
      
      axios
        .post(
          'https://us-central1-saccomgapp.cloudfunctions.net/main/lipaNaMpesaOnline',
          {...loanToBeUpdated},
        )
        .then(res => {
          dispatch(addLoanPayment(data, loanToBeUpdated));
  
          navigation.navigate('LoansLandingScreen') &&
            alert('Loan Payment Successful');
        });
    }else{
      await firestore()
      .collection("loanPayment")
      .add({
        Amount: loanToBeUpdated.amount,
        userId: loanToBeUpdated.user_id,
        date: moment().format("MMMM Do YYYY"),
        LoanId: loanToBeUpdated.id,
      })
      .then(()=>{
        dispatch(addLoanPayment(data, loanToBeUpdated));
        navigation.navigate('LoansLandingScreen')
            alert('Loan Payment Successful');
      })
      .catch((error) => {
        console.log(error);
      });

    await firestore()
      .collection("loans")
      .doc(loanToBeUpdated.id)
      .set({
        ...loanToBeUpdated,
      })
      .catch((error) => {
        console.log(error);
      });

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
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Text style={{...FONTS.h4, marginLeft:10}}>Mpesa</Text>
              <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={useMpesa ? COLORS.primary : "#767577"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setUseMpesa(!useMpesa)}
        value={useMpesa}
      />
              </View>
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
            <Text style={{...FONTS.h3, color: COLORS.white}}> Pay Loan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoanPayment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
