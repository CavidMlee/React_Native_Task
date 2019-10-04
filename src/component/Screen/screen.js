import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import LoginScreen from '../Login/logIn.js'
import SigninScreen from '../Signup/signIn'
import MainScreen from '../Main/main'
import AssignedScreen from '../Assigned/assigned.js';
import ExpiredScreen from '../Expired/expired'
import CreatScreen from '../Create/creat';
import EditScreen from '../Edit/edit'
import Tabscreen from '../tabs';
import AuthLoadingScreen from './AuthLoadingScreen'

const AppStack = createStackNavigator({
  Tabs: {
    screen: Tabscreen,
    navigationOptions: {
      header: null
    },
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
    navigationOptions: {
      header: null
    },
  },
  Expired: {
    screen: ExpiredScreen,
    navigationOptions: {
      header: null
    },
  },
  Creat: {
    screen: CreatScreen,
    navigationOptions: {
      header: null
    },
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: {
      header: null
    },
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
  Signin: {
    screen: SigninScreen,
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

