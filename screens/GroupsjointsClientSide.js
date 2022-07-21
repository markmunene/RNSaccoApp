import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {useSelector} from 'react-redux';

const GroupjointsClientSide = ({navigation}) => {
  let depositData = useSelector(state => state.deposit.deposit);

  const groups = useSelector(state => state.accounts.groups);
  const joints = useSelector(state => state.accounts.joints);

  const [GroupsState, setGroupsState] = React.useState('');
  const [GroupsTransactions, setGroupsTransactions] = React.useState('');

  const [shiftBewteenGroups, setShiftBewteenGroups] = React.useState(false);

  React.useEffect(() => {
    let mount = true;
    let tempData = [];
    depositData.filter(item => {
      if (item.accountType == 'group' || item.accountType == 'Joint') {
        tempData.push(item);
      }
    });
    setGroupsTransactions(tempData);

    if (mount) {
      setGroupsState(groups);
      if (shiftBewteenGroups) {
        setGroupsState(joints);
      } else {
        setGroupsState(groups);
      }

      return () => {
        mount = false;
      };
    }
  }, [shiftBewteenGroups]);

  const HandleToggle = () => {
    setShiftBewteenGroups(false);
  };
  const HandleToggle2 = () => {
    setShiftBewteenGroups(true);
  };

  const LoanDetails = ({item}) => {
    const [showStatement, setShowStatement] = React.useState(false);
    const [showDetails, setShowDetails] = React.useState(false);

    const HandleShowDetails = () => {
      setShowDetails(!showDetails);
    };
    const handleDeposit = ({item}) => {
      HandleShowDetails();
      navigation.navigate('DepositAccount', {item});
    };
    const HandleTranscation = id => {
      let Transactions = depositData.filter(item => item.groupId == id.id);

      navigation.navigate('GroupTransactions', {
        type: 'Transactions',
        item: Transactions,
      });
    };

    const [handleStatement, setHandleStatement] = React.useState(200);

    React.useEffect(() => {
      let mount = true;
      if (mount) {
        if (showStatement) {
          setHandleStatement(400);
        } else {
          setHandleStatement(200);
        }
      }
    }, [showStatement]);
    return (
      <View style={{height: handleStatement, margin: 10}}>
        <View
          style={{
            width: '95%',
            height: 200,
            marginTop: 5,
            // padding: SIZES.padding2,
            alignSelf: 'center',
            backgroundColor: COLORS.white,
            borderRadius: 10,
            borderColor: COLORS.primary,
            borderWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{padding: SIZES.padding2, width: '60%'}}>
              <Text style={{...FONTS.h2, color: COLORS.primary}}>
                Total Savings
              </Text>
              <Text style={{...FONTS.h2, color: COLORS.secondary}}>
                Ksh{' '}
                {depositData
                  .filter(DepData => DepData.groupId == item.id)
                  .reduce((acc, item) => acc + Number(item.amount), 0)}
              </Text>

              <Text style={{...FONTS.h4, color: COLORS.primary}}>
                Total Members: {item.users.length}
              </Text>
              <Text style={{...FONTS.h4, color: COLORS.primary}}>
                Group Name:: {item.groupName}
              </Text>
            </View>
            <View
              style={{
                padding: SIZES.padding2,
                width: '33%',
                flexDirection: 'row',
              }}>
              {showDetails ? (
                <TouchableOpacity
                  onPress={() => handleDeposit({item})}
                  style={{
                    backgroundColor: COLORS.secondary,
                    width: 80,
                    height: 35,
                    marginRight: 20,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.white,
                      textAlign: 'center',
                      padding: 5,
                    }}>
                    deposit
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{marginLeft: '70%', width: '30%'}}
                  onPress={() => HandleShowDetails()}>
                  <Image
                    source={icons.dots}
                    style={{width: 30, height: 30, tintColor: COLORS.secondary}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              width: '100%',
              height: '38%',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: SIZES.padding,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('GroupTransactions', {
                    item: item.users,
                    type: 'members',
                  })
                }
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 20,
                  height: 35,
                  width: 80,
                  // padding: SIZES.padding,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.primary,
                    textAlign: 'center',
                  }}>
                  Members
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => HandleTranscation({id: item.id})}
                style={{
                  backgroundColor: 'transparent',
                  borderRadius: 20,
                  height: 35,
                  width: 110,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: COLORS.secondary,
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    ...FONTS.h4,
                    color: COLORS.white,
                    textAlign: 'center',
                    color: COLORS.secondary,
                  }}>
                  Transactions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SIZES.padding,
        }}>
        <View style={{width: '20%', height: 50, padding: SIZES.padding}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{width: 30, height: 30, tintColor: COLORS.primary}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '80%',
            height: 50,
            borderRadius: 40,
            backgroundColor: COLORS.white,
            flexDirection: 'row',
            justifyContent: 'space-between',

            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => HandleToggle()}
            style={{
              backgroundColor: shiftBewteenGroups ? 'white' : COLORS.secondary,
              padding: SIZES.padding,
              width: '45%',
              height: 50,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: shiftBewteenGroups ? COLORS.secondary : COLORS.white,
                ...FONTS.h3,
              }}>
              Groups
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => HandleToggle2()}
            style={{
              backgroundColor: shiftBewteenGroups ? COLORS.secondary : 'white',
              padding: SIZES.padding,
              width: '50%',
              height: 50,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: SIZES.padding * 2,
            }}>
            <Text
              style={{
                color: shiftBewteenGroups ? COLORS.white : COLORS.secondary,
                ...FONTS.h3,
              }}>
              Joints
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={GroupsState}
        keyExtractor={(item, index) => index.toString() + item.id}
        renderItem={({item}) => <LoanDetails item={item} />}
      />
    </SafeAreaView>
  );
};

export default React.memo(GroupjointsClientSide);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
