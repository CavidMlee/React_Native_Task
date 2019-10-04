import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { signInData } from '../../action/signInAction';
import SignInPage from './signInPage';


class SigninScreen extends React.Component {

    state = {
        email: '',
        password: '',
        passwordRepeat: '',
        checkEmail: false,
        checkPassword: false,
    }


    signInButton = () => {
        const { email, password, passwordRepeat } = this.state;
        this.props.signInData(email, password, passwordRepeat)
        AsyncStorage.removeItem("offlineData")
        AsyncStorage.removeItem("taskList")
    }

    validateEmail = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text, checkEmail: false })
        }
        else {
            this.setState({ email: text, checkEmail: true })
        }
    };

    validatePassword = (text) => {
        if (text.length < 6) {
            this.setState({ password: text, checkPassword: false })
        }
        else {
            this.setState({ password: text, checkPassword: true })
        }
    };

    rpeatPass = (text) => {
        this.setState({ passwordRepeat: text })
    }

    render() {
        const { email, password, passwordRepeat, checkEmail, checkPassword } = this.state
        this.props.user.email ? this.props.navigation.navigate('Tabs') : null

        return (
            <SignInPage
                email={email}
                password={password}
                passwordRepeat={passwordRepeat}
                checkEmail={checkEmail}
                checkPassword={checkPassword}
                rpeatPass={this.rpeatPass}
                validateEmail={this.validateEmail}
                validatePassword={this.validatePassword}
                signInButton={this.signInButton}
            />

        )
    }
}



mapStateToProps = (state, props) => ({
    user: state.signInReducer.user,
    state

});

mapDispatchToProps = {
    signInData,
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);