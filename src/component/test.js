import React, { Fragment } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { Field, reduxForm } from 'redux-form';

//Validation
const required = value => value ? undefined : 'Boşdur';
const minLength = value => value && value.length < 6 ? `Minimum 6 simvol olmali` : undefined;
const isValidEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Email formatı düz deyil' : undefined;


const renderField = ({ label, keyboardType, secureText, meta: { touched, error }, input: { onChange, ...restInput } }) => {
    return (
        <View style={styles.borderstyle11}>
            <View style={styles.inputView}>
                <Text style={styles.labelStyle}>{label}</Text>
                <TextInput
                    style={styles.inputStyle}
                    secureTextEntry={secureText}
                    keyboardType={keyboardType}
                    onChangeText={onChange}
                    {...restInput}
                >
                </TextInput>
                {touched && ((error && <Text style={{ color: 'red', marginLeft: 20 }}>{error}</Text>))}
            </View>

        </View>);
};

const submit = values => {
    alert(JSON.stringify(values));
}

class SigninScreen extends React.Component {

    state = {
        email: '',
        password: '',
        checkEmail: true,
        checkPassword: true
    }

    logIn = () => {

        fetch("https://devcore.prospectsmb.com/v1/register",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'ruslan@gmail.com',
                    password: '123456',
                    passwordRepeat: '123456'
                }),
            }).then(resp => resp.json()).then(email => {
                //alert(JSON.stringify(email.data))
                if (email.error == null) {
                    alert(JSON.stringify(email.data))
                    this.props.navigation.navigate('Login')
                } else {
                    alert('error')
                }
            })
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

    render() {
        const { handleSubmit } = this.props;
        return (
            <View>

                <Field name="Email" keyboardType="email-address" label="Email: " component={renderField}
                    validate={[required, isValidEmail]}
                />
                <Field name="Şifrə" keyboardType="default" label="Şifrə: " component={renderField}
                    validate={[required, minLength]}

                />
                <Field name="Təkrar Şifrə" keyboardType="default" label="Təkrar Şifrə: " component={renderField}
                    validate={[required, minLength]}

                />

                <View style={styles.borderstyle11}>
                    <TouchableOpacity onPress={handleSubmit(submit)} style={styles.buttonContent}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.borderstyle11}>
                    <TouchableOpacity style={styles.buttonContent} onPress={() => this.logIn()} >
                        <Text style={styles.buttonText}>DAVAM ET</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    textStile: {
        alignItems: "center",
        justifyContent: "center"
    },

    inputStyle: {
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 18,
        lineHeight: 23,
        borderColor: "grey",
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 5
    },

    labelStyle: {
        color: 'black',
        fontSize: 17,
        paddingLeft: 20,
    },

    inputView: {
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
    },
    buttonContent: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#64e291',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',

    },

    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },

    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },

    borderstyle11: {
        marginTop: 20,
        padding: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        position: 'relative',

    },
});

const SignInForm = reduxForm({
    form: 'signIn',
})(SigninScreen);

export default SignInForm;


{
    {/* <View style={styles.borderstyle11}>
                    <View style={styles.inputView}>

                        <Text style={styles.labelStyle}>
                            EMAİL
                        </Text>
                        <TextInput
                            keyboardType="email-address"
                            autoCorrect={false}
                            value={this.state.email}
                            onChangeText={(text) => this.validateEmail(text)}
                            style={[styles.inputStyle, { color: this.state.checkEmail ? "black" : "red", }]}
                        />

                    </View>
                </View>
                <View style={styles.borderstyle11}>
                    <View style={styles.inputView}>

                        <Text style={styles.labelStyle}>
                            ŞİFRƏ
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            autoCorrect={false}
                            value={this.state.password}
                            onChangeText={(text) => this.validatePassword(text)}
                            style={[styles.inputStyle, { color: this.state.checkPassword ? "black" : "red" }]}
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
                            value={null}
                            onChangeText={null}
                            style={styles.inputStyle}
                        />

                    </View>
                </View> */}
}


//ActionSheet

// showActionSheet = () => {
//     this.ActionSheet.show()
// }

// handleIndex = (index, items) => {
//     switch (index) {
//         case 0:
//             //this.props.navigation.navigate('Edit', { item: items })
//             alert(JSON.stringify(items))
//             break;
//         case 1:
//             alert('bu delete bolmesidir')
//             break;
//         default:
//             break;
//     }
// }

// <ActionSheet
//     ref={o => this.ActionSheet = o}
//     title={'Edit or delete task'}
//     options={['Edit', 'Delete', 'cancel']}
//     cancelButtonIndex={2}
//     destructiveButtonIndex={1}
//     onPress={(index1) => { alert(JSON.stringify(item.id)) }}
// />

