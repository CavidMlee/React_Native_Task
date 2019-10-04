import { AsyncStorage } from 'react-native';
import API from '../../config';
export const SignInDataType = 'SignInDataType';

export const signInData = (email, password, passwordRepeat) => dispatch => {
    console.log(email, password, passwordRepeat)
    return API.then(api => api.post(`/register`,
        JSON.stringify({
            email,
            password,
            passwordRepeat
        }),
    )).then(resp => {
        try {
            console.log('datamiz ', resp)
            if (resp.status == 201) {
                let datas = resp.data.data
                AsyncStorage.setItem("userData", JSON.stringify(datas));
                return dispatch({
                    type: SignInDataType,
                    payload: datas
                })
            } else {
                alert(JSON.stringify(resp.error))
            }
        }
        catch (e) {
            alert(e)
        }
    }).catch(err => {
        alert(err)
    });
}

