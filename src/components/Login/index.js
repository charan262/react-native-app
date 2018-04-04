/**
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { ActivityOverlay } from "../index";

class Login extends Component {

  state = { username: '', password: '' };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth && nextProps.auth.length > 0) {
      nextProps.navigation.navigate('Main');
    }
    return null;
  }

  render() {
    return (
      this.props.authInProgress ?
        <ActivityOverlay condition={this.props.authInProgress} /> :
        <View style={styles.container}>
          <Image style={styles.image} source={require('./img/tardis.png')} />
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textField}
              value={this.state.username}
              placeholder={'username'}
              onChangeText={(text) => {
                this.setState({ username: text })
              }}
            />
          </View>
          <View style={styles.rowContainer}>
            <TextInput
              style={styles.textField}
              value={this.state.password}
              placeholder={'password'}
              onChangeText={(text) => {
                this.setState({ password: text })
              }}
            />
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.submit}
              onPress={() => this.props.login(this.state.username, this.state.password)}
              disabled={false}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  disabledSubmit: {
    alignItems: 'center',
    backgroundColor: '#b9ccee',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  image: {
    height: 240,
    marginBottom: 44,
    marginTop: 60,
    resizeMode: Image.resizeMode.contain,
    width: 240,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#5e81bc',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  text: {
    color: 'white'
  },
  textField: {
    borderColor: 'black',
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
    padding: 10,
  },
});

const mapStateToProps = state => (
  {
    auth: state.auth,
    authFailed: state.authFailed,
    authInProgress: state.authInProgress,
  }
);

const mapDispatchToProps = dispatch => (
  {
    login: (username, password) => dispatch(login('client_id', username, password)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);