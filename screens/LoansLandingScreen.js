import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import UserData from './UsersData';

const RenderTitle = ({navigation}) => {
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
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            padding: SIZES.padding,

            textAlign: 'center',
          }}>
          Loans
        </Text>
        <TouchableOpacity
          style={{
            width: '50%',
            justifyContent: 'center',
            alignItems: 'center',

            height: 40,
            alignSelf: 'center',
            backgroundColor: COLORS.primary,
            marginRight: SIZES.padding,
            borderRadius: SIZES.padding2,
          }}
          onPress={() => navigation.navigate('LoanRequest')}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.white,

              textAlign: 'center',
            }}>
            Request Loan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LoanDetails = ({item, navigation}) => {
  const [showStatement, setShowStatement] = React.useState(false);
  const [handleStatement, setHandleStatement] = React.useState(200);

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      if (showStatement) {
        setHandleStatement(300);
      } else {
        setHandleStatement(200);
      }
    }
  }, [showStatement]);
  return (
    <View style={{height: handleStatement}}>
      <View
        style={{
          width: '95%',
          height: 180,
          marginTop: 5,
          // padding: SIZES.padding2,
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          borderRadius: 10,
          borderColor: COLORS.primary,
          borderWidth: 1,
        }}>
        <View style={{padding: SIZES.padding2, width: '100%'}}>
          <Text style={{...FONTS.h3, color: COLORS.primary}}>Loan Balance</Text>
          <Text style={{...FONTS.h2, color: COLORS.secondary}}>
            Ksh 3600 {item.id}
          </Text>
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
            Due Date: 2022/8/17
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            height: '43%',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '95%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('GroupTransactions')}
              style={{
                backgroundColor: 'transparent',
                // padding: SIZES.padding,
                height: 40,
                width: 100,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.primary,
                borderWidth: 1,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.primary}}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoanPayment')}
              style={{
                backgroundColor: 'transparent',

                height: 40,
                width: 120,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.secondary,
                borderWidth: 1,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.secondary}}>
                Pay Loan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const LoansLandingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} />

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 56]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <LoanDetails item={item} navigation={navigation} />
        )}
      />
    </SafeAreaView>
  );
};

export default React.memo(LoansLandingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
