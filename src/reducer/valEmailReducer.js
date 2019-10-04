import { validateEmail, ValidateEmailError } from '../action/valEmailAction';

const initialState = {
    text: "",
    checkEmail: true
};

export default function signInReducer(state = initialState, { type, payload }) {
    console.log(payload)
    switch (type) {
        case validateEmail:
            return {
                ...state,
                text: payload.text,
                checkEmail: payload.checkEmail
            };
        case ValidateEmailError:
            return {
                ...state,
                text: payload.text,
                checkEmail: payload.checkEmail
            };
        default:
            return state;
    }

};