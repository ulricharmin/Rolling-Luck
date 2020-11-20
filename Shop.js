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
import DialogInput from 'react-native-dialog-input';
import AWS from 'aws-sdk';

import { connect } from 'react-redux';
import { updateCoins } from './redux/reducers/coins';

class Shop extends PureComponent {
  static navigationOptions = { headerShown: false };
  constructor(props){
    super(props);
    this.state = {
      credits: this.props.coins.coins,
      visible: false,
      active5: false,
      active10: false,
      active15: false
    }
  }

  componentDidMount() {
    if (this.state.credits >= 5000) {
      this.setState({ active5: true })
    }
    if (this.state.credits >= 10000) {
      this.setState({ active10: true })
    }
    if (this.state.credits >= 15000) {
      this.setState({ active15: true })
    }
  }

  dialogBox = (card, amount, credits) => {
    global.costs = credits;
    global.giftcard = card;
    global.value = amount;
    console.log(credits)
    if (this.state.credits >= credits) {
      this.setState({ visible: true })
    } else {
      alert("Insufficient coins!")
    }
  }

  handleSendEmail = (inputText) => {
    const ID = 'AKIA6H7QCAXNNPXEK7FG';
    const SECRET = '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';
    var timestamp = new Date().getTime();
    var raw = "emails/";
    var key = raw.concat(inputText + timestamp + ".txt");
    var input = inputText;
    var body = input.concat(" | " + global.giftcard + " | " + global.value);
    var s3 = new AWS.S3({
      accessKeyId: ID,
      secretAccessKey: SECRET
    });
    var params = {
      Body: body, 
      Bucket: "rollingluck-bucket", 
      Key: key
     };
     s3.putObject(params, function(err) {
       if (err) console.log(err, err.stack);
       else if ( inputText !== "") {
        alert("Done");
        this.setState({ credits: this.state.credits - global.costs})
        this.props.dispatch(updateCoins(this.state.credits));
        this.setState({ visible: false });
       } else {
          alert("Enter your Email Address!")
       }
     }.bind(this));
  }

  handleClose = () => {
    this.setState({ visible: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <DialogInput isDialogVisible = {this.state.visible}
                      title = {"Submit Email"}
                      message = {"Make sure your Email-Address is correct!"}
                      hintInput = {"example@email.com"}
                      submitInput = { (inputText) => {this.handleSendEmail(inputText)} }
                      closeDialog = { this.handleClose } >
        </DialogInput>
        <TouchableButton style={styles.buttonBack} image="buttonBack" onPress={() => this.props.navigation.navigate('Home')} />
        <Text style={styles.creditValue}> {this.state.credits} </Text>
        <Image style={styles.backgroundImage} source={Images.homeBackground} resizeMode="cover" />
          <View style={{flexDirection: 'row', flexWrap: 'wrap', height: 605, resizeMode:"contain", top: verticalScale(50) }}>
            <TouchableButton style={styles.buttonGooglePlay} image="buttonGooglePlay5" inactive={!this.state.active5} onPress={() => this.dialogBox("Google Play", "5€", 5000)} />
            <TouchableButton style={styles.buttonGooglePlay} image="buttonGooglePlay10" inactive={!this.state.active10} onPress={() => this.dialogBox("Google Play", "10€", 10000)} />
            <TouchableButton style={styles.buttonGooglePlay} image="buttonGooglePlay15" inactive={!this.state.active15} onPress={() => this.dialogBox("Google Play", "15€", 15000)} />

            <TouchableButton style={styles.buttonPlayStation} image="buttonPlayStation5" inactive={!this.state.active5} onPress={() => this.dialogBox("PlayStation", "5€", 5000)} />
            <TouchableButton style={styles.buttonPlayStation} image="buttonPlayStation10" inactive={!this.state.active10} onPress={() => this.dialogBox("PlayStation", "10€", 10000)} />
            <TouchableButton style={styles.buttonPlayStation} image="buttonPlayStation15" inactive={!this.state.active15} onPress={() => this.dialogBox("PlayStation", "15€", 15000)} />

            <TouchableButton style={styles.buttonAmazon} image="buttonAmazon5" inactive={!this.state.active5} onPress={() => this.dialogBox("Amazon", "5€", 5000)} />
            <TouchableButton style={styles.buttonAmazon} image="buttonAmazon10" inactive={!this.state.active10} onPress={() => this.dialogBox("Amazon", "10€", 10000)} />
            <TouchableButton style={styles.buttonAmazon} image="buttonAmazon15" inactive={!this.state.active15} onPress={() => this.dialogBox("Amazon", "15€", 15000)} />

            <TouchableButton style={styles.buttonXbox} image="buttonXbox5" inactive={!this.state.active5} onPress={() => this.dialogBox("Xbox", "5€", 5000)} />
            <TouchableButton style={styles.buttonXbox} image="buttonXbox10" inactive={!this.state.active10} onPress={() => this.dialogBox("Xbox", "10€", 10000)} />
            <TouchableButton style={styles.buttonXbox} image="buttonXbox15" inactive={!this.state.active15} onPress={() => this.dialogBox("Xbox", "15€", 15000)} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  creditValue: {
    alignSelf: 'center',
    justifyContent: 'center',
    zIndex: 1,
    fontSize: scale(20),
    top: scale(5),
    color: 'grey'
  },
  buttonBack: {
    width: scale(45),
    height: scale(45),
    top: 10,
    right: 5,
    position: 'absolute',
    zIndex: 2
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
    left: moderateScale(12),
    width: scale(110),
    height: scale(150),
    top: verticalScale(50),
  },
  buttonPlayStation: {
    left: moderateScale(12),
    width: scale(110),
    height: scale(150),
    top: verticalScale(50),
  },
  buttonAmazon: {
    left: moderateScale(12),
    width: scale(110),
    height: scale(150),
    top: verticalScale(50),
  },
  buttonXbox: {
    left: moderateScale(12),
    width: scale(110),
    height: scale(150),
    top: verticalScale(50),
  }
});

const mapStateToProps = state => ({
  coins: state.coins,
});

export default connect(mapStateToProps)(Shop);