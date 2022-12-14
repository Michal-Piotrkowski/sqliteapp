import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, FlatList } from 'react-native';
import * as Font from "expo-font";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { fontloaded: false };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../fonts/Unbounded-ExtraBold.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
    }

    render() {
        return (this.state.fontloaded ?
            <View style={styles.container}>
                <Image source={require('../assets/clock.png')} style={styles.image}></Image>
                <Text style={styles.title} onPress={() => this.props.navigation.navigate("s2")}>SQLITE APP</Text>
                <Text style={styles.title} onPress={() => this.props.navigation.navigate("s2")}>^</Text>
            </View>
            : null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255, 220, 212)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'myfont',
        fontSize: 40,
        color: "#b38c00"
    },
    image: {
        width: '20%',
        height: '10%'
    }
});

export default Main;
