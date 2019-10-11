import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './loginStyle';
import { connect } from 'react-redux';
import { checkEmail, logIn } from '../../action/loginAction';


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
            <View>
                <View style={styles.borderstyle11}>
                    <View style={styles.inputView}>

                        <Text style={styles.labelStyle}>
                            İŞLƏK EMAİL
                        </Text>
                        <TextInput
                            keyboardType="email-address"
                            autoCorrect={false}
                            value={email}
                            onChangeText={changeState("email")}
                            style={styles.inputStyle}
                        />
                    </View>
                </View>
                {check ?
                    <View style={styles.borderstyle11}>
                        <View style={styles.inputView}>

                            <Text style={styles.labelStyle}>
                                ŞİFRƏ
                        </Text>
                            <TextInput
                                secureTextEntry={true}
                                autoCorrect={false}
                                value={password}
                                onChangeText={changeState("password")}
                                style={styles.inputStyle}
                            />

                        </View>
                    </View>
                    : null}

                <View style={styles.borderstyle11}>
                    <TouchableOpacity style={styles.buttonContent} onPress={check ? () => logIn(email, password) : () => checkEmail(email)} >
                        <Text style={styles.buttonText}>DAVAM ET</Text>
                    </TouchableOpacity>
                </View>
            </View>
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