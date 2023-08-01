const reducer=(state=0,action)=>{
    switch(action.type){
        case 'SET_RELOAD':
            console.log(action.payload);
            return action.payload;
        case 'UNSET_RELOAD':
            return 0;    
        default:
            return state;     
    }
}
export default reducer;