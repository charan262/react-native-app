import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default ActivityOverlay = ({ condition }) => (
  <View style={styles.container}>
    <ActivityIndicator
      size='large'
      animating={condition}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});