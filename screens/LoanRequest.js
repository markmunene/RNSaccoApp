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
import SendSMS from 'react-native-sms';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';

// import RangeSlider from 'rn-range-slider';
import Slider from '@react-native-community/slider';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';

import firestore from '@react-native-firebase/firestore';
import {createLoanRequest} from './Actions/LoanRequestAction';
import ModalFilterPicker from 'react-native-modal-filter-picker';

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
      <TouchableOpacity style={{width: 40}} onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{width: 30, height: 30, tintColor: COLORS.primary}}
        />
      </TouchableOpacity>
      <Text
        style={{
          ...FONTS.h3,
          marginRight: SIZES.padding * 5,
          color: COLORS.primary,
        }}>
        Loan Request
      </Text>
    </View>
  );
}

const LoanRequest = ({navigation}) => {
  const dispatch = useDispatch();
  // const [RangeValue, setRangeValue] = React.useState(0);
  const [MinimumLoan, setMinimumLoan] = React.useState(0);
  const [MaximumLoan, setMaximumLoan] = React.useState(100000);
  const [RangeValue, setRangeValue] = React.useState(0);
  // const user = useSelector(state => state.users.shortUserDetails);

  const loanconditions = useSelector(state => state.policies.loanCondtions);

  const [DueDate, setDueDate] = React.useState([]);

  const OnAmountChange = value => {
    // calculate the due date
    let amount = Number(value);

    let fitSocket = loanconditions.filter(item => {
      if (amount >= Number(item.RangeFrom) && amount <= Number(item.RangeTo)) {
        return item;
      }
    });
    let dueDate = fitSocket[0]?.Duration;
    let finalDate = moment().add(dueDate, 'months').format('YYYY-MM-DD');
    console.log(moment(finalDate).format('D'), 'finalDate');

    setDueDate(finalDate);

    setRangeValue(value);
  };

  const HandleSubmit = async () => {
    // SendSMS.send(
    //   {
    //     body: 'Loan Request Submitted successively',
    //     recipients: ['0748406477', '0757345028'],
    //     successTypes: ['sent', 'queued'],
    //     allowAndroidSendWithoutReadPermission: true,
    //   },
    //   (completed, cancelled, error) => {
    //     console.log(
    //       'SMS Callback: completed: ' +
    //         completed +
    //         ' cancelled: ' +
    //         cancelled +
    //         'error: ' +
    //         error,
    //     );
    //   },
    // );

    const LoanDetails = {
      LoanAmount: RangeValue,
      user: userSelect,
      dueDate: DueDate,
      status: 'Pending',
      date: Date.now(),
    };

    if (RangeValue > 0) {
      dispatch(createLoanRequest({LoanDetails})) && navigation.goBack();
      // console.log(userSelect);
      alert('Loan Request Submitted Successfully');
    }
  };
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [userSelect, setUserSelect] = React.useState([]);
  const [SelectedUserId, setSelectedUserId] = React.useState('');
  let user = useSelector(state => state.users.AllusersMinData);
  let options = useSelector(state => state.users.userDataforModal);
  const onSearch = text => {
    // console.log(text, 'texttttttttttttttttttttttttttttttt');
    setSelectedUserId(text);
    let tempUser = user.filter(item => {
      if (item.id === text.key) {
        return item;
      }
    });

    setUserSelect(tempUser);
    setModalVisible(false);
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
              <Text style={{...FONTS.h3, color: 'white'}}>
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
              onChangeText={text => OnAmountChange(text)}
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
                Payment Date
              </Text>
              <ModalFilterPicker
                visible={ModalVisible}
                onSelect={value => onSearch(value)}
                onCancel={() => setModalVisible(false)}
                options={options}
              />

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
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.primary,
                  marginTop: SIZES.padding / 0.7,
                }}>
                {SelectedUserId.label}
              </Text>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '50%',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                    height: 40,
                    width: 50,
                    backgroundColor: COLORS.primary,
                    textAlign: 'center',
                    borderRadius: 10,
                    paddingTop: SIZES.padding / 2,
                  }}>
                  {moment(DueDate).format('D')}
                </Text>
                <Text
                  style={{
                    ...FONTS.h4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: COLORS.white,
                    height: 40,
                    width: 50,
                    backgroundColor: COLORS.primary,
                    textAlign: 'center',
                    borderRadius: 10,
                    marginLeft: SIZES.padding2,
                    paddingTop: SIZES.padding / 2,
                  }}>
                  {moment(DueDate).format('MMM')}
                </Text>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                    height: 40,
                    width: 50,
                    backgroundColor: COLORS.primary,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',

                    borderRadius: 10,
                    marginLeft: SIZES.padding2,
                    paddingTop: SIZES.padding / 2,
                  }}>
                  {moment(DueDate).format('YYYY')}
                </Text>
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
            <Text style={{...FONTS.h3, color: COLORS.white}}>Request Loan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoanRequest);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
