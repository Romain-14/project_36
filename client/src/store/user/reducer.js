
const initialState = {
    isLogged: false,
    nickname: null,
    isAdmin: false,
}

function reducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return {
                isLogged: true,
                nickname: action.payload.nickname,
                isAdmin: action.payload.isAdmin,
            }
        case 'LOGOUT':
            return initialState;
        default:
            throw new Error('Action type not found');
    }
}

export {initialState, reducer}