import { AsyncStorage } from 'react-native';
import API from '../../config';
export const DeleteTask = 'DeleteTask';


export const deleteTask = (id) => async dispatch => {
    let tokens = await AsyncStorage.getItem('userData');
    let parsed = JSON.parse(tokens);

    return API.then(api => api.delete(`/tasks/${id}`)).then(() => {
            alert(`${id} id-li task silindi`)
            return dispatch({
                type: DeleteTask,
                payload: `${id} id-li task silindi`
            })
        }
        ).catch(e => { alert(e) })
}
