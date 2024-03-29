import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {icons, images, COLORS, SIZES, FONTS} from './constants';
import Home from './screens/Home';

import Login from './screens/Login';

import BottomNavigation from './screens/BottomNavigation';
import LoanPreCondtions from './screens/LoanPreCondtions';
import LoanRequest from './screens/LoanRequest';
import LoanRequestAdmin from './screens/LoanRequestAdmin';
import AllLoanPolicyCondtions from './screens/AllLoanPolicyCondtions';
import WithdrawRequest from './screens/WithdrawRequest';
import RegisterClients from './screens/RegisterClients';
import IndividualGroups from './screens/IndividualGroups';
import IndividualSavings from './screens/IndividualSavings';
import DepositAccount from './screens/DepositAccount';
import CreateGroupAccount from './screens/CreateGroupAccount';
import CreateJointAccounts from './screens/CreateJointAccounts';
import AllGroups from './screens/AllGroups';
import JamboSavings from './screens/JamboSavings';

import LoansLandingScreen from './screens/LoansLandingScreen';
import GroupsJointsClientSide from './screens/GroupsjointsClientSide';
import GroupTransactions from './screens/GroupTransactions';
import LoanPayment from './screens/LoanPayment';
import AdminRoute from './screens/AdminRoute';
import DepositToUsersManually from './screens/DepositToUsersManually';
import Allusers from './screens/Allusers';
import LoanRequestDetails from './screens/LoanRequestDetails';
import AllWithdrawRequests from './screens/AllWithdrawRequests';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import {useDispatch, useSelector} from 'react-redux';
import {getAllpreconditions} from './screens/Actions/loanPrecondtions';
import {getJoints, getGroups} from './screens/Actions/Accounts';
import {LoginAction} from './screens/Actions/LoginAction';
import InitailScreen from './screens/InitailScreen';
import LoanPayementHistory from './screens/LoanPayementHistory';

import HandleWithdrawals from './screens/HandleWithdrawals';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {RegisteredUsers} from './screens/Actions/RegisteredUsers';
import {getAllwithdrawRequests} from './screens/Actions/WithdrawAction';
import {getAllDeposits} from './screens/Actions/DepositAction';
import {
  getLoanRequest,
  getLoanPayment,
  getApprovedLoans,
} from './screens/Actions/LoanRequestAction';

const Screenstack = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      auth().onAuthStateChanged(user => {
        if (user) {
          dispatch(LoginAction(user));
        } else {
          console.log('user is logged out');
        }
      });

      dispatch(getAllpreconditions());
      dispatch(RegisteredUsers());
      dispatch(getJoints());
      dispatch(getGroups());
      dispatch(getAllwithdrawRequests());
      dispatch(getAllDeposits());
      dispatch(getLoanRequest());
      dispatch(getApprovedLoans());
      dispatch(getLoanPayment());
    }
    return () => {
      isMounted = false;
    };
  }, []);
  React.useEffect(() => {
    // listening  to state changes
    let accounts = firestore().collection('Accounts');
    // accounts = accounts.where('userId', '==', SelectedUserId.key);
    // accounts = accounts.limit(0);
    accounts.onSnapshot(querySnapshot => {
      const accountsArray = [];
      let i = 0;
      querySnapshot.forEach(doc => {
        accountsArray.push(doc.data());
        accountsArray[i]['id'] = doc.id;
        i++;
      });

      // console.log(accountsArray, 'accountsArray');

      dispatch({
        type: 'UpdateDepositBalance',
        payload: accountsArray,
      });
    });
  }, []);
  React.useEffect(() => {
    let ApprovedLoans = firestore().collection('loans');
    ApprovedLoans = ApprovedLoans.limit(500);
    ApprovedLoans.onSnapshot(querySnapshot => {
      const ApprovedLoansArray = [];
      let i = 0;
      querySnapshot.forEach(doc => {
        ApprovedLoansArray.push(doc.data());
        ApprovedLoansArray[i]['id'] = doc.id;
        i++;
      });

      dispatch({
        type: 'GET_APPROVED_LOANS',
        payload: ApprovedLoansArray,
      });
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          header: null,
        }}>
        <Stack.Screen
          name="DepositToUsersManually"
          component={DepositToUsersManually}
        />
        <Stack.Screen name="InitailScreen" component={InitailScreen} />
        <Stack.Screen name="home" component={BottomNavigation} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="GroupTransactions" component={GroupTransactions} />
        <Stack.Screen name="LoanPayment" component={LoanPayment} />
        <Stack.Screen name="HandleWithdrawals" component={HandleWithdrawals} />

        <Stack.Screen
          name="AllWithdrawRequests"
          component={AllWithdrawRequests}
        />
        <Stack.Screen name="JamboSavings" component={JamboSavings} />
        <Stack.Screen
          name="LoanPayementHistory"
          component={LoanPayementHistory}
        />
        <Stack.Screen
          name="LoanRequestDetails"
          component={LoanRequestDetails}
        />
        <Stack.Screen
          name="LoansLandingScreen"
          component={LoansLandingScreen}
        />
        <Stack.Screen name="Allusers" component={Allusers} />
        <Stack.Screen
          name="GroupsJointsClientSide"
          component={GroupsJointsClientSide}
        />
        <Stack.Screen name="LoanPreCondtions" component={LoanPreCondtions} />
        <Stack.Screen name="LoanRequest" component={LoanRequest} />
        <Stack.Screen name="LoanRequestAdmin" component={LoanRequestAdmin} />
        <Stack.Screen name="AdminRoute" component={AdminRoute} />
        <Stack.Screen
          name="AllLoanPolicyCondtions"
          component={AllLoanPolicyCondtions}
        />
        <Stack.Screen name="WithdrawRequest" component={WithdrawRequest} />
        <Stack.Screen name="RegisterClients" component={RegisterClients} />
        <Stack.Screen name="IndividualGroups" component={IndividualGroups} />
        <Stack.Screen name="IndividualSavings" component={IndividualSavings} />
        <Stack.Screen name="DepositAccount" component={DepositAccount} />
        <Stack.Screen
          name="CreateGroupAccount"
          component={CreateGroupAccount}
        />
        <Stack.Screen
          name="CreateJointAccounts"
          component={CreateJointAccounts}
        />
        <Stack.Screen name="AllGroups" component={AllGroups} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default React.memo(Screenstack);
