import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {useSelector, useDispatch} from 'react-redux';
import ModalFilterPicker from 'react-native-modal-filter-picker';

import moment from 'moment';

const JamboSavings = ({navigation}) => {
  const [showStatement, setShowStatement] = React.useState(false);
  const deposit = useSelector(state => state.deposit.deposit);
  // console.log(AccountBalance);
  const [DepositData, setDepositData] = React.useState([]);
  const AccountBalance = useSelector(state => state.deposit.depositBalance);
  const [AccountBalanceData1, setAccountBalanceData1] = React.useState([]);

  const [DepositDataForFilter, setDepositDataForFilter] = React.useState([]);
  const [filteredAccountBalance, setfilteredAccountBalance] = React.useState(
    [],
  );

  const [ModalVisible, setModalVisible] = React.useState(false);
  const [SelectedUserId, setSelectedUserId] = React.useState('');
  // let user = useSelector(state => state.users.AllusersMinData);
  let options = useSelector(state => state.users.userDataforModal);

  const onSearch = text => {
    // console.log(text, 'texttttttttttttttttttttttttttttttt');

    setSelectedUserId(text);
    setModalVisible(false);
    let tempDepositData = DepositDataForFilter.filter(
      deposit => deposit.userId == text.key,
    );
    let tempBalance = AccountBalanceData1.filter(bal => {
      if (bal.userId == text.key) {
        return bal;
      }
    });
    // console.log(tempBalance, 'tempBalance');
    setfilteredAccountBalance(tempBalance);
    setDepositData(tempDepositData);
  };

  const AuthUser = useSelector(state => state.users.AuthUser);
  React.useEffect(() => {
    // let depositData = useSelector(state => state.deposit.deposit);
    let temp = [];

    deposit.filter(deposit => {
      if (deposit.accountType == 'jamboAccount') {
        // console.log(deposit);
        temp.push(deposit);
      }
    });
    let tempBalance = [];
    AccountBalance.filter(bal => {
      if (bal.AccountType == 'jamboAccount') {
        // console.log(deposit);
        tempBalance.push(bal);
      }
    });
    setAccountBalanceData1(tempBalance);
    setDepositDataForFilter(temp);
    setDepositData(temp);
  }, [deposit]);

  function ReanderStatements() {
    return (
      <View
        style={{
          width: '100%',
          height: '70%',
          backgroundColor: COLORS.white,
          padding: SIZES.padding2,
          borderColor: COLORS.primary,
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <FlatList
          data={DepositData}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Text style={{...FONTS.body3, color: COLORS.primary}}>
                  Kes {item.amount}
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.primary}}>
                  {item.depositMethod}
                </Text>
                <Text style={{...FONTS.body3, color: COLORS.primary}}>
                  {moment(item.date).format('MMMM Do YYYY')}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString() + item.id}
        />
      </View>
    );
  }

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
      <ModalFilterPicker
        visible={ModalVisible}
        onSelect={value => onSearch(value)}
        onCancel={() => setModalVisible(false)}
        options={options}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(!ModalVisible)}
        style={{
          width: '90%',
          height: 40,
          alignSelf: 'center',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
        }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.black,
            textAlign: 'center',
          }}>
          select User
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: 'center',
          ...FONTS.h4,
          color: COLORS.primary,
          marginTop: SIZES.padding / 0.7,
        }}>
        {SelectedUserId.label}
      </Text>
      <View
        style={{
          width: '95%',
          height: '30%',
          padding: SIZES.padding2,
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          borderRadius: 10,
          borderColor: COLORS.primary,
          borderWidth: 1,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.primary}}>Jambo Account</Text>
        <Text style={{...FONTS.h2, color: COLORS.secondary}}>
          Ksh
          {/* .filter(item => item.userId === AuthUser[0].uid) */}
          {filteredAccountBalance[0]?.balance}
        </Text>

        <Text style={{...FONTS.h4, color: COLORS.primary}}>
          Available Balance
        </Text>
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            height: '75%',
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
      </View>
      <View
        style={{
          width: '100%',
          height: '65%',
          padding: SIZES.padding,
          marginTop: SIZES.padding2 * 2,
        }}>
        {showStatement && <ReanderStatements />}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(JamboSavings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
