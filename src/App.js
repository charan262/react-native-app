/**
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage, Text } from "react-native";
import { DrawerNavigator, StackNavigator, SwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import store from "./store";
import { authSuccessful } from "./actions/auth";
import { KeyFob, Login, Manual } from "./components";

type Props = {};

const Navigator = SwitchNavigator({
  Login: { screen: Login },
  Main: {
    screen: StackNavigator({
      Drawer: {
        screen: DrawerNavigator({
          Home: { screen: KeyFob },
          Manual: { screen: Manual },
        })
      }
    }, {
      navigationOptions: ({ navigation }) => ({
        headerLeft: <Text
          onPress={() => navigation.navigate('DrawerToggle')}
          style={{
            marginLeft: 10,
            fontWeight: 'bold',
          }}>MENU</Text>,

        headerRight: <Text
          onPress={() => {
            store.dispatch(authSuccessful(''));
            navigation.navigate('Login')
          }}
          style={{
            marginRight: 10,
            fontWeight: 'bold',
          }}>LOGOUT</Text>
      })
    })
  }
});

AsyncStorage.getItem('@GM:JWT')
  .then(value => store.dispatch(authSuccessful(value)));

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
