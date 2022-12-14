import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Pressable, Switch} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableNativeFeedback } from 'react-native';
import { Animated } from 'react-native';
import Database from './Database';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {listitems: [], isenabled: false, expanded: false, height: new Animated.Value(0), days: 
            [
                { name: "PN", active: false },
                { name: "WT", active: false },
                { name: "ŚR", active: false },
                { name: "CZ", active: false },
                { name: "PT", active: false },
                { name: "SB", active: false },
                { name: "ND", active: false },
            ],
        },
        this.selected= [],
        this.toValue = 0
    }

    toggleSwitch = () => {
        this.setState( (s) => ({
            isenabled: !s.isenabled
        }))
    }

    del = ()=>{
      Database.remove(this.props.id)
      this.props.fun();
    }

    select() {
        if (!this.state.expanded) this.toValue = 200
        else this.toValue = 0

        Animated.spring(this.state.height, {
            toValue: this.toValue,
            useNativeDriver: false,
        }).start();
        this.setState( (s) => ({
            expanded: !s.expanded
        }))
    }

    selectDay = (name) => {
        this.setState({
            days: this.state.days.map((e) => {
                if (e.name == name) {
                    e.selected = !e.selected;
                }
                return e;
            }),
        });
        this.selected = [];
        this.state.days.forEach((e, i) => {
            if (e.selected) this.selected.push(this.state.days[i]);
        });
        console.log(this.selected)
    };

    render() {
        return(
            <View style={styles.item}>
                <View>
                    <Text style={styles.text}>{this.props.hours}:{this.props.minutes}</Text>
                </View>
                <View style={styles.secondItem}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(
                            "rgba(255,255,255,1)",
                            true,
                            30
                        )}
                        onPress={() => this.del()}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    >
                        <View>
                            <Ionicons name="trash" size={32} color="#b38c00" />
                        </View>
                    </TouchableNativeFeedback>
                    <Switch
                        trackColor={{ false: "#767577", true: "#b38c00" }}
                        thumbColor={this.state.isenabled ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={this.toggleSwitch}
                        value={this.state.isenabled}
                    />
                </View>
                <View style={styles.days}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(
                            "rgba(255,255,255,1)",
                            true,
                            30
                        )}
                        onPress={() => this.select()}
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "red",
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View>
                            <Ionicons
                                name="chevron-down-outline"
                                size={32}
                                color="white"
                            />
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{flexDirection: "row"}}>
                        {this.state.expanded ? null : (
                            this.selected.map((e) => (
                                    <Text
                                        key={e.name}
                                        style={{
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: 25,
                                        }}
                                    >
                                        {e.name}{", "}
                                    </Text>
                            ))
                        )}
                    </View>
                </View>
                <Animated.View
                        style={
                            {
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: "center",
                                height: this.state.height,
                            }}
                        >
                        {this.state.expanded
                            ? this.state.days.map((e) => {
                                if (!e.selected)
                                    return (
                                        <Pressable
                                            key={e.name}
                                            style={{ height: 50, width: 50 }}
                                            onPress={() => this.selectDay(e.name)}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    margin: 10,
                                                }}
                                            >
                                                {e.name}
                                            </Text>
                                        </Pressable>
                                    );
                                else
                                    return (
                                        <Pressable
                                            key={e.name}
                                            style={{
                                                height: 50, 
                                                width: 50,
                                                borderRadius: 30,
                                                backgroundColor: "black",
                                            }}
                                            onPress={() => this.selectDay(e.name)}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    textAlign: 'center',
                                                    marginTop: 12,
                                                }}
                                            >
                                                {e.name}
                                            </Text>
                                        </Pressable>
                                    );
                            })
                            : null}
                </Animated.View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "column"
    },
    text: {
        fontSize: 40,
        color: "#b38c00",
        fontFamily: 'myfont'
    },
    secondItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    days: {
        justifyContent: 'center',
        flexDirection: 'row',
    }
});

export default ListItem;
