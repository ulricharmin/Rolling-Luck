import React, {PureComponent} from 'react';
import { StyleSheet, View, Image, StatusBar, ActivityIndicator, Text, Modal, Button } from 'react-native';
import Constants from './Constants';
import ReelSet from './components/ReelSet';
import Images from './assets/Images';
import TouchableButton from './components/TouchableButton';
import TouchableSwitch from './components/TouchableSwitch';
import Loader from './components/Loader';
import PopUp from './components/PopUp';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Font from 'expo-font';

import { connect } from 'react-redux';
import { updateCoins } from './redux/reducers/coins';
import { updateSpinner } from './redux/reducers/spinner';


class Slots extends PureComponent {
  static navigationOptions = { headerShown: false };
  constructor(props){
    super(props);
    this.reelSet = null;

    this.state = {
      bet: 10,
      spinButtonActive: true,
      credits: this.props.coins.coins,
      spinner: false,
      popupVisible: false,
      betMinusButtonActive: true,
      betPlusButtonActive: true,
      fontLoaded: false
    }
  }

  async componentDidMount() {

    await Font.loadAsync({
      'Impact': require('./assets/fonts/impact.ttf')
    });
    
    this.setState({ fontLoaded: true });
  }

  spin = () => {
    if (this.state.credits - this.state.bet <= 0) {
      return;
    }
    this.setState({
      credits: this.state.credits - this.state.bet,
      spinButtonActive: false,
      betButtonActive: false,
      popupVisible: false
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
    const {spinner, popupVisible} = this.state;
    return (
      
      <View style={styles.container}>
      <StatusBar hidden={true} />
         
          <View style={styles.topBar}>
            <Image style={styles.backgroundTopBar} source={Images.backgroundTop}/>
            <TouchableSwitch status="active" style={styles.buttonSound} image="buttonSound" />
            <TouchableButton status="active" onPress={() => this.props.navigation.navigate('Home')} style={styles.buttonHome} image="buttonHome"  />
            <TouchableButton status="active" style={styles.buttonInfo} image="buttonInfo" />
          </View>
          <Image style={styles.mainBackground} source={Images.mainBackground} resizeMode="stretch" />
          <Image style={styles.background} source={require('./assets/img/Ablage/background.jpg')} />
          <View style={styles.main}>
            <View style={styles.mainBox}>
              <ReelSet ref={(ref) => {this.reelSet = ref;}} onReady={this.onReelsetReady} />
            </View>
          </View>
          <View style={styles.bottomBar}>
              <Image style={styles.backgroundBottomBar} source={Images.backgroundBottom} resizeMode="stretch" />
              <TouchableButton onPress={this.spin} style={styles.buttonSpin} inactive={!this.state.spinButtonActive} image="buttonSpin" />
              
              {this.state.fontLoaded?
                <Text style={styles.creditValue}>{this.state.credits}</Text>
                : (
                <ActivityIndicator size="large" />
                )}
            
            <View style={styles.betContainer}>
              <TouchableButton
                onPress={() => { this.changeBet(-1); } }
                style={styles.buttonBetMinus}
                inactive={!this.state.betMinusButtonActive}
                image="buttonBetMinus" />

              <View styles={styles.betDisplayContainer}>
              {this.state.fontLoaded?
                                <Text style={styles.betTitle}>BET</Text>
                : (
                <ActivityIndicator size="large" />
                )}

              <Text style={styles.betValue}>{this.state.bet}</Text>
              </View>

              <TouchableButton
                onPress={() => { this.changeBet(1); } }
                style={styles.buttonBetPlus}
                inactive={!this.state.betPlusButtonActive}
                image="buttonBetPlus" />
            </View>

          </View>
          <Loader modalVisible={spinner} animationType="fade" />
          <PopUp modalVisible={popupVisible} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'contain'
  },
  background: {
    height: verticalScale(200),
    width: Constants.MAX_WIDTH,
    position: 'absolute',
    top: verticalScale(260),
    zIndex: -1
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
    height: verticalScale(255),
    width: '100%'
  },
  backgroundTopBar: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
  }, 
  mainBox: {
    position: 'absolute',
    width: scale(300),
    height: scale(195),
    alignSelf: 'center',
    justifyContent: 'center',
    top: -10
  },
  main: {
    width: scale(305),
    height: scale(237),
    padding: scale(10),
    top: verticalScale(15),
    alignSelf: 'center',
  },
  mainBackground: {
    position: 'absolute',
    width: scale(350),
    height: scale(245),
    resizeMode: 'stretch',
    top: verticalScale(238),
    zIndex: 1
  },
  bottomBar: {
    width: Constants.MAX_WIDTH,
    height: scale(255),
    justifyContent: 'center'
  },
  backgroundBottomBar: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%'
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
    bottom: verticalScale(20)
  },
  buttonHome: {
    position: 'absolute',
    width: scale(45),
    height: scale(45),
    right: moderateScale(5),
    bottom: verticalScale(20)
  },
  buttonInfo: {
    position: 'absolute',
    width: scale(45),
    height: scale(45),
    right: moderateScale(70),
    bottom: verticalScale(20)
  },
  creditValue: {
    bottom: verticalScale(100),
    alignSelf: 'center',
    fontSize: scale(20),
    color: 'white',
    fontFamily: 'Impact'
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
    top: verticalScale(0),
    color: 'white',
    fontSize: scale(20),
    fontFamily: 'Impact'
  },
  betValue: {
    position: 'absolute',
    top: verticalScale(20),
    left: moderateScale(90),
    color: 'white',
    fontSize: scale(20),
    fontFamily: 'Impact'
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
  spinner: state.spinner
});

export default connect(mapStateToProps)(Slots);
