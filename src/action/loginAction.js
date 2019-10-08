//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { API } from '../../config';
export const LoginInType = 'LoginInType';
export const CheckEmailType = 'CheckEmailType';

export const checkEmail = (email) => dispatch => {
    if (email === 'logOut') {
        return dispatch({
            type: CheckEmailType,
            payload: false
        })
    }
    else {
        fetch(`${API}/checkLogin`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                }),
            }).then(resp => resp.json()).then(email => {
                if (email.error == null) {
                    return dispatch({
                        type: CheckEmailType,
                        payload: true
                    })
                } else {
                    alert(JSON.stringify(email.error.message))
                }
            }).catch(e => { alert(e) })
    }
};

export const logIn = (email, password) => dispatch => {
    fetch(`${API}/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                deviceToken: ''
            }),
        }).then(resp => resp.json()).then(async res => {
            try {
                if (res.error == null) {
                    AsyncStorage.setItem("userData", JSON.stringify(res.data));
                    return dispatch({
                        type: LoginInType,
                        payload: email.data
                    })
                } else {
                    alert('error')
                }
            }
            catch (e) {
                alert(e)
            }

        }).catch(e=>{alert(e)})
};

