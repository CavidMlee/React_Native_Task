import { AsyncStorage } from 'react-native';
import API from '../../config';
export const GetTask = 'GetTask';
export const EditTask = 'EditTask'


export const getTask = (id) => async dispatch => {
    let tokens = await AsyncStorage.getItem('userData');
    let parsed = JSON.parse(tokens);

    return fetch(`${API}/tasks/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-PROTOKEN': parsed.accessToken,
                'X-TENANT-ID': parsed.tenants === undefined ? JSON.stringify(parsed.tenant.id) : JSON.stringify(parsed.tenants[0].id)

            }
        }).then(resp => resp.json()).then(task => {
            if (task.error == null) {
                return dispatch({
                    type: GetTask,
                    payload: task
                })
            }
            else {
                alert(JSON.stringify(task.error))
            }
        }).catch(e => { alert(e) })
};


export const editTask = (id, title, description, status, priority) => async dispatch => {
    let tokens = await AsyncStorage.getItem('userData');
    let parsed = JSON.parse(tokens);
    if (parsed != null) {
        return API.then(api => api.put(`/tasks/${id}`,

            JSON.stringify({
                toTenantPerson: parsed.tenant.tenantPerson,
                title,
                description,
                status: parseInt(status),
                priority: parseInt(priority),
                deadlineAt: "",
                willProgressAt: "",
                project: "",
                attachment: ""
            }),

        )).then(resp => {
            console.log(resp)
            if (resp.status == 200) {
                alert('Success')
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
