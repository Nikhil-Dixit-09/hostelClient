import * as api from '../api';
import Swal from 'sweetalert2'

export const getUser=(email)=>async(dispatch)=>{
    try{
        const {data}=await api.getUser(email);
        if(data.message==="session expired"){
            dispatch({type:'LOGOUT'});
        }else{
            dispatch({type:'SET_USER',data});
        }
        
        console.log(data);
    }catch(err){
        console.log(err);
    }
}
export const sendOtp=(email)=>async(dispatch)=>{
    try{
        const {data}=await api.sendOtp(email);
        if(data.message==="user don't exist"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });
        }else{
            Swal.fire(
                'Otp sent',
                'otp sent successfully!!',
                'success'
            );
            dispatch({type:'SET_OTP',payload:1});
        }
    }catch(err){
        console.log(err);
    }
}

export const verifyOtp=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.verifyOtp(formData);
        if(data.message==="invalid otp"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });   
        }else{
            Swal.fire(
                'Right otp',
                'otp verified successfully!!',
                'success'
            );
            dispatch({type:'SET_RIGHT',payload:1});
        }
    }catch(err){
        console.log(err);
    }
}

export const changePassword=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.changePassword(formData);
        if(data.message==="passwords don't match"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.message
              });   
        }else{
            Swal.fire(
                'Password changed',
                'Password changed successfully!!',
                'success'
            );
            dispatch({type:'UNSET_OTP',payload:0});
            dispatch({type:'UNSET_RIGHT',payload:0});
        }
    }catch(err){
        console.log(err);
    }
}
export const addComplaint=(formData)=>async(dispatch)=>{
    try{   
        console.log(formData); 
        const {data}=await api.addComplaint(formData);
        console.log(data);
        dispatch({type:'SET_RELOAD',payload:1});
        console.log('added');
    }catch(err){
        console.log(err);
    }
}
export const getComplaints=(email)=>async(dispatch)=>{
    try{
        const {data}=await api.getComplaints(email);
        console.log(data);
        dispatch({type:'SET_COMPLAINTS',payload:data.data});
        dispatch({type:'UNSET_RELOAD',payload:0});
    }catch(err){
        console.log(err);
    }
}
export const getComplaintsFilter=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.getComplaintsFilter(formData);
        dispatch({type:'SET_FILTER',payload:data.payload});
        console.log(data);
        dispatch({type:'UNSET_RELOAD',payload:0});
    }catch(err){
        console.log(err);
    }
}
export const deleteComplain=(complainId)=>async(dispatch)=>{
    try{
        const {data}=await api.deleteComplain(complainId);
        console.log(data.data);
        dispatch({type:'DELETE_COMPLAIN',payload:data.data});
    }catch(err){
        console.log(err);
    }
}
export const upgradeStatus=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.upgradeStatus(formData);
        dispatch({type:'UPDATE_COMPLAIN',payload:data.data});
    }catch(err){
        console.log(err);
    }
}
export const editComplaint=(formData)=>async(dispatch)=>{
    try{
        const {data}=await api.editComplaint(formData);
        dispatch({type:'UPDATE_COMPLAIN',payload:data.data});
    }catch(err){
        console.log(err);
    }
}