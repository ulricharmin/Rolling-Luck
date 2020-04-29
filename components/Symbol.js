import React, { Component, PureComponent } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';
import Constants from '../Constants';
import Images from '../assets/Images';

export default class Symbol extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      animatedValue: new Animated.Value(0)
    };
  }

  getImage = () => {
    switch(this.props.symbol){
      case "7":
        return Images.seven;
        break;
      case "B":
        return Images.bell;
        break;
      case "D":
        return Images.diamond;
        break;
      case "W":
        return Images.whitejeton;
        break;
      case "O":
        return Images.orange;
        break;
      case "M":
        return Images.melon;
        break;
      case "C":
        return Images.cherry;
        break;
      case "G":
        return Images.grape;
        break;
      case "L":
        return Images.lemon;
        break;
      case "P":
        return Images.plum;
        break;
      default:
        return Images.orange;
    }
  }

  setActive = (active) => {
    this.setState({
      active: active
    });
  }

  shake = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 800,
        useNativeDriver : true
      }
    ).start();
  }

  render() {
    let symbolSource = this.getImage();
    let symbolAnimation = [
      {
        scale: this.state.animatedValue.interpolate({
          inputRange: [0, 0.25, 0.5, 1],
          outputRange: [1, 1.25, 0.75, 1]
        })
      },
      {
        rotate: this.state.animatedValue.interpolate({
          inputRange: [0, 0.1, 0.2 ,0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          outputRange: ["0deg", "15deg", "0deg", "-15deg", "0deg", "15deg", "0deg", "-15deg", "0deg", "15deg", "0deg"]
        })
      }
    ];
    return (
      <View style={[styles.symbol, { width: this.props.width, height: this.props.height}]}>
        <Animated.Image style={{ width: this.props.width -20, height: this.props.height -20, opacity: this.state.active ? 1 : 1, transform: symbolAnimation }} resizeNode="contain" source={symbolSource} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  symbol: {
    padding: 10
  },

});
