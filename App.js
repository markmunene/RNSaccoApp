import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {icons, images, COLORS, SIZES, FONTS} from './constants';
import ScreensStack from './ScreensStack';
import {Provider} from 'react-redux';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AllReducers from './screens/Redux/AllReducers';

const App = () => {
  const store = createStore(AllReducers, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <ScreensStack />
    </Provider>
  );
};

export default React.memo(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
