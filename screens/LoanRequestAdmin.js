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

import {useSelector} from 'react-redux';

import React from 'react';


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
        Loan Requests
      </Text>
    </View>
  );
}

const LoanRequestAdmin = ({ navigation }) =>
{
  const LoanRequest = useSelector(state => state.loanRequests.loanRequest);
  function RenderRequest({item, navigation}) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('LoanRequestDetails', {item})}
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
          {item.user[0]?.Name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary,
              marginRight: 5,
            }}>
            {item.LoanAmount}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoanRequestDetails', {item})}>
            <Image
              source={icons.right}
              resizeMode="contain"
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} />
      {/* renderRequuest */}
      <View
        style={{
          width: '100%',
          height: '95%',
        }}>
        <FlatList
          data={LoanRequest}
          renderItem={({item}) => (
            <RenderRequest item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString() + item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoanRequestAdmin);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
