import { ListTask } from '../action/listAction';

const initialState = {
    listTask: []
};

export default function listReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ListTask:
            return {
                ...state,
                listTask: payload
            };
        default:
            return state;
    }

};