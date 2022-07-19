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
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import UserData from './UsersData';

import {useSelector} from 'react-redux/';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import React from 'react';

import { DeleteLoanPreConditions } from './Actions/loanPrecondtions';
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
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: SIZES.padding,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.primary,
            padding: SIZES.padding,

            textAlign: 'center',
          }}>
          Loan Policy Condtions
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoanPreCondtions')}
          style={{
            alignSelf: 'center',
            backgroundColor: COLORS.secondary,
            padding: SIZES.padding,
            marginRight: SIZES.padding * 2,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: COLORS.white,
            }}>
            New range
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const LoanPolicies = ({ navigation }) =>
{
  const dispatch = useDispatch();
  function RenderRequest({item, navigation}) {
    return (
      <View style={{width: '100%'}}>
        <Text
          style={{
            ...FONTS.body5,
            marginLeft: SIZES.padding2 * 2,
            color: COLORS.primary,
          }}>
          {moment(item?.date).fromNow()}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoanPreCondtions', {item})}
          style={{
            width: '90%',
            height: 40,
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
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
            ({item.RangeFrom} - {item.RangeTo})
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.primary,
                marginRight: 5,
              }}>
              {item.InterestRate} %
            </Text>
            <TouchableOpacity onPress={() => dispatch(DeleteLoanPreConditions({item}))}>
              <Image
                source={icons.trash}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: 'red'}}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const LoanPolicy = useSelector(state => state.policies.loanCondtions);

  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} />
      {/* renderRequest */}
      <View
        style={{
          width: '100%',
          height: '80%',
        }}>
        <FlatList
          data={LoanPolicy}
          renderItem={({item}) => (
            <RenderRequest item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString() + item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoanPolicies);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
