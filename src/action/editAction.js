//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../config';
export const EditTask = 'EditTask'



export const editTask = (id, title, description, status, priority, deadlineAt, callback) => async dispatch => {
    let tokens = await AsyncStorage.getItem('userData');
    let parsed = JSON.parse(tokens);
    if (parsed != null) {
        return API.then(api => api.put(`/tasks/${id}`,

            JSON.stringify({
                toTenantPerson: parsed.tenant.tenantPerson,
                title,
                description,
                status: status,
                priority: priority,
                deadlineAt: deadlineAt ? deadlineAt : "",
                willProgressAt: "",
                project: "",
                attachment: ""
            }),

        )).then(resp => {
            console.log(resp)
            if (resp.status == 200) {
                alert('Success')
                callback()
                return dispatch({
                    type: EditTask,
                    payload: 'Success'
                })
            }
            else {
                alert("Error")
            }
        }
        ).catch(e => { alert(e) })
    }
};
