import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';

import moment from 'moment';

import {useSelector, useDispatch} from 'react-redux/';

import React from 'react';

import {DeleteUser} from './Actions/RegisteredUsers';

function RenderTitle({navigation}) {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        marginTop: SIZES.padding,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        style={{padding: SIZES.padding, width: '20%'}}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            alignSelf: 'center',
            tintColor: COLORS.primary,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: SIZES.padding,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.primary,
            padding: SIZES.padding,

            textAlign: 'center',
          }}>
          Register Clients
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterClients')}
          style={{
            alignSelf: 'center',
            backgroundColor: COLORS.secondary,
            padding: SIZES.padding,
            marginRight: SIZES.padding * 2,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: COLORS.white,
            }}>
            New User
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const Allusers = ({navigation}) => {
  const Users = useSelector(state => state.users.Users);
  const [SearchText, setSearchText] = React.useState('');
 
  const [StateUserData, setStateUserData] = React.useState([]);

  React.useEffect(()=>{
let mount = true;
if(mount){
  setStateUserData(Users)
}
  },[])

  const onSearch = text => {
    setSearchText(text);
    let SelectedUsers = [];

    if (!text == undefined || !text == '') {
      SelectedUsers = Users.filter(item => {
        return item.Name.toLowerCase().includes(text.toLowerCase());
      });
      setStateUserData(SelectedUsers);
    } else {
      setStateUserData(Users);
    }
  };
  const dispatch = useDispatch();
  function RenderUsers({item, navigation}) {
    return (
      <View style={{width: '100%'}}>
        <Text
          style={{
            ...FONTS.body5,
            marginLeft: SIZES.padding2 * 2,
            color: COLORS.primary,
          }}>
          {moment(item?.date).fromNow()}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterClients', {item})}
          style={{
            width: '90%',
            height: 60,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            padding: SIZES.padding,
            borderWidth: 1,
            borderColor: COLORS.primary,
            margin: SIZES.padding * 0.3,
            borderRadius: 5,
            backgroundColor: COLORS.white,
            elevation: 3,
          }}>
          <View>
            <Text style={{...FONTS.h4, color: COLORS.primary}}>
              {item.Name}
            </Text>
            <Text style={{...FONTS.body5, color: COLORS.primary}}>
              {item.Phone}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text
              style={{
                ...FONTS.h4,
                color: COLORS.primary,
                marginRight: 5,
              }}>
              {item.IdNo}
            </Text>
            <TouchableOpacity onPress={() => HandleRequestDelete(item)}>
              <Image
                source={icons.trash}
                resizeMode="contain"
                style={{width: 20, height: 20, tintColor: 'red'}}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const HandleRequestDelete = async item => {
    // alert(item.id);
    Alert.alert(
      'delete action confirmation',
      'Are  u sure you want to delete this Member',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            try {
              dispatch(DeleteUser({id: item.id})) && navigation.goBack();
              // dispatch(DeleteLoanRequest({id: item.id}))
            } catch (error) {
              console.log('fire ', error);
            }
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} />
      {/* renderRequest */}
      <View
        style={{
          width: '100%',
          height: '80%',
        }}>
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
        <FlatList
          data={StateUserData}
          renderItem={({item}) => (
            <RenderUsers item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString() + item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Allusers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
