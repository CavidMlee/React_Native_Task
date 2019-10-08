import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './component/loginStyle';
import { connect } from 'react-redux';
import { checkEmail, logIn } from '../../action/loginAction';
import LoginPage from './component/loginPage';


const LoginScreen = (props) => {

    const [values, setValues] = useState({ email: '', password: '' })

    changeState = (name) => {
        return (text) => {
            setValues({ ...values, [name]: text })
        }
    }

    useEffect(() => {
        userData()
    })

    userData = async () => {
        const userData = await AsyncStorage.getItem('userData');
        userData ? this.props.navigation.navigate('App') : null
    }

    const { check, checkEmail, logIn } = props;
    const { email, password } = values;
    return (
        <View>
            <LoginPage
                email={email}
                password={password}
                check={check}
                checkEmail={checkEmail}
                logIn={logIn}
                changeState={changeState}
            />
            <View style={styles.signİn}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Signup') }} >
                    <Text style={styles.signİnText}>SignUp</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


mapStateToProps = (state, props) => ({
    check: state.loginReducer.check,
    loginData: state.loginReducer.login,
});

mapDispatchToProps = {
    checkEmail,
    logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);