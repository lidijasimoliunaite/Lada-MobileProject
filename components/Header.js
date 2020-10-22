import React from 'react';
import { Header } from 'react-native-elements';



const appHeader = (props) => (
    <Header
    centerComponent={{ text: props.headerText, style: {fontSize: 24, fontWeight: 'bold', color: '#fff'}}}
    backgroundColor={'#783694'}
   />
);
    

export default appHeader;