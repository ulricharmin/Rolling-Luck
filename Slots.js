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
import { store } from './redux/store/store';
import { updateCoins } from './redux/reducers/coins';
import { updateBet } from './redux/reducers/bet';
import { updateSpinner } from './redux/reducers/spinner';


class Slots extends PureComponent {
  static navigationOptions = { headerShown: false };
  constructor(props){
    super(props);
    this.reelSet = React.createRef();
    this.unsubscribe = store.subscribe(this.handleChange);
    this.state = {
      spinButtonActive: true,
      bet: this.props.bet.bet,
      credits: this.props.coins.coins,
      spinner: false,
      infoVisible: false,
      betMinusButtonActive: true,
      betPlusButtonActive: true,
      fontLoading: true
    };
  }

  async componentDidMount() {

    await Font.loadAsync({
      'Impact': require('./assets/fonts/impact.ttf')
    });
    
    this.setState({ fontLoading: false });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  selectCoins = (state) => {
    return state.coins.coins;
  }

  selectBet = (state) => {
    return state.bet.bet;
  }

  handleChange = () => {
    this.setState({ credits: this.selectCoins(store.getState()), bet: this.selectBet(store.getState()) })
  }


  spin = () => {
    if (this.state.credits - this.state.bet < 0) {
      return;
    }
    this.setState({
      credits: this.state.credits - this.state.bet,
      spinButtonActive: false,
      betButtonActive: false,
      popupVisible: false,
    }, () => {
      this.reelSet.current.spin(false);
      this.props.dispatch(updateCoins(this.state.credits));
    });
  }

  onReelsetReady = () => {
    this.setState({
      spinButtonActive: true,
      betButtonActive: true
    });
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
    }, () => {
      this.props.dispatch(updateBet(this.state.bet));
    });
  }

  infoPopUp = () => {
    this.setState({ infoVisible: true });
  }
  closeInfo = () => {
    this.setState({ infoVisible: false });
  }

  onScatter = () => {
    this.setState({})
    setTimeout(() => {
      this.setState({
        spinButtonActive: false,
        betButtonActive: false
       }, () => {
         this.props.dispatch(updateCoins(this.state.credits));
       });
        if (this.state.spinButtonActive === false && this.state.betButtonActive === false) {
          this.reelSet.current.bonusSpins();
        } else {
          console.log("Fehler")
        }
    }, 1000)
  }
  
  render() {
    if (this.state.fontLoading) {
      return (
        <View>
          <Text>Loading Font</Text>
        </View>
      );
    }
      return (
      <View style={styles.container}>
      <Modal visible={this.state.infoVisible} transparent={true} >
        <View style={styles.infoView}>
          <View style={styles.infoBox} >
            <TouchableButton status="active" image="closeInfo" style={styles.closeInfo} onPress={this.closeInfo}/>
            <Image source={Images.infoImage} style={styles.infoModal} />
          </View>
        </View>
        <View>
        </View>
      </Modal>
      <StatusBar hidden={true} />
          <View style={styles.topBar}>
            <Image style={styles.backgroundTopBar} source={Images.backgroundTop}/>
            <TouchableSwitch status="active" style={styles.buttonSound} image="buttonSound" />
            <TouchableButton status="active" onPress={() => this.props.navigation.navigate('Home')} style={styles.buttonHome} image="buttonHome"  />
            <TouchableButton status="active" style={styles.buttonInfo} image="buttonInfo" onPress={this.infoPopUp} />
            <Text style={styles.creditValue}>{this.state.credits}</Text>
          </View>
          <Image style={styles.mainBackground} source={Images.mainBackground} resizeMode="stretch" />
          <Image style={styles.background} source={Images.slotsBackground} resizeMode="stretch" />
          <View style={styles.main}>
            <View style={styles.mainBox}>
              
              <ReelSet ref={this.reelSet} onReady={this.onReelsetReady} onScatter={this.onScatter} />
              
            </View>
          </View>
          <View style={styles.bottomBar}>
            <Image style={styles.backgroundBottomBar} source={Images.backgroundBottom} resizeMode="stretch" />
            <TouchableButton onPress={this.spin} style={styles.buttonSpin} inactive={!this.state.spinButtonActive} image="buttonSpin" />
            <Text style={styles.creditValue}></Text>
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
    position: 'absolute',
    width: scale(350),
    height: scale(245),
    resizeMode: 'stretch',
    top: verticalScale(238),
    zIndex: -1
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
    width: scale(305),
    height: scale(190),
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  main: {
    width: scale(305),
    height: scale(237),
    padding: scale(10),
    top: verticalScale(10),
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center'
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
    top: -15,
    height: scale(260),
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
  },
  infoModal: {
    width: scale(270),
    height: scale(410),
  },
  infoBox: {
    width: scale(270),
    height: scale(410),
    alignSelf: 'center',
    top: verticalScale(150)
  },
  infoView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%'
  },
  closeInfo: {
    position: 'absolute',
    width: scale(35),
    height: scale(35),
    right: 0,
    zIndex: 2,
  }
});

const mapStateToProps = state => ({
  coins: state.coins,
  spinner: state.spinner,
  bet: state.bet
});

export default connect(mapStateToProps)(Slots);
