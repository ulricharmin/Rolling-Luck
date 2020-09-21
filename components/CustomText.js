import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class CustomText extends Component {

    setFontType = (type) => {
     switch (type) {
         case 'Impact':
             return 'Impact';
        default:
            return 'Roboto';
     }   
    }

  render() {
      const font = this.setFontType(this.props.type?this.props.type:'normal')
      const style = [{ fontFamily: font }, this.props.style || {}];
      const allProps = Object.assign({}, this.props,{style:style})
    return (
        <Text {...allProps}> {this.props.children} </Text>
    );
  }
}
