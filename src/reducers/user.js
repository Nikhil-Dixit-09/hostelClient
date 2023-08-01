const reducer=(state={},action)=>{
    switch(action.type){
        case 'SET_USER':
            console.log(action.data);
            return action.data;
        case 'LOG_OUT':
            return state;    
        default:
            return state;     
    }
}
export default reducer;