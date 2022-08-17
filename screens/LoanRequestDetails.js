import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React from 'react';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {BarChart} from 'react-native-chart-kit';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  updateLoanRequest,
  addApprovedLoan,
  DeleteLoanRequest,
} from './Actions/LoanRequestAction';
// import {useSelector} from 'react-redux';

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
          ...FONTS.h2,
          color: COLORS.primary,
          padding: SIZES.padding,
          width: '80%',
          textAlign: 'center',
        }}>
        Loan Request Details
      </Text>
    </View>
  );
}

// return (
//   <View>
//     <Text
//       style={{
//         ...FONTS.h3,
//         textAlign: 'center',
//         color: COLORS.primary,
//         marginVertical: SIZES.padding,
//       }}>
//       Loan payment History
//     </Text>
//     <View
//       style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
//       <BarChart
//         chartConfig={{
//           backgroundColor: '#e26a00',
//           backgroundGradientFrom: '#fb8c00',
//           backgroundGradientTo: '#ffa726',
//           fillShadowGradient: 'skyblue',
//           fillShadowGradientOpacity: 1,
//           decimalPlaces: 2, // optional, defaults to 2dp
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16,
//             alignSelf: 'center',
//             margin: SIZES.padding,
//           },
//         }}
//         data={dataBar}
//         width={SIZES.width}
//         height={SIZES.height * 0.4}
//         yAxisLabel="sh"
//         verticalLabelRotation={50}
//       />
//     </View>
//   </View>
// );

const LoanRequestDetails = ({navigation, route}) => {
  const [PreviousLoans, setPreviousLoans] = React.useState([]);
  const loandata = route.params;
  const Allloans = useSelector(state => state.loanRequests.ApprovedLoans);
  React.useEffect(() => {
    let mount = true;
    if (mount) {
      let tempData = [];
      Allloans.filter(item => {
        if (item.user_id == loandata.item.user[0].id) {
          tempData.push(item);
          console.log(tempData, 'tempData');
        }
      }),
        setPreviousLoans(tempData);
    }
  }, [loandata]);

  // console.log(loandata);
  function RenderBarGraph() {
    return (
      <View
        style={{
          width: SIZES.width - 30,
          height: '120%',
          marginTop: 5,
          // padding: SIZES.padding2,
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          borderRadius: 10,
          borderColor: COLORS.primary,
          borderWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',

            height: 40,
            borderRadius: 10,
            width: '100%',
            backgroundColor: COLORS.primary,
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...FONTS.body5,
              textAlign: 'center',
              color: COLORS.white,
              width: '25%',
            }}>
            LoanAmount
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              textAlign: 'center',
              color: COLORS.white,
              width: '25%',
              // marginRight: 25,
            }}>
            Balance
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              textAlign: 'center',
              color: COLORS.white,
              width: '25%',
            }}>
            DueDate
          </Text>
          <Text
            style={{
              ...FONTS.body5,
              textAlign: 'center',
              color: COLORS.white,
              width: '25%',
            }}>
            lastDate
          </Text>
        </View>
        <FlatList
          data={PreviousLoans}
          keyExtractor={(item, index) => index.toString() + item.id}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 20,
                  width: '100%',
                }}>
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: 'center',
                    color: COLORS.black,
                    width: '25%',
                  }}>
                  {item.ApprovedAmount}
                </Text>
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: 'center',
                    color: COLORS.black,
                    width: '25%',
                  }}>
                  {item.Balance}
                </Text>
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: 'center',
                    color: COLORS.black,
                    width: '25%',
                  }}>
                  {item.DueDate}
                </Text>
                <Text
                  style={{
                    ...FONTS.body5,
                    textAlign: 'center',
                    color: COLORS.black,
                    width: '25%',
                  }}>
                  {item.date}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
  const IndividualSavings = ({navigation, loanData}) => {
    const [showStatement, setShowStatement] = React.useState(true);
    const dispatch = useDispatch();

    const HandleLoanAproval = async () => {
      //  add loan to firestore
      //  update loan status to approved

      dispatch(updateLoanRequest({...loanData, status: 'approved'}));

      let newLoanData = {
        ApprovedAmount: loanData.LoanAmount,
        DueDate: loanData.dueDate,
        Balance: loanData.LoanAmount,
        date: moment().format('MMMM Do YYYY'),
        loan_id: loanData.id,
        status: 'approved',
        user_id: loanData.user[0].id,
        PhoneNumber: loanData.user[0].PhoneNumber,
      };

      dispatch(addApprovedLoan({...newLoanData})) && alert('Loan Approved');
      // navigation.goBack();
    };
    const HandleRequestDelete = async item => {
      // alert(item.id);
      Alert.alert(
        'delete action confirmation',
        'Are  u sure you want to delete this Loan Request',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              try {
                dispatch(DeleteLoanRequest({id: item.id})) &&
                  navigation.goBack();
              } catch (error) {
                console.log('fire ', error);
              }
            },
          },
        ],
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            width: '95%',
            height: '45%',
            padding: SIZES.padding2,
            alignSelf: 'center',
            backgroundColor: COLORS.white,
            borderRadius: 10,
            borderColor: COLORS.primary,
            borderWidth: 1,
          }}>
          <Text style={{...FONTS.h2, color: COLORS.primary}}>Loan Amount</Text>
          <Text style={{...FONTS.h3, color: COLORS.secondary}}>
            Ksh {loanData.LoanAmount}
          </Text>
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
            Name : {loanData.user[0].Name}
          </Text>
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
            DueDate : {moment(loanData.dueDate).format('MMMM Do YYYY')}
          </Text>
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
            Date : {moment(loanData.date).format('MMMM Do YYYY')}
          </Text>

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              height: '30%',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => HandleLoanAproval()}
              style={{
                backgroundColor: COLORS.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: SIZES.padding2,
                padding: SIZES.padding,
                // height: 50,
                alignSelf: 'center',
              }}>
              <Text style={{color: COLORS.white, ...FONTS.h4}}>
                {loanData.status}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => HandleRequestDelete(loanData)}
              style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: SIZES.padding2,
                padding: SIZES.padding2,
                // height: 50,
                alignSelf: 'center',
              }}>
              <Text
                style={{color: COLORS.white, textAlign: 'center', ...FONTS.h4}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              width: '100%',
              height: '40%',
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.h4, color: COLORS.primary}}>
              Loan Payment History
            </Text>

            <TouchableOpacity
              onPress={() => setShowStatement(!showStatement)}
              style={{
                backgroundColor: COLORS.secondary,
                width: 50,
                height: 50,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={icons.expand}
                style={{width: 20, height: 20, tintColor: COLORS.white}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {showStatement && <RenderBarGraph />}
        </View>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} />
      <IndividualSavings loanData={loandata?.item} />
    </SafeAreaView>
  );
};

export default LoanRequestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
