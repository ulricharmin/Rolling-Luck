import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Image,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';
import Images from '../assets/Images';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class infoPopUp extends Component {
  render() {
    const { modalVisible } = this.props;
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        >
        <View style={styles.wrapper}>
          <View style={styles.popUpContainer}>
            <Image style={styles.popUpImage} source={} resizeMode="stretch" />
          </View>
        </View>
      </Modal>
    );
  }
}

infoPopUp.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    popUpImage: {
        position: 'absolute',
        width : scale(140),
        height: scale(140),
        borderRadius: 15,
    }
});