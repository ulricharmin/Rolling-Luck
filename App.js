import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { flipX } from 'react-navigation-transitions';
import SplashScreen from 'react-native-splash-screen'
import Home from './Home';
import Slots from './Slots';
import Shop from './Shop';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/store';
import { Audio } from 'expo';


export default class App extends PureComponent {

  render() {

    return(
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
    )
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home

  },
  Slots: {
    screen: Slots

  },
  Shop: {
    screen: Shop
  },

},{
        initialRouteName: "Home",
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
