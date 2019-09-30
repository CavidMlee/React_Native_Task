import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import styles from './loginStyle';
import { connect } from 'react-redux';
import { checkEmail, logIn } from '../action/loginAction';
import LoginPage from './loginPage';


class LoginScreen extends React.Component {
    state = {
        email: '',
        password: ''
    }

    changeState = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }

    componentDidUpdate = async () =>{
        const userData = await AsyncStorage.getItem('userData');
        userData ? this.props.navigation.navigate('App'):null
    }

    render() {
        const { check, checkEmail, logIn } = this.props;
        const { email, password } = this.state;
        return (
            <View>
                <LoginPage
                    email={email}
                    password={password}
                    check={check}
                    checkEmail={checkEmail}
                    logIn={logIn}
                    changeState={this.changeState}
                />
                <View style={styles.signİn}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('Signin') }} >
                        <Text style={styles.signİnText}>SignUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

mapStateToProps = (state, props) => ({
    check: state.loginReducer.check,
    loginData: state.loginReducer.login,
});

mapDispatchToProps = {
    checkEmail,
    logIn
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);