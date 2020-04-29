import React, {PureComponent} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Button, View, SafeAreaView, Image, Navigator, Vibration, Text, StatusBar, Dimensions } from 'react-native';
import Constants from './Constants';
import ReelSet from './components/ReelSet';
import Images from './assets/Images';
import TouchableButton from './components/TouchableButton';
import TouchableSwitch from './components/TouchableSwitch';
import Modal from 'react-native-modal';
import Loader from './components/Loader';
import PopUp from './components/PopUp';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useFonts } from '@use-expo/font';

import { connect } from 'react-redux';
import { updateCoins } from './redux/reducers/coins';


class Slots extends PureComponent {
  static navigationOptions = { headerShown: false };
  constructor(props){
    super(props);
    this.reelSet = null;

    this.state = {
      bet: 10,
      spinButtonActive: true,
      credits: this.props.coins.coins,
      loaderVisible: false,
      popupVisible: false,
      betMinusButtonActive: true,
      betPlusButtonActive: true
    }
  }

  spin = () => {
    if (this.state.credits - this.state.bet < 0) {
      alert("Insufficient Coins!")
      return;
    }
    this.setState({
      credits: this.state.credits - this.state.bet,
      spinButtonActive: false,
      betButtonActive: false
    }, () => {
      this.reelSet.spin();
      this.props.dispatch(updateCoins(this.state.credits));
    });
  }

  onReelsetReady = () => {
    this.setState({
      spinButtonActive: true,
      betButtonActive: true
    })
  }

  changeBet = (direction) => {
    let currentIndex = null;
    Constants.BETS.map(( el,idx ) => {
      if (el === this.state.bet){
        currentIndex = idx;
      }
    });
    let nextIndex = currentIndex + direction;
    if (nextIndex === 0) {
      this.setState({betMinusButtonActive: false});
    } else if (nextIndex === Constants.BETS.length - 1) {
      this.setState({betPlusButtonActive: false})
    }
    if (nextIndex !== 0) {
      this.setState({betMinusButtonActive: true})
    }
    if (nextIndex !== Constants.BETS.length - 1) {
      this.setState({betPlusButtonActive: true})
    }

    this.setState({
      bet: Constants.BETS[nextIndex]
    });
  }



  render() {
    const {loaderVisible, popupVisible} = this.state;
    return (
      <View style={styles.container}>
      <StatusBar hidden={true} />
          <Image style={styles.backgroundImage} source={Images.background} resizeMode="stretch" />
          <View style={styles.topBar}>
            <Image style={styles.backgroundTopBar} source={Images.backgroundTop} resizeMode="stretch" />
            <TouchableSwitch status="active" style={styles.buttonSound} image="buttonSound" />
            <TouchableButton status="active" onPress={() => this.props.navigation.navigate('Home')} style={styles.buttonHome} image="buttonHome"  />
            <TouchableButton status="active" style={styles.buttonInfo} image="buttonInfo" />
          </View>
          <Image style={styles.mainBackground} source={Images.mainBackground} reziseMode="stretch" />
          <View style={styles.main}>
            <View style={styles.mainBox}>
              <ReelSet ref={(ref) => {this.reelSet = ref;}} onReady={this.onReelsetReady} />
            </View>
          </View>
          <View style={styles.bottomBar}>
              <Image style={styles.backgroundBottomBar} source={Images.backgroundBottom} resizeMode="stretch" />
              <TouchableButton onPress={this.spin} style={styles.buttonSpin} inactive={!this.state.spinButtonActive} image="buttonSpin" />
              <Text style={this.creditValue}>{this.state.credits}</Text>
            
            <View style={styles.betContainer}>
              <TouchableButton
                onPress={() => { this.changeBet(-1); } }
                style={styles.buttonBetMinus}
                inactive={!this.state.betMinusButtonActive}
                image="buttonBetMinus" />

              <View styles={styles.betDisplayContainer}>
                <Text style={styles.betTitle}>BET</Text>
                <Text style={styles.betValue}>{this.state.bet}</Text>
              </View>

              <TouchableButton
                onPress={() => { this.changeBet(1); } }
                style={styles.buttonBetPlus}
                inactive={!this.state.betPlusButtonActive}
                image="buttonBetPlus" />
            </View>

          </View>
          <Loader modalVisible={loaderVisible} animationType="fade" />
          <PopUp modalVisible={popupVisible} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  topBar: {
    width: Constants.MAX_WIDTH,
    height: verticalScale(200),
    justifyContent: 'center'
  },
  backgroundTopBar: {
    position: 'absolute',
    width: Constants.MAX_WIDTH,
    height: verticalScale(200),
  },
  mainBox: {
    position: 'absolute',
    width: scale(300),
    height: scale(175),
    alignSelf: 'center'
  },
  main: {
    width: scale(305),
    height: scale(237),
    padding: scale(10),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  mainBackground: {
    position: 'absolute',
    width: scale(350),
    height: scale(235),
    resizeMode: 'stretch',
    top: verticalScale(200),
    zIndex: 1
  },
  bottomBar: {
    width: Constants.MAX_WIDTH,
    height: scale(240),
    justifyContent: 'center',
    resizeMode: 'stretch'
  },
  backgroundBottomBar: {
    position: 'absolute',
    width: Constants.MAX_WIDTH,
    height: scale(290),
    justifyContent: 'center',
    resizeMode: 'stretch'
  },
  buttonSpin: {
    position: 'absolute',
    width: scale(100),
    height: scale(100),
    top: 0,
    right: moderateScale(0)
  },
  buttonSound: {
    position: 'absolute',
    width: scale(45),
    height: scale(45),
    left: moderateScale(10),
    bottom: verticalScale(10)
  },
  buttonHome: {
    position: 'absolute',
    width: scale(45),
    height: scale(45),
    right: moderateScale(5),
    bottom: verticalScale(10)
  },
  buttonInfo: {
    position: 'absolute',
    width: scale(45),
    height: scale(45),
    right: moderateScale(70),
    bottom: verticalScale(10)
  },
  creditValue: {
    position: 'absolute',
    justifyContent: 'center',
  },
  buttonBetMinus: {
    position: 'absolute',
    width: scale(45),
    height: scale(45),
    left: moderateScale(0)
  },
  buttonBetPlus: {
    position: 'absolute',
    width: scale(45),
    height: scale(45),
    right: moderateScale(0)
  },
  betTitle: {
    position: 'absolute',
    left: moderateScale(87),
    top: verticalScale(0)
  },
  betValue: {
    position: 'absolute',
    top: verticalScale(10),
    left: moderateScale(90),
    color: 'white',
    fontSize: scale(20)
  },
  betContainer: {
    position: 'absolute',
    top: verticalScale(30),
    height: verticalScale(50),
    width: moderateScale(200),
    left: moderateScale(20)
  }
});

const mapStateToProps = state => ({
  coins: state.coins,
});

export default connect(mapStateToProps)(Slots);
