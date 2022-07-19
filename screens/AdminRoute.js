import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Login from './Login';
import LoanRequest from './LoanRequest';
import IndividualSavings from './IndividualSavings';
import RegisterClients from './RegisterClients';
import CreateJointAccounts from './CreateJointAccounts';
import CreateGroupAccount from './CreateGroupAccount';
import IndividualGroups from './IndividualGroups';
import DepositAccount from './DepositAccount';
import LoanRequestAdmin from './LoanRequestAdmin';
import LoanRequestDetails from './LoanRequestDetails';
import LoanPreCondtions from './LoanPreCondtions';
import LoansLandingScreen from './LoansLandingScreen';
import GroupsJointsClientSide from './GroupsjointsClientSide';
import AllLoanPolicyCondtions from './AllLoanPolicyCondtions';

import AllGroups from './AllGroups';

import {icons, COLORS, SIZES, FONTS} from '../constants';

import Svg, {Path} from 'react-native-svg';
import {home} from '../constants/icons';
import Allusers from './Allusers';

const BottomNavigation = ({navigation}) => {
  function FlotBtn() {
    const [isFlot, setIsFlot] = React.useState(false);
    const OtherBtns = () => {
      return (
        <View
          style={{
            width: 150,
            height: '50%',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 20,
            right: 10,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoanRequestAdmin')}
            style={{
              position: 'absolute',
              bottom: 140,

              width: 130,
              height: 40,
              borderRadius: 30,
              alignSelf: 'flex-end',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.secondary,
              elevation: 30,
              zIndex: 6,
            }}>
            <Text
              style={{color: COLORS.white, textAlign: 'center', ...FONTS.h4}}>
              loan Requests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('WithdrawRequest')}
            style={{
              position: 'absolute',
              bottom: 80,

              width: 150,
              height: 40,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              backgroundColor: COLORS.secondary,
              elevation: 30,
              zIndex: 6,
            }}>
            <Text
              style={{color: COLORS.white, textAlign: 'center', ...FONTS.h4}}>
              Withdraw Request
            </Text>
          </TouchableOpacity>
          {/* 155 */}
        </View>
      );
    };
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          right: 10,
          width: 60,
          height: 600,
        }}>
        {isFlot && <OtherBtns />}
        <TouchableOpacity
          onPress={() => setIsFlot(!isFlot)}
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.secondary,
            elevation: 30,
            zIndex: 6,
          }}>
          <Image
            source={isFlot ? icons.minus : icons.plus}
            style={{width: 30, height: 30, tintColor: COLORS.white}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();
  const TabBarCustomButton = ({accessibilityState, children, onPress}) => {
    let isSelected = accessibilityState.selected;
    if (isSelected) {
      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
            <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
            <Svg width={70} height={61} viewBox="0 0 75 61">
              <Path
                d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                fill={COLORS.white}
              />
            </Svg>
            <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
          </View>

          <TouchableOpacity
            style={{
              top: -22.5,
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: COLORS.white,
              elevation: 5,
            }}
            onPress={onPress}>
            {children}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            height: 60,
            backgroundColor: COLORS.white,
          }}
          activeOpacity={1}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={{width: '100%', height: '100%'}}>
      <FlotBtn />
      <Tab.Navigator
        tabBarOptions={{
          styles: {
            borderTopWidth: 0,
            backgroundColor: 'transparent',
            elevation: 5,
          },
        }}>
        <Tab.Screen
          name="reg"
          component={Allusers}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <Image
                source={icons.users}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
            tabBarButton: props => {
              return <TabBarCustomButton {...props} />;
            },
          }}
        />
        <Tab.Screen
          name="cJoint"
          component={CreateJointAccounts}
          options={{
            headerShown: false,
            tabBarIcon: focused => (
              <Image
                source={icons.add2}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
            tabBarButton: props => {
              return <TabBarCustomButton {...props} />;
            },
          }}
        />
        <Tab.Screen
          name="cGroup"
          component={CreateGroupAccount}
          options={{
            headerShown: false,
            tabBarIcon: focused => (
              <Image
                source={icons.add3}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
            tabBarButton: props => {
              return <TabBarCustomButton {...props} />;
            },
          }}
        />
        <Tab.Screen
          name="policy"
          component={AllLoanPolicyCondtions}
          options={{
            headerShown: false,
            tabBarIcon: focused => (
              <Image
                source={icons.money3}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
            tabBarButton: props => {
              return <TabBarCustomButton {...props} />;
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default React.memo(BottomNavigation);

const styles = StyleSheet.create({});
