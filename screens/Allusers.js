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
  const dispatch = useDispatch();
  function RenderRequest({item, navigation}) {
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
  const Users = useSelector(state => state.users.Users);
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
        <FlatList
          data={Users}
          renderItem={({item}) => (
            <RenderRequest item={item} navigation={navigation} />
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
