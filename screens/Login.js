import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Login = ({navigation}) => {
  const [Pin, setPin] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '25%',
          width: '100%',
        }}>
        <Text style={{...FONTS.h2, color: COLORS.primary}}>Welcome</Text>
        <Text style={{...FONTS.h2, color: COLORS.primary}}>Mac</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: '75%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            width: '95%',
            height: '60%',
            margin: SIZES.padding,
          }}>
          {/* create a view circle on the top center  */}
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: COLORS.white,
              position: 'absolute',
              top: -50,
              alignSelf: 'center',
            }}>
            <Image
              source={icons.fingerprint}
              style={{
                width: 90,
                height: 90,
                alignSelf: 'center',
                tintColor: COLORS.secondary,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                justifyContent: 'center',
                marginTop: SIZES.padding * 4,
                ...FONTS.h2,
                color: COLORS.white,
                textAlign: 'center',
              }}>
              Login with fingerprint
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              height: '60%',
            }}>
            <TextInput
              keyboardType="number-pad"
              value={Pin}
              placeholderTextColor={COLORS.white}
              onChangeText={text => setPin(text)}
              style={{
                ...FONTS.h2,
                color: COLORS.white,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 2,
                marginBottom: SIZES.padding,
                textAlign: 'center',
                marginTop: SIZES.padding,
                width: '70%',
              }}
              placeholder="Enter your pin"
              secureTextEntry={true}
            />
          </View>
          {/* <View style={{width: '100%', justifyContent: 'flex-end'}}> */}
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 2,
              marginBottom: SIZES.padding,
              textAlign: 'center',
              position: 'absolute',
              bottom: 0,

              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            forgot pin?
          </Text>
          {/* </View> */}
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.secondary,
              borderRadius: 10,
              marginTop: SIZES.padding,
              justifyContent: 'center',
              alignItems: 'center',
              width: '95%',
              padding: SIZES.padding,
              elevation: 5,
            }}>
            <Text style={{...FONTS.h2, color: COLORS.white}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
