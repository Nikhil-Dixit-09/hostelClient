import * as api from '../api';
import Swal from 'sweetalert2'


export const signin=(formData,navigate)=>async(dispatch)=>{
    try{
        const {data}=await api.signin(formData);
    
        if(data.message==="User does not exist"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else if(data.message==="Invalid Credentials"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else if(data.message==="Something went wrong"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else{
            Swal.fire(
                'Logged In',
                'Logged In successfully!!',
                'success'
              )
            dispatch({type:'AUTH',data});
            navigate('/');
        }
        
        
    }catch(error){
        console.log(error);
    }
}
export const signups=(formData,navigate)=>async(dispatch)=>{
    try{
        const {data}=await api.signup(formData);
        // const navigate=useNavigate();
        console.log(data.message);
        if(data.message==="User already exists"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else if(data.message==="Enter institute email ID"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else if(data.message==="Passwords don't match"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else if(data.message==="Something went wrong"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else{
            Swal.fire(
                'Signed Up',
                'Signed Up successfully!!',
                'success'
              );
            dispatch({type:'AUTH',data});
            navigate('/');
        }
        
        console.log(data);
    }catch(error){
        console.log(error);
    }

    
}
export const logout=(navigate)=>async(dispatch)=>{
    try{
        dispatch({type:'LOGOUT'});
        navigate('/auth');
        Swal.fire(
            'Logged Out',
            'Logged Out successfully!!',
            'success'
          )
    }catch(error){
        console.log(error);
    }
}
export const verify=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.verify(formData);
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
