import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';
import { AdMobRewarded, AdMob, setTestDeviceIDAsync } from 'expo-ads-admob';
import TouchableButton from './TouchableButton';
import Constants from '../Constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class AdMobRewardedComponent extends Component {
state = {
loadedAd: false
};

async componentDidMount() {
  await setTestDeviceIDAsync("EMULATOR");
  AdMobRewarded.setAdUnitID("ca-app-pub-3940256099942544/5224354917");

  AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
  console.log("VideoLoaded")
  });
  AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () =>
  console.log("FailedToLoad")
  );
  AdMobRewarded.addEventListener("rewardedVideoDidOpen", () =>
  console.log("Opened")
  );
  AdMobRewarded.addEventListener("rewardedVideoDidClose", () => {
    loadAd(request.build());
  console.log("Closed")
  });
  AdMobRewarded.addEventListener("rewardedVideoWillLeaveApplication", () =>
  console.log("LeaveApp")
  );
  AdMobRewarded.addEventListener("rewardedVideoDidStart", () =>
  console.log("Started")
  );
  AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", () =>
  console.log("Rewarded"),
  );
  await AdMobRewarded.requestAdAsync();
}

componentWillUnmount() {
  AdMobRewarded.removeAllListeners();
}

_handlePress = async () => {
  await AdMobRewarded.showAdAsync();
};

render() {
  const { loadedAd } = this.state;
  return (
  <TouchableButton onPress={this._handlePress} title="Coins erhalten!" image="adButton" status="active" style={styles.adButton}/>
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
    padding: scale(10),
  },
});

// MyUnitID ca-app-pub-6019783880494970/7765357807
// TestUnitID ca-app-pub-3940256099942544/5224354917
