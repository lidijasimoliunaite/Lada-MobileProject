import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import firebase from '../database/firebase';

import Search from './SearchAPI/Test';
import Dashboard from './dashboard';
import Playlist from './Read';
import Events from './events';
import AddEvent from './addEvent';

const SignoutScreen = () => {}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export const TabScreen = createBottomTabNavigator({
    Events: {
        screen: Events, 
        navigationOptions: {
            tabBarLabel: 'Events', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-musical-notes" color={tintColor} size={25} />
            )
        }
    }, 
    Signout: {
        screen: SignoutScreen, 
        navigationOptions: {
            tabBarLabel: 'Signout', 
            tabBarIcon: ({ tintColor }) => (
                <SimpleLineIcons name="logout" color={tintColor} size={20} />
            ), 
            tabBarOnPress: async ({navigation}) => {
                firebase.auth().signOut().then(() => {
                    navigation.navigate('Login')
                  })
            }
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'red', 
        inactiveTintColor: 'grey', 
        showIcon: true,
    }
});
