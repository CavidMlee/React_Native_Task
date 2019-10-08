import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { signUpData } from '../../action/signUpAction';
import SignUpPage from './component/signUpPage';


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
            <SignUpPage
                email={email}
                password={password}
                passwordRepeat={passwordRepeat}
                checkEmail={checkEmail}
                checkPassword={checkPassword}
                rpeatPass={rpeatPass}
                validateEmail={validateEmail}
                validatePassword={validatePassword}
                signUpButton={signUpButton}
            />

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