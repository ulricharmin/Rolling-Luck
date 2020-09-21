import React, { Component, PureComponent } from 'react';
import AdMobRewardedComponent from './components/AdMobRewardedComponent';
import Constants from './Constants';
import Images from './assets/Images';
import TouchableButton from './components/TouchableButton';
import TouchableSwitch from './components/TouchableSwitch';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { connect } from 'react-redux';
import { updateCoins } from './redux/reducers/coins';

class Home extends PureComponent {
  static navigationOptions = { headerShown: false };
  constructor(props){
    super(props);
    this.state = {
      credits: this.props.coins.coins,
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
        <Image style={styles.backgroundImage} source={Images.homeBackground} resizeMode="cover" />
          <View style={styles.box}>
            <TouchableButton style={styles.buttonSlots} image="buttonSlots" onPress={() => this.props.navigation.navigate('Slots')} />
            <TouchableButton style={styles.buttonShop} image="buttonShop" onPress={() => this.props.navigation.navigate('Shop')} />
            <TouchableButton style={styles.buttonCS} image="buttonCS"/>
            <AdMobRewardedComponent/>
          </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  coinValue: {
    position: 'absolute',
    top: moderateScale(5)
  },
  box: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(317),
    height: verticalScale(609),
    bottom: verticalScale(30),
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  adButton: {
    position: 'absolute',
  },
  buttonSlots: {
     position: 'absolute',
     justifyContent: 'center',
     bottom: verticalScale(0),
     width: moderateScale(317),
     height: moderateScale(297),
   },
   buttonShop: {
     position: 'absolute',
     left: moderateScale(0),
     top: verticalScale(0),
     width: moderateScale(160),
     height: verticalScale(156),
   },
  buttonCS: {
    position: 'absolute',
    right: moderateScale(0),
    top: verticalScale(0),
    width: moderateScale(155),
    height: verticalScale(284),
    padding: scale(10),
  }
});

const mapStateToProps = state => ({
  coins: state.coins,
});

export default connect(mapStateToProps)(Home);