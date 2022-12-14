import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch, FlatList, ScrollView} from 'react-native';
import Button from './Button';
import ListItems from './ListItems';
import * as Font from "expo-font";
import * as SQLite from 'expo-sqlite';
import Database from "./Database";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { fontloaded: false, data: [] };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('../fonts/Unbounded-ExtraBold.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ fontloaded: true })
        Database.createTable();
        this.getAll();
    }

    add = () => {
        console.log("OOO")
        Database.add("00","00");
        this.getAll();
    }

    getAll = async() => {
        let records = await Database.getAll()
        records = JSON.parse(records)
        this.setState({ 
            data: records.rows._array 
        })
        console.log("TO:" + records.rows._array)
    }

    render() {
        return (this.state.fontloaded ?
            <View style={styles.container}>
                <ScrollView style={{flex: 3}}>
                    <ListItems data={this.state.data} fun={()=> this.getAll()}/>
                </ScrollView>
                <Button
                    functionAdd = {() => this.add()}
                    source = {require('../assets/add.png')}
                ></Button>
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
    },
});

export default Menu;
