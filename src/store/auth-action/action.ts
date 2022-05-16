import {ACTIONS, ActionConfig} from './actionType';

export const loginAction = (actionName: string, payload?: any): ActionConfig => {
    return {
        type: ACTIONS.LOGIN,
        actionName,
        payload,
    };
}

export const logoutAction = (actionName: string, payload?: any): ActionConfig => {
    return {
        type: ACTIONS.LOGOUT,
        actionName,
        payload,
    };
}

export const signupAction = (actionName: string, payload?: any): ActionConfig => {
    return {
        type: ACTIONS.SIGNUP,
        actionName,
        payload,
    };
}