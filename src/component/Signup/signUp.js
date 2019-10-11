import React,{useState,useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { signUpData } from '../../action/signUpAction';
import styles from './signUpstyle'


const SignUpScreen = (props) => {

    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[passwordRepeat,setPasswordRepeat] = useState('')
    const[checkEmail,setCheckEmail] = useState(false)
    const[checkPassword,setCheckPassword] = useState(false)


    useEffect(()=>{
        props.user.email ? props.navigation.navigate('Tabs') : null
    },[props.user.email])

    signUpButton = () => {
        props.signUpData(email, password, passwordRepeat)
        AsyncStorage.removeItem("offlineData")
        AsyncStorage.removeItem("taskList")
    }

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            setEmail(text)
            setCheckEmail(false)
        }
        else {
            setEmail(text)
            setCheckEmail(true)
        }
    };

    validatePassword = (text) => {
        if (text.length < 6) {
            setPassword(text)
            setCheckPassword(false)
        }
        else {
            setPassword(text)
            setCheckPassword(true)
        }
    };

    rpeatPass = (text) => {
        setPasswordRepeat(text)
    }

        return (
            <View>
            <View style={styles.borderstyle11}>
                <View style={styles.inputView}>
                    <Text style={styles.labelStyle}>
                        EMAİL
                        </Text>
                    <TextInput
                        keyboardType="email-address"
                        autoCorrect={false}
                        value={email}
                        onChangeText={(text) => validateEmail(text)}
                        style={[styles.inputStyle, { color:checkEmail ? "black" : "red", }]}
                    />
                </View>
            </View>
            {checkEmail ? <View>
                <View style={styles.borderstyle11}>
                    <View style={styles.inputView}>
                        <Text style={styles.labelStyle}>
                            ŞİFRƏ
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            autoCorrect={false}
                            value={password}
                            onChangeText={(text) =>validatePassword(text)}
                            style={[styles.inputStyle, { color:checkPassword ? "black" : "red" }]}
                        />
                    </View>
                </View>
                <View style={styles.borderstyle11}>
                    <View style={styles.inputView}>
                        <Text style={styles.labelStyle}>
                            TƏKRAR ŞİFRƏ
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            autoCorrect={false}
                            value={passwordRepeat}
                            onChangeText={(passwordRepeat) => rpeatPass(passwordRepeat)}
                            style={styles.inputStyle}
                        />
                    </View>
                </View>
            </View>
                : null}

            <View style={styles.borderstyle11}>
                <TouchableOpacity style={styles.buttonContent} onPress={() => signUpButton()} disabled={checkEmail ?checkPassword ? false : true : true}  >
                    <Text style={styles.buttonText}>DAVAM ET</Text>
                </TouchableOpacity>
            </View>
        </View>

        )
    }

mapStateToProps = (state, props) => ({
    user: state.signUpReducer.user,
    state

});

mapDispatchToProps = {
    signUpData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);