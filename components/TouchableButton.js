import React, { Component, PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import Images from '../assets/Images';

export default class TouchableButton extends PureComponent {
  constructor(props) {
    super(props);

    this.images = {
      "active": Images[this.props.image],
      "pushed": Images[this.props.image + "Pressed"],
      "inactive": Images[this.props.image + "Inactive"]
    }

    this.state = {
      status: "active"
    }
  }

  renderContent = () => {
    if (this.props.text){
      return (
        <Text style={this.props.textStyle}>{this.props.text}</Text>
      )
    }
  }

  handlePressIn = () => {
    if (this.props.inactive){
      return;
    }

    this.setState({
      status: "pushed"
    });

    this.props.onPress && this.props.onPress();
  }

  handlePressOut = () => {
    if (this.props.inactive){
      return;
    }

    this.setState({
      status: "active"
    })
  }

  render() {
    const status = this.props.inactive ? "inactive" : this.state.status;
    const content = this.renderContent();
    return (
          <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut} touchSoundDisabled={true}>
              <View style={[this.props.style, { justifyContent: 'center', alignItems: 'center'}]}>
                  <Image source={this.images[status]} style={{ width: this.props.style.width, height: this.props.style.height, position: 'absolute'}} resizeMode={this.props.resizeMode || "stretch"} />
              </View>
          </TouchableWithoutFeedback>
        );
    }
}
