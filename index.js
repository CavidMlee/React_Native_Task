/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from "react-redux";
import store from "./store";
import AppContainer from './src/component/Screen/screen';

const App = () => {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
};


AppRegistry.registerComponent(appName, () => App);
