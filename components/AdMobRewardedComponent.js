import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { AdMobRewarded, AdMob, setTestDeviceIDAsync } from 'expo-ads-admob';
import TouchableButton from './TouchableButton';
import Constants from '../Constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import { connect } from 'react-redux';
import { updateCoins } from '../redux/reducers/coins';

class AdMobRewardedComponent extends Component {
state = {
loadedAd: false,
credits: this.props.coins.coins
};

 createAndLoadRewardedAd = async () => {
    await setTestDeviceIDAsync("EMULATOR");
    AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917");

    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
      this.setState({ loadedAd: true })
    console.log("VideoLoaded")
    });
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
    console.log("FailedToLoad")
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
    AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () =>
    console.log("Rewarded"),
    this.setState({
      credits: this.state.credits + 30 
      },() => {
        this.props.dispatch(updateCoins(this.state.credits))
      }),
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
  },
});

const mapStateToProps = state => ({
  coins: state.coins
});

export default connect(mapStateToProps)(AdMobRewardedComponent);

// MyUnitID ca-app-pub-6019783880494970/7765357807
// TestUnitID ca-app-pub-3940256099942544/5224354917
