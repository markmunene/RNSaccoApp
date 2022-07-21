import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import React from 'react';

import firestore from '@react-native-firebase/firestore';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import UserData from './UsersData';

import {useSelector} from 'react-redux';

const CreateGroupAccount = ({navigation}) => {
  const [SearchText, setSearchText] = React.useState('');
  const [SelectedUsers, setSelectedUsers] = React.useState([]);
  const [StateUserData, setStateUserData] = React.useState([]);
  const [groupName, setgroupName] = React.useState('');
  const users = useSelector(state => state.users.AllusersMinData);

  React.useEffect(() => {
    let mount = true;
    if (mount) {
      setStateUserData(users);
    }

    return () => {
      mount = false;
    };
  }, []);

  // function to save users in a group
  const HandleSubmit = async () => {
    // save the group name
    // save the users in the group
    // navigate to the group screen
    const groupData = {
      groupName: groupName,
      users: SelectedUsers,
      date: Date.now(),
    };
    await firestore()
      .collection('groups')
      .add({
        ...groupData,
      })
      .then(() => {
        console.log('group saved successfully');
      });
  };

  const onSearch = text => {
    setSearchText(text);
    let SelectedUsers = [];

    if (!text == undefined || !text == '') {
      SelectedUsers = users.filter(item => {
        return item.Name.toLowerCase().includes(text.toLowerCase());
      });
      setStateUserData(SelectedUsers);
    } else {
      setStateUserData(users);
    }
  };
  const RemoveSearchedResults = ({id}) => {
    let newUserData = SelectedUsers.filter(item => {
      return item.id != id;
    });
    setSelectedUsers(newUserData);
  };
  const HandleUserSelection = ({item}) => {
    let newArray = [];
    if (SelectedUsers.length < 10) {
      if (SelectedUsers.length == 0) {
        newArray.push(item);

        return setSelectedUsers(newArray);
      }

      setSelectedUsers([...SelectedUsers, item]);
    }
  };

  function RenderUsers({item}) {
    return (
      <TouchableOpacity
        onPress={() => HandleUserSelection({item})}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 40,
          elevation: 5,
          backgroundColor: COLORS.lightGray,
          margin: SIZES.padding / 0.9,
          borderRadius: 3,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.primary,
            padding: SIZES.padding,
          }}>
          {item.Name}
        </Text>

        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.primary,
            padding: SIZES.padding,
          }}>
          {item.IdNo}
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: 40}}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 30, height: 30, tintColor: COLORS.primary}}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...FONTS.h3,
            marginRight: SIZES.padding,
            color: COLORS.primary,
          }}>
          Create Group Account
        </Text>
      </View>
      <ScrollView
        style={{width: '100%', height: '100%'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{height: '70%'}}>
          <View
            style={{
              height: 40,
              width: '90%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <TextInput
              placeholderTextColor={COLORS.primary}
              placeholder="search Here"
              value={SearchText}
              onChangeText={text => onSearch(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                width: 20,
                height: 40,
                alignSelf: 'center',
                tintColor: COLORS.primary,
              }}
            />
          </View>
          {/* testing */}
          <View
            style={{
              width: '95%',
              borderRadius: 10,
              alignSelf: 'center',
              height: 250,
              backgroundColor: COLORS.white,
              borderColor: COLORS.primary,
              borderWidth: 1,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {StateUserData.map((item, index) => (
                <RenderUsers item={item} key={index.toString() + item.id} />
              ))}
            </ScrollView>
          </View>
          <View>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.primary,
                textAlign: 'center',
                margin: SIZES.padding / 0.7,
              }}>
              Selected Members
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '95%',
              alignSelf: 'center',
              height: 100,
              marginTop: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {SelectedUsers?.map((item, index) => (
                <View
                  key={index.toString() + item.id}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.primary,
                      padding: SIZES.padding,
                    }}>
                    {item.Name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      let id = item.id;
                      return RemoveSearchedResults({id});
                    }}>
                    <Image
                      source={icons.del}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        alignSelf: 'center',
                        tintColor: 'red',
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...FONTS.h4,
                      color: COLORS.primary,
                      padding: SIZES.padding,
                    }}>
                    {item.IdNo}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        {/* Y9PZY5IZP7XKV4PN */}
        <View style={{height: '30%', marginTop: SIZES.padding2 * 3}}>
          <View
            style={{
              height: 40,
              width: '90%',
              padding: SIZES.padding,
              borderColor: COLORS.primary,
              borderWidth: 1,
              flexDirection: 'row',
              margin: SIZES.padding,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <TextInput
              placeholderTextColor={COLORS.primary}
              placeholder="Joint Account Name"
              value={groupName}
              onChangeText={text => setgroupName(text)}
              style={{
                width: '90%',
                height: 40,
                alignSelf: 'center',
                color: COLORS.primary,
              }}
            />
            <Image
              source={icons.card}
              resizeMode="contain"
              style={{
                width: 20,
                height: 40,
                alignSelf: 'center',
                tintColor: COLORS.primary,
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.secondary,
              height: 40,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
            }}
            onPress={() => HandleSubmit()}>
            <Text
              style={{...FONTS.h2, color: COLORS.white, textAlign: 'center'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(CreateGroupAccount);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    padding: SIZES.padding,
  },
});
