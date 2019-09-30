import { NewTask } from '../action/creatAction';

const initialState = {
    newTask: ''
};

export default function newTaskReducer(state = initialState, { type, payload }) {
    switch (type) {
        case NewTask:
            return {
                ...state,
                newTask: payload
            };
        default:
            return state;
    }

};