import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Events from './events';
import Read from './Read';


const RouterComponent = () => {
return (
 <Router>
  <Scene key="root" >
  <Scene key="Events" component={Events} title="Events" initial />
  <Scene key="Read" component={Read} title="Read"/>
  </Scene>
 </Router>
 );
};


export default RouterComponent;