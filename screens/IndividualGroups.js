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
import UserData from './UsersData';

const IndividualGroups = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <TouchableOpacity style={{padding: SIZES.padding}}>
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
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            textAlign: 'center',
            alignSelf: 'center',
            marginRight: SIZES.padding,
          }}>
          Individual Groups
        </Text>
      </View>
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          height: 200,
          backgroundColor: COLORS.white,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 10,
          borderColor: COLORS.primary,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.primary}}>Group Name</Text>
        <Text style={{...FONTS.h4, color: COLORS.primary}}>
          Members::: {UserData.length}
        </Text>
      </View>
      <View style={{width: '100%', height: '100%', marginTop: SIZES.padding}}>
        <FlatList
          data={UserData}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: SIZES.padding,
                alignSelf: 'center',
                backgroundColor: COLORS.white,
                borderWidth: 1,
                marginTop: SIZES.padding / 0.8,
                borderRadius: 10,
                borderColor: COLORS.primary,
              }}>
              <Text style={{...FONTS.h4, color: COLORS.primary}}>
                {item.name}
              </Text>

              <Text style={{...FONTS.h4, color: COLORS.primary}}>
                {item.IdNo}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString() + item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(IndividualGroups);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
