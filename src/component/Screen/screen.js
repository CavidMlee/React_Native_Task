import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import LoginScreen from '../Login/logIn.js'
import SignupScreen from '../Signup/signUp'
import MainScreen from '../Main/main'
import AssignedScreen from '../Assigned/assigned.js';
import ExpiredScreen from '../Expired/expired'
import CreatScreen from '../Create/creat';
import EditScreen from '../Edit/edit'
import Tabscreen from '../Tabs/tabs';
import AuthLoadingScreen from './AuthLoadingScreen'

const headerOptions = {
  header: null
}

const AppStack = createStackNavigator({
  Tabs: {
    screen: Tabscreen,
    navigationOptions: headerOptions,
  },

  Main: {
    screen: MainScreen,
    navigationOptions: {
      headerTitle: <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>Tasks</Text>,
      headerStyle: {
        backgroundColor: '#64e291',
      },
      headerTintColor: 'black',
    },
  },

  Assigned: {
    screen: AssignedScreen,
    navigationOptions: headerOptions,
  },

  Expired: {
    screen: ExpiredScreen,
    navigationOptions: headerOptions,
  },

  Creat: {
    screen: CreatScreen,
    navigationOptions: headerOptions,
  },

  Edit: {
    screen: EditScreen,
    navigationOptions: headerOptions,
  }
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center' }}>LogIn</Text>,
      headerStyle: {
        backgroundColor: '#64e291',
      },
      headerTintColor: 'black',
    },
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      headerTitle: <Text style={{ flex: 1, color: 'white', fontSize: 20, paddingRight: 50, textAlign: 'center' }}>SignUp</Text>,
      headerStyle: {
        backgroundColor: '#64e291',
      },
      headerTintColor: 'black',
    },
  },
});

const Drawer = createDrawerNavigator({
  Tapşırıqlar: {
    screen: AppStack,
  }
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Drawer,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

