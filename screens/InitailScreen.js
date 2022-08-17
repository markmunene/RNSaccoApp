import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';

const InitailScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{width: '100%', height: 50}}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            padding: SIZES.padding,
            textAlign: 'center',
          }}>
          InitailScreen
        </Text>
      </View> */}
      <View
        style={{
          width: '100%',
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={images.logo} style={{width: '100%', height: '100%'}} />
      </View>
      <View
        style={{
          width: '100%',
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',

          backgroundColor: COLORS.primary,
        }}>
        <View
          style={{
            width: '100%',
            height: '45%',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            marginTop: SIZES.padding,
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h2, color: COLORS.white}}>
            Welcome to sky star sacco
          </Text>
          <Text style={{...FONTS.body4, color: COLORS.white}}>
            Please login to continue
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('login')}
            style={{
              backgroundColor: COLORS.secondary,
              width: 70,
              height: 40,
              marginTop: SIZES.padding,
              borderRadius: 10,

              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h4, padding: 0}}>
              Login
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '30%',
              height: 10,
              margin: SIZES.padding,
              backgroundColor: COLORS.secondary,
              borderRadius: 5,
            }}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(InitailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
