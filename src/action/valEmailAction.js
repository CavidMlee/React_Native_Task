export const ValidateEmail = 'ValidateEmail';
export const ValidateEmailError = 'ValidateEmailError';


export const validateEmail = (text) => dispatch => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   
    if (reg.test(text) === false) {
        let valEmail={
            text,
            checkEmail: false
        }
        return dispatch({
            type: ValidateEmail,
            payload: valEmail
        })
    }
    else {
        let valEmailErr={
            text,
            checkEmail: true
        }
        return dispatch({
            type: ValidateEmailError,
            payload: valEmailErr
        })
    }
    
    
};