import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { AdMobRewarded, AdMob, setTestDeviceIDAsync } from 'expo-ads-admob';
import TouchableButton from './TouchableButton';
import Constants from '../Constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { connect } from 'react-redux';
import { updateCoins } from '../redux/reducers/coins';
import { store } from '../redux/store/store';

class AdMobRewardedComponent extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = store.subscribe(this.handleChange);
    this.state = {
      loadedAd: false,
      credits: this.props.coins.coins
    };
  }
    
  selectCoins = (state) => {
    return state.coins.coins;
  }

  handleChange = () => {
    this.setState({ credits: this.selectCoins(store.getState()) })
  }

 createAndLoadRewardedAd = async () => {
    await setTestDeviceIDAsync("EMULATOR");
    AdMobRewarded.setAdUnitID("your-ad-id");

    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
      this.setState({ loadedAd: true })
    console.log("VideoLoaded")
    });
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
    console.log("FailedToLoad")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidStart", () =>
    console.log("VideoStarted")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidComplete", () =>
    console.log("VideoComplete")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
    console.log("Opened")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidClose", () => {
      AdMobRewarded.requestAdAsync();
      console.log("Closed")
    });
    AdMobRewarded.addEventListener("rewardedVideoWillLeaveApplication", () =>
    console.log("LeaveApp")
    );
    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () => {
      this.setState({
        credits: this.state.credits + 30 
      }, () => {
        this.props.dispatch(updateCoins(this.state.credits));
        console.log("Rewarded");
      });
    }

    );
      await AdMobRewarded.requestAdAsync();
}


async componentDidMount() {
  this.setState({ loadedAd: true })
  this.createAndLoadRewardedAd();
}

componentWillUnmount() {
  this.setState({ loadedAd: false })
  AdMobRewarded.removeAllListeners();
  this.unsubscribe();
}

_handlePress = async () => {
  await AdMobRewarded.showAdAsync();
};

render() {
  const { loadedAd } = this.state;
  return (
  <TouchableButton onPress={this._handlePress} image="adButton" inactive={!this.state.loadedAd} style={styles.adButton} resizeMode="stretch" />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  adButton: {
    position: 'absolute',
    left: moderateScale(0),
    top: verticalScale(158),
    width: moderateScale(161),
    height: verticalScale(120),
    resizeMode: 'contain'
  },
});

const mapStateToProps = state => ({
  coins: state.coins
});

export default connect(mapStateToProps)(AdMobRewardedComponent);
