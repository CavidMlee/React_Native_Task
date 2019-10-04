import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import styles from './signInstyle.js'

const SignInPage = (props) => {
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
                        value={props.email}
                        onChangeText={(text) => props.validateEmail(text)}
                        style={[styles.inputStyle, { color: props.checkEmail ? "black" : "red", }]}
                    />
                </View>
            </View>
            {props.checkEmail ? <View>
                <View style={styles.borderstyle11}>
                    <View style={styles.inputView}>
                        <Text style={styles.labelStyle}>
                            ŞİFRƏ
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            autoCorrect={false}
                            value={props.password}
                            onChangeText={(text) => props.validatePassword(text)}
                            style={[styles.inputStyle, { color: props.checkPassword ? "black" : "red" }]}
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
                            value={props.passwordRepeat}
                            onChangeText={(passwordRepeat) => props.rpeatPass(passwordRepeat)}
                            style={styles.inputStyle}
                        />
                    </View>
                </View>
            </View>
                : null}

            <View style={styles.borderstyle11}>
                <TouchableOpacity style={styles.buttonContent} onPress={() => props.signInButton()} disabled={props.checkEmail ? props.checkPassword ? false : true : true}  >
                    <Text style={styles.buttonText}>DAVAM ET</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignInPage