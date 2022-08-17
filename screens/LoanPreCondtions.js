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
import firestore from '@react-native-firebase/firestore';
import {useSelector, useDispatch} from 'react-redux';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';

import {
  UpdateLoanPreConditions,
  AddLoanPreConditions,
} from './Actions/loanPrecondtions';
const LoanPreCondtions = ({navigation, route}) => {
  const [RangeFrom, setRangeFrom] = React.useState('');
  const [RangeTo, setRangeTo] = React.useState('');
  const [Duration, setDuration] = React.useState(0);
  const [Fine, setFine] = React.useState('');
  const [InterestRate, setInterestRate] = React.useState('');

  const loan_policy = useSelector(state => state.policies.loanCondtions);

  const item = route?.params;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (item != undefined) {
      let data = item?.item;
      setRangeFrom(data?.RangeFrom);
      setRangeTo(data?.RangeTo);
      setDuration(data?.Duration);
      setFine(data?.Fine);
      setInterestRate(data?.InterestRate);
    }
  }, [route?.params]);

  function RenderTitle({navigation}) {
    return (
      <View
        style={{
          width: '100%',
          height: 50,
          marginTop: SIZES.padding,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{padding: SIZES.padding, width: '20%'}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              alignSelf: 'center',
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            padding: SIZES.padding,
            width: '80%',
            textAlign: 'center',
          }}>
          Loan policy Registration
        </Text>
      </View>
    );
  }

  async function HandleSubmit({navigation}) {
    // save data to firebase
    if (item != undefined) {
      let data = item?.item;
      if (Number(RangeFrom) < Number(RangeTo)) {
        await firestore()
          .collection('loan_policy')
          .doc(data?.id)
          .update({
            RangeFrom: RangeFrom,
            RangeTo: RangeTo,
            Duration: Duration,
            Fine: Fine,
            InterestRate: InterestRate,
            date: Date.now(),
          })
          .then(() => {
            alert('Loan policy updated successfully');
            navigation.goBack();
            dispatch(
              UpdateLoanPreConditions({
                id: data?.id,
                RangeFrom: RangeFrom,
                RangeTo: RangeTo,
                Duration: Duration,
                Fine: Fine,
                InterestRate: InterestRate,
                date: Date.now(),
              }),
            );
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert('Range from should be less than range to');
      }
    } else {
      if (Number(RangeFrom) < Number(RangeTo)) {
        let rangeFromFound = loan_policy.map(item => {
          if (RangeTo > item.RangeFrom && RangeFrom > item.RangeTo) {
            return item;
          }
        });

        let condtionFound = loan_policy.filter(conditions => {
          if (
            Number(conditions.RangeFrom) == RangeFrom ||
            Number(conditions.RangeTo) == RangeTo
          ) {
            return conditions;
          }
        });

        if (condtionFound.length > 0) {
          alert('Loan policy already exists');
        } else {
          await firestore()
            .collection('loan_policy')
            .add({
              RangeFrom: RangeFrom,
              RangeTo: RangeTo,
              Duration: Duration,
              Fine: Fine,
              InterestRate: InterestRate,
              date: Date.now(),
            })
            .then(res => {
              dispatch(
                AddLoanPreConditions({
                  id: res.id,
                  RangeFrom: RangeFrom,
                  RangeTo: RangeTo,
                  Duration: Duration,
                  Fine: Fine,
                  InterestRate: InterestRate,
                  date: Date.now(),
                }),
              );
              setRangeFrom('');
              setRangeTo('');
              setDuration(0);
              setFine('');
              setInterestRate('');
              navigation.navigate('AllLoanPolicyCondtions');
            })
            .catch(() => {});
        }
      } else {
        alert('Range from should be less than range to');
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}>
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
          <Text style={styles.legend}>Loan RangeFrom</Text>
          <TextInput
            keyboardType="numeric"
            value={RangeFrom}
            onChangeText={text => setRangeFrom(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
          <Image
            source={icons.business}
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
          <Text style={styles.legend}>Loan Range to</Text>
          <TextInput
            keyboardType="numeric"
            value={RangeTo}
            onChangeText={text => setRangeTo(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
          <Image
            source={icons.phone}
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
          <Text style={styles.legend}>InterestRate</Text>
          <TextInput
            keyboardType="numeric"
            value={InterestRate}
            onChangeText={text => setInterestRate(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
          <Image
            source={icons.business}
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
          <Text style={styles.legend}>Duration(months)</Text>
          <TextInput
            value={Duration}
            keyboardType="numeric"
            onChangeText={text => setDuration(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
          <Image
            source={icons.business}
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
          <Text style={styles.legend}>Fine</Text>
          <TextInput
            keyboardType="numeric"
            value={Fine}
            onChangeText={text => setFine(text)}
            style={{
              width: '90%',
              height: 40,
              alignSelf: 'center',
              color: COLORS.primary,
            }}
          />
          <Image
            source={icons.card}
            resizeMode="contain"
            style={{
              width: 20,
              height: 40,
              alignSelf: 'center',
              tintColor: COLORS.primary,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => HandleSubmit({navigation})}
          style={{
            alignSelf: 'center',
            width: '90%',
            backgroundColor: COLORS.secondary,
            padding: SIZES.padding2,
            borderRadius: 10,
            elevation: 5,
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white, textAlign: 'center'}}>
            {item != undefined ? 'Update' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(LoanPreCondtions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
