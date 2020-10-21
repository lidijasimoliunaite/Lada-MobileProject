import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Platform, FlatList, AsyncStorage, Alert } from 'react-native';
import { Icon, Fab } from 'native-base';
import AppHeader from '../components/Header'

export default class Events extends Component {

    constructor() {
        super();

        this.state = {
            isLoading: true,
            JSON_from_server: [],
            JSON_from_server2: [],
            fetching_Status: false,
            privateCode: ''
        }
    }


    checkCode = () => {

        fetch('https://finstudy.lt/react/check_code.php?privateCode=' + this.state.privateCode)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ JSON_from_server2: [...this.state.JSON_from_server2, ...responseJson]});
            if (this.state.JSON_from_server2.length > 0) {
                AsyncStorage.setItem('Key_28', this.state.JSON_from_server2.map(item => item.creatorEmail).toString());
                 console.log(this.state.JSON_from_server2.map(item => item.creatorEmail).toString());
                 this.props.navigation.navigate('Playlist')
            }
            else {
             Alert.alert('Wrong code or error');
            }
        })
        .catch((error) => {
            console.error(error);
        });


    }






    componentDidMount() {
        fetch('https://finstudy.lt/react/event_list.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ JSON_from_server: [...this.state.JSON_from_server, ...responseJson], isLoading: false });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#607D8B",
                }}
            />
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppHeader headerText='Events' />
                <View style={styles.container}>
                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>Connect to <Text style={{ color: 'red' }}>Private</Text> event</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput underlineColorAndroid="transparent" placeholder="Enter code" style={styles.textInput} onChangeText={(text) => this.setState({ privateCode: text })} />
                        <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={this.checkCode} >
                            <Text style={styles.TextStyle}> CONNECT </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>Connect to <Text style={{ color: 'green' }}>Public</Text> event</Text>
                    {
                        (this.state.isLoading)
                            ?
                            (<ActivityIndicator size="large" />)
                            :
                            (
                                <FlatList
                                    style={{ width: '100%', marginBottom: '10%' }}
                                    keyExtractor={(item, index) => index.toString()}
                                    data={this.state.JSON_from_server}
                                    ItemSeparatorComponent={this.FlatListItemSeparator}
                                    renderItem={({ item, index }) =>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle2} onPress={() => {
                                                AsyncStorage.setItem('Key_28', item.creatorEmail); console.log('heloo');
                                                this.props.navigation.navigate('Playlist')
                                            }}>
                                                <Text style={styles.TextStyle}> CONNECT </Text>
                                            </TouchableOpacity>
                                            <Text style={styles.flatList_items}> {item.eventName}
                                            </Text>
                                        </View>
                                    }
                                />
                            )
                    }
                </View>
                <Fab
                    direction="up"
                    containerStyle={{ marginLeft: 10 }}
                    style={{ backgroundColor: '#783694' }}
                    position="bottomRight"
                    onPress={() => this.props.navigation.navigate('AddEvent')}>
                    <Icon style={{ color: '#fff', fontSize: 55 }} name="ios-add" />
                </Fab>
            </View>
        );
    }
}
const styles = StyleSheet.create(
    {
        container:
        {
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 25,
            paddingTop: (Platform.OS == 'ios') ? 20 : 0,
            marginBottom: 100
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
            textAlign: 'center',
            width: '35%'
        },
        TouchableOpacityStyle: {

            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 4,
            marginTop: 5,
            marginLeft: 10,
            width: '50%',
            height: 40,
            backgroundColor: '#00BCD4'

        },
        TouchableOpacityStyle2: {

            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 4,
            marginTop: 5,
            marginLeft: 10,
            width: '30%',
            height: 40,
            backgroundColor: '#00BCD4'

        },
        TextStyle: {
            color: '#fff',
            textAlign: 'center',
        },
        flatList_items:
        {
            fontSize: 20,
            color: '#000',
            padding: 10
        }
    });
