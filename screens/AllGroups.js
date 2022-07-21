import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { icons, images, COLORS, SIZES, FONTS } from '../constants';
import { useSelector } from 'react-redux';


const AllGroups = ({ navigation }) =>
{
  const [shiftBewteenGroups, setShiftBewteenGroups] = React.useState(false);

  const HandleToggle = () => {
    setShiftBewteenGroups(false);
  };
  const HandleToggle2 = () => {
    setShiftBewteenGroups(true);
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
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 30, height: 30, tintColor: COLORS.primary}}
          />
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
            <Text style={{textAlign: 'center'}}>Groups</Text>
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
            <Text>Joints</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          padding: SIZES.padding,
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 40,
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 10,
            borderColor: COLORS.primary,
            borderWidth: 1,
            alignSelf: 'center',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding,
          }}>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.primary,
              textAlign: 'center',
            }}>
            GroupName
          </Text>
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.primary,
              textAlign: 'center',
            }}>
            89-789-9000
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(AllGroups);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
