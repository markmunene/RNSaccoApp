import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

export const StoreDeposit = deposit => {
  return async dispatch => {
    try {
      // await firestore()
      //   .collection('deposits')
      //   .add({...deposit.data});
      // await firestore()
      //   .collection('Accounts')
      //   .doc(deposit.data.userId + deposit.data.accountType)
      //   .set({
      //     balance: deposit.data.balance,
      //     userId: deposit.data.userId,
      //     AccountType: deposit.data.accountType,
      //     Date: moment().format('MMMM Do YYYY'),
      //   })
      //   .catch(error => {
      //     alert(error);
      //     console.log(error);
      //   });
      // listen for changes in the collection

      // console.log(accounts, 'accounts');

      // // listen to deposits collection
      // let deposits = firestore().collection('deposits');
      // deposits = deposits.where('userId', '==', deposit.data.userId);
      // deposits = deposits.limit(10);

      // deposits.onSnapshot(querySnapshot => {
      //   const depositsArray = [];
      //   let i = 0;
      //   querySnapshot.forEach(doc => {
      //     depositsArray.push(doc.data());
      //     depositsArray[i]['id'] = doc.id;
      //     i++;
      //   });
      //   dispatch({type: 'STORE_DEPOSIT', payload: depositsArray});
      //   dispatch({
      //     type: 'GET_ALL_DEPOSITS',
      //     payload: depositsArray,
      //   });
      // });
      console.log(deposit, 'deposit');
    } catch (error) {
      console.log(error);
    }
  };
};

export const HandleWithdrawal = withdrawal => {
  return async dispatch => {
    if (withdrawal.groupId != 'null') {
      let tempId = withdrawal.groupId + withdrawal.AccountType;

      await firestore()
        .collection('Accounts')
        .doc(tempId)
        .set({
          groupId: withdrawal.groupId,
          balance: withdrawal.balance,
          userId: withdrawal.userId,
          AccountType: withdrawal.AccountType,
          Date: moment().format('MMMM Do YYYY'),
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    } else {
      await firestore()
        .collection('Accounts')
        .doc(withdrawal.userId + withdrawal.AccountType)
        .set({
          balance: withdrawal.balance,
          userId: withdrawal.userId,
          AccountType: withdrawal.AccountType,
          Date: moment().format('MMMM Do YYYY'),
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  };
};

export const getAllDeposits = () => {
  return async dispatch => {
    try {
      const deposits = await firestore().collection('deposits').get();
      const AccountBalance = await firestore().collection('Accounts').get();
      const depositsArray = [];
      const AccountBalanceArray = [];
      AccountBalance.forEach(doc => {
        AccountBalanceArray.push({...doc.data(), id: doc.id});
      });
      deposits.forEach(doc => {
        depositsArray.push({...doc.data(), id: doc.id});
      });
      dispatch({type: 'GET_ALL_DEPOSITS', payload: depositsArray});
      // dispatch({type: 'getAllDepositBalance', payload: AccountBalanceArray});
    } catch (error) {
      console.log(error);
    }
  };
};
