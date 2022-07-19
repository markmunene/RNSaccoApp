import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

// import RangeSlider from 'rn-range-slider';
import Slider from '@react-native-community/slider';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';

function RenderHeader({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: SIZES.padding,
      }}>
      <TouchableOpacity
        style={{height: 50, width: '20%'}}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          style={{
            height: 30,
            width: 30,
            tintColor: COLORS.primary,
            margin: SIZES.padding,
            padding: SIZES.padding,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{...FONTS.h2, color: COLORS.primary, alignSelf: 'center'}}>
          Loan Payment
        </Text>
      </View>
    </View>
  );
}
// render a title

function RenderRangeSlider() {
  const [RangeValue, setRangeValue] = React.useState(0);
  const [MinimumLoan, setMinimumLoan] = React.useState(0);
  const [MaximumLoan, setMaximumLoan] = React.useState(100);
  const [selectedValue, setSelectedValue] = React.useState(0);
  const DepositData = ['individual', 'jambo account', 'Joint', 'group'];

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: SIZES.padding2 * 3,
        }}>
        <View
          style={{
            width: '90%',
            height: 60,
            borderRadius: 5,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SIZES.padding2,
          }}>
          <Text style={{...FONTS.h2, color: 'white'}}>Kes {RangeValue}</Text>
        </View>
      </View>
      <Slider
        style={{
          width: '95%',
          height: 40,
          padding: SIZES.padding,
          margin: SIZES.padding,
          transform: [{scaleX: 3}, {scaleY: 3}],
        }}
        onValueChange={value => setRangeValue(value)}
        thumbTintColor={COLORS.primary}
        minimumValue={MinimumLoan}
        maximumValue={MaximumLoan}
        step={10}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor="#000000"
      />
      <View
        style={{
          width: '90%',
          height: 40,
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginLeft: SIZES.padding2,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.primary}}>
          Kes {MinimumLoan}
        </Text>
        <Text style={{...FONTS.h2, color: COLORS.primary}}>
          Kes {MaximumLoan}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: COLORS.secondary,
          width: '90%',
          height: 60,
          // marginTop: SIZES.padding2,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          alignSelf: 'center',
          elevation: 3,
        }}>
        <Text style={{...FONTS.h2, color: COLORS.white}}> Deposit</Text>
      </TouchableOpacity>
    </View>
  );
}
const LoanPayment = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader navigation={navigation} />

      <View style={{height: '85%', marginTop: 0}}>
        <RenderRangeSlider />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoanPayment);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
