import { AsyncStorage } from 'react-native';
import  API  from '../../config';
export const ListTask = 'ListTask';


export const listTask = (internet) => async dispatch => {
    if (internet) {
        return API.then(api => api.get(`/tasks`).then(list => {
                console.log(list)
                if (list.status == 200) {
                    AsyncStorage.setItem("taskList", JSON.stringify(list.data));
                }
                else {
                    alert(JSON.stringify(list.status))
                }
            }
            ).then(async () => {
                let tasks = await AsyncStorage.getItem('taskList');
                let parsed = JSON.parse(tasks);
                return dispatch({
                    type: ListTask,
                    payload: parsed
                })
            }).catch(e=>{e})
        )
    }
    else {
        let tasks = await AsyncStorage.getItem('taskList');
        let parsed = JSON.parse(tasks);
        return dispatch({
            type: ListTask,
            payload: parsed
        })
    }
}