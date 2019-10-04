import { GetTask, EditTask } from '../action/editAction';

const initialState = {
    editTask:''
};

export default function editReducer(state = initialState, { type, payload }) {
    switch (type) {
        case EditTask:
            return {
                ...state,
                editTask: payload
            };
        default:
            return state;
    }

};