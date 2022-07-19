import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import UserData from './UsersData';

import moment from 'moment';

import {useSelector} from 'react-redux/';

import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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
function RenderRequest({item}) {
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
          <Text style={{...FONTS.h4, color: COLORS.primary}}>{item.Name}</Text>
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
          <TouchableOpacity
          // onPress={() => { }}
          >
            <Image
              source={icons.trash}
              resizeMode="contain"
              style={{width: 25, height: 25, tintColor: 'red'}}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const Allusers = ({navigation}) => {
  const Users = useSelector(state => state.users.Users);

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
          renderItem={({item}) => <RenderRequest item={item} />}
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
