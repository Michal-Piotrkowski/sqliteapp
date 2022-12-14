import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable} from 'react-native';
import ListItem from './ListItem';

class ListItems extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        let alarms = [];
        for(let i = 0; i < this.props.data.length; i++){
            let alarm = <ListItem fun={() => this.props.fun()} id={this.props.data[i].id} key={this.props.data[i].id} hours={this.props.data[i].hours} minutes={this.props.data[i].minutes}/>;
            alarms.push(alarm);
        }
        return(
            <View>
                {alarms}
            </View >
        );
    }
}

const styles = StyleSheet.create({
});

export default ListItems;

