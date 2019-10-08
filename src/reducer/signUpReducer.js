import { SignUpDataType } from '../action/signUpAction.js';

const initialState = {
    user: {}
};

export default function signUpReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SignUpDataType:
            return {
                ...state,
                user: payload
            };
        default:
            return state;
    }

};