import { ListDelayTask } from '../action/listDelayAction';

const initialState = {
    listDelayTask: []
};

export default function listDelayReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ListDelayTask:
            return {
                ...state,
                listDelayTask: payload
            };
        default:
            return state;
    }

};