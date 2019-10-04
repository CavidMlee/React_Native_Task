import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import styles from './loginStyle'

const LogInPage = (props) =>{
    return(
        <View>
                <View style={styles.borderstyle11}>
                    <View style={styles.inputView}>

                        <Text style={styles.labelStyle}>
                            İŞLƏK EMAİL
                        </Text>
                        <TextInput
                            keyboardType="email-address"
                            autoCorrect={false}
                            value={props.email}
                            onChangeText={props.changeState("email")}
                            style={styles.inputStyle}
                        />
                    </View>
                </View>
                {props.check ?
                    <View style={styles.borderstyle11}>
                        <View style={styles.inputView}>

                            <Text style={styles.labelStyle}>
                                ŞİFRƏ
                        </Text>
                            <TextInput
                                secureTextEntry={true}
                                autoCorrect={false}
                                value={props.password}
                                onChangeText={props.changeState("password")}
                                style={styles.inputStyle}
                            />

                        </View>
                    </View>
                    : null}

                <View style={styles.borderstyle11}>
                    <TouchableOpacity style={styles.buttonContent} onPress={props.check ? () => props.logIn(props.email, props.password) : () => props.checkEmail(props.email)} >
                        <Text style={styles.buttonText}>DAVAM ET</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
};

export default LogInPage