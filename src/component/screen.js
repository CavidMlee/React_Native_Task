import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation'
import LoginScreen from './logIn.js'
import SigninScreen from './signIn.js'
import MainScreen from './main'
import CreatScreen from './creat';
import EditScreen from './edit'
import AuthLoadingScreen from './AuthLoadingScreen'

const AppStack = createStackNavigator({
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
  Creat: {
    screen: CreatScreen,
    navigationOptions: {
      headerTitle: <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center', paddingRight: 50 }}>Creat</Text>,
      headerStyle: {
        backgroundColor: '#64e291',
      },
      headerTintColor: 'black',
    },
  },
  Edit: {
    screen: EditScreen,
    navigationOptions: {
      headerTitle: <Text style={{ flex: 1, color: 'white', fontSize: 20, textAlign: 'center', paddingRight: 50 }}>Edit</Text>,
      headerStyle: {
        backgroundColor: '#64e291',
      },
      headerTintColor: 'black',
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
      headerTitle: <Text style={{ flex: 1, color: 'white', fontSize: 20,paddingRight:50, textAlign: 'center' }}>SignUp</Text>,
      headerStyle: {
        backgroundColor: '#64e291',
      },
      headerTintColor: 'black',
    },
  },
});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

  