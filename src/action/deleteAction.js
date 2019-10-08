import API from '../../config';
export const DeleteTask = 'DeleteTask';


export const deleteTask = (id,callback) => async dispatch => {

    return API.then(api => api.delete(`/tasks/${id}`)).then(() => {
            callback()
            return dispatch({
                type: DeleteTask,
                payload: id
            })
        }
        ).catch(e => { alert(e) })
}
