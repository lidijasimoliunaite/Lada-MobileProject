import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, Picker } from 'react-native';
import firebase from '../database/firebase';
import { Icon } from 'native-base';
var randomString = require('random-string');

export default class AddEvent extends Component {

    constructor() {
        super();
        this.state = {
            eventName: '',
            creatorEmail: '',
            loading: false,
            disabled: false,
            publicStatus: 1,
            privateCode: ''
        }
    }

    saveData = () => {
        if (this.state.publicStatus == 0) {
            this.state.privateCode = randomString({
                length: 7,
                numeric: true,
                letters: true,
                special: false,
                exclude: ['a', 'b', '1', 'c', 'd', 'e',
                    'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                    'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
                    'v', 'w', 'x', 'y', 'z']
            });
        }
        else {
            this.state.privateCode = '';
        }
        this.setState({ loading: true, disabled: true }, () => {
            fetch('https://finstudy.lt/react/add_event.php',
                {
                    method: 'POST',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            eventName: this.state.eventName,
                            creatorEmail: firebase.auth().currentUser.email,
                            publicStatus: this.state.publicStatus,
                            privateCode: this.state.privateCode
                        })

                }).then((response) => response.json()).then((responseJson) => {
                    alert(responseJson);
                    this.setState({ loading: false, disabled: false });
                    this.props.navigation.navigate('Events')
                }).catch((error) => {
                    console.error(error);
                    this.setState({ loading: false, disabled: false });
                });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#783694', height: 60, flexDirection: 'row' }}>
                    <View style={{ marginLeft: 10, marginTop: 5 }} >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Events')}>
                            <Icon style={{ color: '#fff', fontSize: 45 }} name="back" type="AntDesign" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 105, marginTop: 13 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>Add Event</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <TextInput underlineColorAndroid="transparent" placeholder="Event Name"
                        style={styles.textInput} onChangeText={(text) => this.setState({ eventName: text })} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, marginTop: 14 }}>Public status:</Text>
                        <Picker
                            selectedValue={this.state.publicStatus}
                            style={{ height: 60, width: '40%' }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ publicStatus: itemValue })
                            }>
                            <Picker.Item label="True" value="1" />
                            <Picker.Item label="False" value="0" />
                        </Picker>
                    </View>
                    {
                        (this.state.loading)
                            ?
                            (<ActivityIndicator size="large" />)
                            :
                            null
                    }
                    <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.saveData} >
                        <Text style={styles.TextStyle}> ADD EVENT </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 16, marginTop: 15 }}>*If you select public status <Text style={{ color: 'green' }}>TRUE</Text>, that mean that all custumers can see and use your event playlist.</Text>
                <Text style={{ marginLeft: 10, marginRight: 10, fontSize: 16 }}>*If you select public status <Text style={{ color: 'red' }}>FALSE</Text>, you will get the private code to your email and you can share it for private guests.</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        container:
        {
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingTop: (Platform.OS == 'ios') ? 20 : 0,
        },

        textInput:
        {
            height: 40,
            borderWidth: 1,
            borderColor: 'grey',
            marginVertical: 5,
            alignSelf: 'stretch',
            padding: 8,
            fontSize: 16,
        },
        TouchableOpacityStyle: {

            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 5,
            marginBottom: 7,
            width: '90%',
            backgroundColor: '#00BCD4'

        },

        TextStyle: {
            color: '#fff',
            textAlign: 'center',
        },
    });