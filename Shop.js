import React, { Component, PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import TouchableButton from './components/TouchableButton';
import Images from './assets/Images';
import Constants from './Constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Dialog from 'react-native-dialog';

import { connect } from 'react-redux';
import { updateCoins } from './redux/reducers/coins';

class Shop extends PureComponent {
  static navigationOptions = { headerShown: false };
  constructor(props){
    super(props);
    this.state = {
      credits: this.props.coins.coins,
      visible: false
    }
  }

  dialogBoxGP = () => {
    this.setState({ visible: true })
  }

  handleSendEmail = () => {
    var AWS = require('aws-sdk');

    var s3 = new AWS.S3();
    var myBucket = 'rollingluck-bucket';
    var myKey = 'emails/adr-obj-2.txt';

    var params = {Bucket: myBucket, Key: myKey, Body: 'hallohallo'};

    s3.putObject(params, function(err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log("Successfully uploaded data to " + myBucket + "/" + myKey);
      }
    });
    
    this.setState({ visible: false });

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Submit Email</Dialog.Title>
          <Dialog.Input label="example@email.com"></Dialog.Input>
          <Dialog.Button label="OK" onPress={this.handleSendEmail} />
        </Dialog.Container>
        <TouchableButton style={styles.buttonBack} image="buttonBack" onPress={() => this.props.navigation.navigate('Home')} />
        <Text style={styles.creditValue}>{this.state.credits}</Text>
        <Image style={styles.backgroundImage} source={Images.homeBackground} resizeMode="stretch" />
          <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
            <TouchableButton style={styles.buttonGooglePlay} image="buttonGooglePlay" onPress={this.dialogBoxGP} />
            <TouchableButton style={styles.buttonPlayStation} image="buttonPlayStation" />
            <TouchableButton style={styles.buttonAmazon} image="buttonAmazon" />
            <TouchableButton style={styles.buttonXbox} image="buttonXbox" />
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  creditValue: {
    zIndex: 1,
  },
  buttonBack: {
    width: scale(45),
    height: scale(45),
    top: 5,
    right: 5,
    position: 'absolute',
    zIndex: 1
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
  buttonGooglePlay: {
    width: scale(300),
    height: scale(130),
    top: verticalScale(50)
  },
  buttonPlayStation: {
    width: scale(300),
    height: scale(130),
    top: verticalScale(60)
  },
  buttonAmazon: {
    width: scale(300),
    height: scale(130),
    top: verticalScale(70)
  },
  buttonXbox: {
    width: scale(300),
    height: scale(130),
    top: verticalScale(80)
  },
});

const mapStateToProps = state => ({
  coins: state.coins,
});

export default connect(mapStateToProps)(Shop);