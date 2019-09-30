import { CheckEmailType, LoginInType } from '../action/loginAction';

const initialState = {
    check: false
};

export default function loginReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CheckEmailType:
            return {
                ...state,
                check: payload
            };
        case LoginInType:
            return {
                ...state,
                login: Object.assign({},payload)
            };
        default:
            return state;
    }

};