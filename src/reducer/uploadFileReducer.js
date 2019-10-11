import { uploadFile } from '../action/uploadFileAction';

const initialState = {
    upload: {}
};

export default function uploadFileReducer(state = initialState, { type, payload }) {
    switch (type) {
        case uploadFile:
            return {
                ...state,
                upload: payload
            };
        default:
            return state;
    }

};