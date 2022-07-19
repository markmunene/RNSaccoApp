import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';

function ReanderStatements() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLORS.white,
        padding: SIZES.padding2,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text style={{...FONTS.body3, color: COLORS.primary}}>Kes 600</Text>
        <Text style={{...FONTS.body3, color: COLORS.primary}}>method</Text>
        <Text style={{...FONTS.body3, color: COLORS.primary}}>09/21/2021</Text>
      </View>
    </View>
  );
}

const IndividualSavings = ({navigation}) => {
  const [showStatement, setShowStatement] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: 100, height: 50, padding: SIZES.padding}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '95%',
          height: '50%',
          padding: SIZES.padding2,
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          borderRadius: 10,
          borderColor: COLORS.primary,
          borderWidth: 1,
        }}>
        <Text style={{...FONTS.h1, color: COLORS.secondary}}>Ksh 3600</Text>
        <Text style={{...FONTS.h1, color: COLORS.primary}}>
          Savings Account
        </Text>
        <Text style={{...FONTS.h4, color: COLORS.primary}}>
          Available Balance
        </Text>
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            height: '80%',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
            View Statement
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
        {showStatement && <ReanderStatements />}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(IndividualSavings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
