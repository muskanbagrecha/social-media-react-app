import {ACTIONS} from "./actionType";

interface ActionConfig {
    type: string;
    payload?: any;
}

interface User {
    uid: string;
    username: string;
    email: string;
    displayPictureURL: string;
    bio: string;
    backgroundImageURL: string;
    portfolioURL: string;
    followers: number;
    following: number;
    posts: number;
}

const reducer = (state: User | null = null, action: ActionConfig) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                user: action.payload,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
            };
        case ACTIONS.SIGNUP:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
}