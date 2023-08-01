const reducer=(state=0,action)=>{
    switch(action.type){
        case 'SET_OTP':
            console.log(action.payload);
            return action.payload;
        case 'UNSET_OTP':
            return 0;    
        default:
            return state;     
    }
}
export default reducer;