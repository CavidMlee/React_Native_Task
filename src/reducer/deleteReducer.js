import { DeleteTask } from '../action/deleteAction';

const initialState = {
    deleteTask: ''
};

export default function deleteReducer(state = initialState, { type, payload }) {
    switch (type) {
        case DeleteTask:
            return {
                ...state,
                deleteTask: payload
            };
        default:
            return state;
    }

};