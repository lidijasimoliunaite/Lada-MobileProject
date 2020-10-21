import { TabScreen } from './components/TabScreen'
import Login from './components/login'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Signup from './components/signup';
import AddEvent from './components/addEvent';
import Playlist from './components/Read';
import Search from './components/SearchAPI/Test';

const AppStack = createStackNavigator({ TabScreen },  
   {
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  }});
const AuthStack = createStackNavigator({ Login: Login },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    }});
const AuthStack2 = createStackNavigator({ Signup: Signup },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    }});
    const AuthStack3 = createStackNavigator({ AddEvent: AddEvent },
      {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
          gesturesEnabled: false,
        }});
        const AuthStack4 = createStackNavigator({ Playlist: Playlist },
          {
            headerMode: 'none',
            mode: 'modal',
            navigationOptions: {
              gesturesEnabled: false,
            }});
            const AuthStack5 = createStackNavigator({ Search: Search },
              {
                headerMode: 'none',
                mode: 'modal',
                navigationOptions: {
                  gesturesEnabled: false,
                }});
    

export default createAppContainer(createSwitchNavigator(
  {
      App: AppStack, 
      Auth: AuthStack,
      Signup: AuthStack2,
      AddEvent: AuthStack3,
      Playlist: AuthStack4,
      Search: AuthStack5
  }, 
  {
      initialRouteName: 'Auth'
  },
));