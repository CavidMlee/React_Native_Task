import { TabsPage1,TabsPage2,TabsPage3,TabsPage4 } from '../action/tabsAction';

const initialState = {
    tabsPage1: [],
    tabsPage2: [],
    tabsPage3: [],
    tabsPage4: [],
};

export default function tabsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case TabsPage1:
            return {
                ...state,
                tabsPage1: payload
            };
            case TabsPage2:
            return {
                ...state,
                tabsPage2: payload
            };
            case TabsPage3:
            return {
                ...state,
                tabsPage3: payload
            };
            case TabsPage4:
            return {
                ...state,
                tabsPage4: payload
            };
        default:
            return state;
    }

};