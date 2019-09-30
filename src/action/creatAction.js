import { AsyncStorage } from 'react-native';
import API  from '../../config';
export const NewTask = 'NewTask';


export const newTask = (title, description, status, priority) => async dispatch => {
    let tokens = await AsyncStorage.getItem('userData');
    let parsed = JSON.parse(tokens);

    let data = JSON.stringify({
        toTenantPerson: parsed.tenant.tenantPerson,
        title,
        description,
        status: parseInt(status),
        priority: parseInt(priority),
        deadlineAt: "",
        willProgressAt: "",
        project: "",
        attachment: ""
    })
    
    if (parsed != null) {
        return API.then(api => api.post(`/tasks`, data
        )).then(resp => {
            if (resp.status == 201) {
                alert("Success")
                return dispatch({
                    type: NewTask,
                    payload: "Success"
                })
            }
            else {
                alert(JSON.stringify(resp.error))
            }
        }).catch(e => alert(e))


    }
}