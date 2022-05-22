export const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SIGNUP: "SIGNUP",
}

export interface ActionConfig {
    type: string;
    actionName: string;
    actionFn?: Function;
    payload?: any;
}