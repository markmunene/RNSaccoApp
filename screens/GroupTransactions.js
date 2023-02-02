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

import React from 'react';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
function RenderTitle({navigation, title}) {
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
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.primary,
          padding: SIZES.padding,
          width: '80%',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
}
function RenderRequest({item}) {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
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
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.h4,

              color: COLORS.white,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              borderRadius: 15,
              marginRight: SIZES.padding / 2,
              backgroundColor: COLORS.secondary,
            }}>
            {item.Name.slice(0, 1)}
          </Text>

          <Text style={{...FONTS.h4, color: COLORS.primary}}>{item.Name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary,
              marginRight: 5,
            }}>
            {item.PhoneNumber}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
// const RenderTransactions
function RenderTransactions({item}) {
  return (
    <View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
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
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.h4,

              color: COLORS.white,
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              borderRadius: 15,
              marginRight: SIZES.padding / 2,
              backgroundColor: COLORS.secondary,
            }}>
            {item.Name.slice(0, 1)}
          </Text>

          <Text style={{...FONTS.h4, color: COLORS.primary}}>{item.Name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.primary,
              marginRight: 5,
            }}>
            {item.amount}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const GroupTransactions = ({navigation, route}) => {
  let {item, type} = route.params;

  const [data, setData] = React.useState([]);
  const [Istransactions, setIstransactions] = React.useState(false);
  React.useEffect(() => {
    if (type == 'members') {
      setIstransactions(false);
    } else {
      setIstransactions(true);
    }
  }, [route.params]);
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} title={type} />
      {/* renderRequuest */}
      <View
        style={{
          width: '100%',
          height: '80%',
        }}>
        <FlatList
          data={item}
          renderItem={({item}) =>
            Istransactions ? (
              <RenderTransactions item={item} />
            ) : (
              <RenderRequest item={item} />
            )
          }
          keyExtractor={(item, index) => index.toString() + item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(GroupTransactions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
