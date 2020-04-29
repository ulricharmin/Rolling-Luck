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
import Constants from '../Constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default class Loader extends Component {
  render() {
    const { animationType, modalVisible } = this.props;
    return (
      <Modal
        animationType={animationType}
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.wrapper}>
          <View style={styles.loaderContainer}>
            <Image style={styles.loaderImage} source={Images.loaderImage} resizeMode="stretch" />
          </View>
        </View>
      </Modal>
    );
  }
}

Loader.propTypes = {
  animationType: PropTypes.string.isRequired,
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
  loaderContainer: {
    width : scale(90),
    height: scale(90),
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -45,
    marginTop: -45,
  },
  loaderImage: {
    position: 'absolute',
    width : scale(90),
    height: scale(90),
  }
});
