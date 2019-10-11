//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../config';
export const NewTask = 'NewTask';


export const newTask = (title, description, status, priority, deadlineAt, callback) => async dispatch => {
    let tokens = await AsyncStorage.getItem('userData');
    let parsed = JSON.parse(tokens);

    let data = JSON.stringify({
        toTenantPerson: parsed.tenant.tenantPerson,
        title,
        description,
        status: status,
        priority: priority,
        deadlineAt: deadlineAt ? deadlineAt : "",
        willProgressAt: "",
        project: "",
        attachment: ""
    })

    if (parsed != null) {
        return API.then(api => api.post(`/tasks`, data
        )).then(resp => {
            if (resp.status == 201) {
                alert("Success")
                callback()
                return dispatch({
                    type: NewTask,
                    payload: resp.data.data
                })
            }
            else {
                alert(JSON.stringify(resp.error))
            }
        }).catch((e) =>{alert(e), console.log('error create ',e)})


    }
}