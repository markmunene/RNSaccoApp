import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { icons, images, COLORS, SIZES, FONTS } from '../constants';
import moment from 'moment';

import React from 'react';
import {useSelector} from 'react-redux';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
function RenderTitle({navigation, title}) {
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
        {title}
      </Text>
    </View>
  );
}

// const RenderTransactions
function RenderTransactions({item}) {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignSelf: 'center',
          padding: SIZES.padding,
          borderWidth: 1,
          borderColor: COLORS.primary,
          margin: SIZES.padding * 0.3,
          borderRadius: 5,
          backgroundColor: COLORS.white,
          elevation: 3,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
           Ksh {item.Amount}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary,
              marginRight: 5,
            }}>
            {moment(item.Date).format('MMM DD, YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const LoanPaymentHistory = ({navigation, route}) => {
    let loanId = route.params;
    let payementHistory = useSelector(state => state.loanRequests.LoanPayment);
    console.log(payementHistory);
    
  const [data, setData] = React.useState([]);
 
    React.useEffect(() =>
    {
        let tempData = [];
        payementHistory.filter(item => {
          if (loanId.id == item.LoanId)
          {
            tempData.push(item);
          }
          
        });
    setData(tempData);
  }, [route.params]);
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} title='Loan Transactions' />
      {/* renderRequuest */}
      <View
        style={{
          width: '100%',
          height: '80%',
        }}>
        <FlatList
          data={data}
          renderItem={({item}) => <RenderTransactions item={item} />}
          keyExtractor={(item, index) => index.toString() + item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoanPaymentHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
