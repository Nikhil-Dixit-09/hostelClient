

const authReducer=(state={authData:null},action)=>{
    switch(action.type){
        case 'AUTH':
            console.log(action);
            console.log(action.data.token);
        localStorage.setItem('profile',JSON.stringify({...action.data}));
        console.log('changed');
        return {...state,authData: action.data}
        case 'LOGOUT':
            localStorage.clear();
            return {...state,authData:null}
        default:
            return state
    }
}
export default authReducer;