import React from 'react';
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';



const appHeader = (props) => (
    <Header
    centerComponent={{ text: props.headerText, style: {fontSize: 24, fontWeight: 'bold', color: '#fff'}}}
    backgroundColor={'#783694'}
   />
);
    

export default appHeader;