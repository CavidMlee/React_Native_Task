//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import  API  from '../../config';
export const ListDelayTask = 'ListDelayTask';


export const listDelayTask = (internet) => async dispatch => {
    if (internet) {
        return API.then(api => api.get(`/tasks/delayed`).then(list => {
               console.log("List Delay ",list)
                if (list.status == 200) {
                    console.log("list Delay status 200")
                    AsyncStorage.setItem("taskDelayList", JSON.stringify(list.data));
                }
                else {
                    alert(JSON.stringify("Status ",list.status))
                }
            }
            ).then(async () => {
                let tasks = await AsyncStorage.getItem('taskDelayList');
                let parsed = JSON.parse(tasks);
                return dispatch({
                    type: ListDelayTask,
                    payload: parsed
                })
            }).catch(e=>{console.log("Error ",e),alert('error')})
        )
    }
    else {
        let tasks = await AsyncStorage.getItem('taskDelayList');
        let parsed = JSON.parse(tasks);
        return dispatch({
            type: ListDelayTask,
            payload: parsed
        })
    }
}