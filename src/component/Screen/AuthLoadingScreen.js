import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const AuthLoadingScreen = (props) => {

    useEffect(() => {
        authAsync()
    }, [])

    authAsync = async () => {
        const userToken = await AsyncStorage.getItem('userData');
        props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
}

export default AuthLoadingScreen;