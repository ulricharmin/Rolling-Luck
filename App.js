import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Home from './Home';
import Slots from './Slots';
import Shop from './Shop';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/store';
import { Audio } from 'expo';
import * as Font from 'expo-font';


export default class App extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      fontLoaded: false
    }
  }

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
        headerMode: 'none',
        defaultNavigationOptions: {
          ...TransitionPresets.SlideFromRightIOS
        }
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
