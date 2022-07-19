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
import React from 'react';
import {icons, images, COLORS, SIZES, FONTS} from '../constants';
import {BarChart} from 'react-native-chart-kit';

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
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.primary,
          padding: SIZES.padding,
          width: '80%',
          textAlign: 'center',
        }}>
        Loan Request Details
      </Text>
    </View>
  );
}
function RenderBarGraph() {
  const dataBar = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'july',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 20, 45, 28, 80, 99, 43],
      },
    ],
  };
  return (
    <View>
      <Text
        style={{
          ...FONTS.h3,
          textAlign: 'center',
          color: COLORS.primary,
          marginVertical: SIZES.padding,
        }}>
        Loan payment History
      </Text>
      <View
        style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
        <BarChart
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            fillShadowGradient: 'skyblue',
            fillShadowGradientOpacity: 1,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
              alignSelf: 'center',
              margin: SIZES.padding,
            },
          }}
          data={dataBar}
          width={SIZES.width}
          height={SIZES.height * 0.4}
          yAxisLabel="sh"
          verticalLabelRotation={50}
        />
      </View>
    </View>
  );
}

const IndividualSavings = ({navigation}) => {
  const [showStatement, setShowStatement] = React.useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '95%',
          height: '50%',
          padding: SIZES.padding2,
          alignSelf: 'center',
          backgroundColor: COLORS.white,
          borderRadius: 10,
          borderColor: COLORS.primary,
          borderWidth: 1,
        }}>
        <Text style={{...FONTS.h1, color: COLORS.primary}}>Loan Amount</Text>
        <Text style={{...FONTS.h2, color: COLORS.secondary}}>$ 3600</Text>
        <Text style={{...FONTS.h4, color: COLORS.primary}}>
          Name : Mark Munene
        </Text>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
            height: '40%',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.padding2,
              padding: SIZES.padding2,
              height: 50,
              alignSelf: 'center',
            }}>
            <Text style={{color: COLORS.white, ...FONTS.h4}}> Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.padding2,
              padding: SIZES.padding2,
              height: 50,
              alignSelf: 'center',
            }}>
            <Text
              style={{color: COLORS.white, textAlign: 'center', ...FONTS.h4}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            height: '40%',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h4, color: COLORS.primary}}>
            Loan Payment History
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
        {showStatement && <RenderBarGraph />}
      </View>
    </SafeAreaView>
  );
};
const LoanRequestDetails = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <RenderTitle navigation={navigation} />
      {/*  */}
      <IndividualSavings />
    </SafeAreaView>
  );
};

export default LoanRequestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
