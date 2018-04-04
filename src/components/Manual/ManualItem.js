import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View, } from 'react-native';
import { BASE_URL } from "../../actions/constants";

export default class ManualItem extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={{ uri: `${BASE_URL}/manual/${this.props.entry.image}` }}
        />
        <Text
          style={styles.titleStyle}>
          {this.props.entry.title}
        </Text>
        <Text style={styles.descriptionStyle}>{this.props.entry.description}</Text>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionStyle: {
    fontSize: 16,
    margin: 20,
  },
  imageStyle: {
    width: width * 0.8,
    height: width * 0.8,
  },
  titleStyle: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
});