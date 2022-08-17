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
import AdminRoute from './AdminRoute';
import InitailScreen from './InitailScreen';

import AllGroups from './AllGroups';
// import Home from './Home';
// import Home from './Home';

import {icons, COLORS, SIZES} from '../constants';

import Svg, {Path} from 'react-native-svg';
import {home} from '../constants/icons';
import GroupsjointsClientSide from './GroupsjointsClientSide';
import {useSelector} from 'react-redux';

const BottomNavigation = ({navigation}) => {
  let isLogin = useSelector(state => state.users.isLogin);
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
  // console.log('isLogin', isLogin);
  return (
    <Tab.Navigator
      tabBarOptions={{
        styles: {
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 5,
        },
      }}>
      <Tab.Screen
        name="init"
        component={isLogin.length > 0 ? Home : Login}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={icons.home}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? COLORS.secondary : COLORS.primary,
              }}
            />
          ),
          tabBarButton: props => {
            return <TabBarCustomButton {...props} />;
          },
        }}
      />
      {isLogin.length > 0 ? (
        <>
          <Tab.Screen
            name="loanR"
            component={LoanRequest}
            options={{
              headerShown: false,
              tabBarIcon: focused => (
                <Image
                  source={icons.Withdraw}
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
            name="savings"
            component={IndividualSavings}
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
          <Tab.Screen
            name="groups"
            component={GroupsjointsClientSide}
            options={{
              headerShown: false,
              tabBarIcon: focused => (
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
        </>
      ) : null}
    </Tab.Navigator>
  );
};

export default React.memo(BottomNavigation);

const styles = StyleSheet.create({});
