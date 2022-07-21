import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';
const Scrollx = new Animated.Value(0);

const RenderSlider = () => {
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      snapToAlignment="center"
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: Scrollx}}}], {
        useNativeDriver: false,
      })}>
      {[images.rich3, images.rich4, images.group4, images.hands].map(
        (item, index) => {
          return (
            <View
              key={`menu- ${index}`}
              style={{alignItems: 'center', height: 400}}>
              <Image
                source={item}
                style={{width: SIZES.width, height: SIZES.height * 0.55}}
                resizeMode="cover"
              />
            </View>
          );
        },
      )}
    </Animated.ScrollView>
  );
};

const RenderDots = () => {
  const dotPosition = Animated.divide(Scrollx, SIZES.width);
  return (
    <View style={{height: 50}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 10,
          height: SIZES.padding,
        }}>
        {[1, 2, 3, 4].map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotSize = dotPosition.interpolate({
            inputRange: [index - 2, index, index + 2],
            outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
            extrapolate: 'clamp',
          });
          const color = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.black, COLORS.primary, COLORS.black],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: SIZES.base,
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

function RenderOptions({navigation}) {
  return (
    <View
      style={{
        width: '100%',
        height: '60%',
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: SIZES.padding / 3,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DepositAccount')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: SIZES.padding,
              marginLeft: SIZES.padding,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.Deposit}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('WithdrawRequest')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: SIZES.padding,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.Withdraw}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoansLandingScreen')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: SIZES.padding * 3,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.bank}
              style={{
                width: 30,
                height: 30,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>Loans</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('IndividualSavings')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: SIZES.padding,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.Deposit}
              style={{
                width: 40,
                height: 40,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>
              Personal Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('GroupsJointsClientSide')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',

              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.user}
              style={{
                width: 50,
                height: 50,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>Joints</Text>
            <Text style={{...FONTS.h4, color: COLORS.primary}}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('GroupsJointsClientSide')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: SIZES.padding * 3,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.users}
              style={{
                width: 50,
                height: 50,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>
              Groups Account
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('GroupTransactions')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: SIZES.padding,
              marginRight: SIZES.padding,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.chart}
              style={{
                width: 40,
                height: 40,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>jambo</Text>
            <Text style={{...FONTS.h4, color: COLORS.primary}}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AdminRoute')}
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: SIZES.padding,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Image
              source={icons.business}
              style={{
                width: 40,
                height: 40,
                tintColor: COLORS.primary,
                borderRadius: 15,
              }}
              resizeMode="contain"
            />
            <Text style={{...FONTS.h4, color: COLORS.primary}}>Admin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <RenderSlider />
      <RenderDots />
      <RenderOptions navigation={navigation} />
    </SafeAreaView>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
