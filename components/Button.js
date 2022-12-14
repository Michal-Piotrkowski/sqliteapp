import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <View>
            <TouchableOpacity onPress={() => this.props.functionAdd()} style={styles.circle}>
                <Image source={this.props.source} style={styles.image}></Image>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
    circle: {
        borderColor: "white",
        borderWidth: 10,
        borderRadius: 100,
        padding: 20,
        margin: '5%'
    }
});