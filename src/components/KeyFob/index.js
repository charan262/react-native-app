/**
 * @flow
 */

import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableHighlight, View } from 'react-native';
import { connect } from "react-redux";
import { notifyKeyFobPress } from "../../actions/keyFob";
import ActivityOverlay from "../ActivityOverlay";

type Props = {};
const lock = "LOCK";
const unlock = "UNLOCK";

class KeyFob extends Component<Props> {
  state = {
    rotateValue: new Animated.Value(0),
    keyFobPressDisabled: false,
  };

  constructor() {
    super();
    this.state.spinAnimation = Animated.loop(
      Animated.timing(
        this.state.rotateValue,
        {
          toValue: 1,
          duration: 800
        }
      )
    );

    this.state.spin = this.state.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
  }

  async keyFobPress(type) {
    this.toggleKeyFobDisabled();
    this.state.spinAnimation.start();
    await this.props.notifyKeyFobPress(type);
    this.toggleKeyFobDisabled();
    this.state.spinAnimation.stop();
    this.state.spinAnimation.reset();
  }

  toggleKeyFobDisabled() {
    const disabled = !this.state.keyFobPressDisabled;
    this.setState(() => ({
      keyFobPressDisabled: disabled
    }))
  }

  render() {
    let { keyFobPressDisabled, spin } = this.state;

    return (
      this.props.keyFobInProgress ?
        <ActivityOverlay condition={this.props.keyFobInProgress} /> :
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.keyFobPress(lock);
            }}
            disabled={keyFobPressDisabled}
            underlayColor={'#b9ccee'}>
            <Animated.Image
              style={[styles.image, { transform: [{ rotate: spin }] }]}
              source={require('./img/lock.png')} />
          </TouchableHighlight>
          <View style={{ height: 88 }} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              this.keyFobPress(unlock);
            }}
            disabled={keyFobPressDisabled}
            underlayColor={'#b9ccee'}>
            <Animated.Image
              style={[styles.image, { transform: [{ rotate: spin }] }]}
              source={require('./img/unlock.png')} />
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    tintColor: '#5e81bc',
  }
});

const mapStateToProps = state => (
  {
    keyFob: state.keyFob,
    keyFobFailed: state.keyFobFailed,
    keyFobInProgress: state.keyFobInProgress,
  }
);

const mapDispatchToProps = dispatch => (
  {
    notifyKeyFobPress: toggleType => dispatch(notifyKeyFobPress(toggleType)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(KeyFob);