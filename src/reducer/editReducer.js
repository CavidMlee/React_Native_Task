import { GetTask, EditTask } from '../action/editAction';

const initialState = {
    getTask: {},
    editTask:''

};

export default function editReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GetTask:
            return {
                ...state,
                getTask: payload
            };
        case EditTask:
            return {
                ...state,
                editTask: payload
            };
        default:
            return state;
    }

};