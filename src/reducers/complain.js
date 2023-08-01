
function compareStatus(a, b) {

    return a.status - b.status;
}
const authReducer=(state=[],action)=>{
    switch(action.type){
        case 'SET_COMPLAINTS':
            return action.payload;

        case 'SET_FILTER':
            return action.payload;
        case 'DELETE_COMPLAIN':
            console.log(action.payload);
            const earlier=[...state];
            for(let i=0;i<earlier.length;i++){
                console.log(earlier[i]);
                console.log(action.payload);
                console.log(earlier[i]._id===action.payload._id);
                if(earlier[i]._id===action.payload._id){
                    earlier.splice(i,1);
                    console.log('heyyyy');
                    break;
                }
            }
            console.log(earlier);
            return earlier;
        case 'UPDATE_COMPLAIN':
            let ind=-1;
            let objs=[...state];
            for(let i=0;i<objs.length;i++){
                if(objs[i]._id===action.payload._id){
                    ind=i;
                    break;
                }
            }
            return [...state.slice(0,ind),action.payload,...state.slice(ind+1)];
        default:
            return state
    }
}
export default authReducer;