import { SignInDataType } from '../action/signInAction.js';

const initialState = {
    user: {}
};

export default function signInReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SignInDataType:
            return {
                ...state,
                user: payload
            };
        default:
            return state;
    }

};