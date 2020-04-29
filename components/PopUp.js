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

export default class PopUp extends Component {
  render() {
    const { modalVisible } = this.props;
    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        >
        <View style={styles.wrapper}>
          <View style={styles.popUpContainer}>
            <Image style={styles.popUpImage} source={Images.popupImage} resizeMode="stretch" />
          </View>
        </View>
      </Modal>
    );
  }
}

PopUp.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  popUpContainer: {
    width : scale(140),
    height: scale(140),
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -45,
    marginTop: -45
  },
  popUpImage: {
    position: 'absolute',
    width : scale(140),
    height: scale(140),
    borderRadius: 15,
  }
});
