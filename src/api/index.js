import axios from 'axios';
const API=axios.create({baseURL:'https://hostel-backend-sigma.vercel.app'});
API.interceptors.request.use((req)=>{
    // var tok=JSON.parse(localStorage.getItem('profile')).token;
    // console.log(tok);
    if(localStorage.getItem('profile')){
        req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});
export const signin=(formData)=>API.post(`/user/signin`,formData);
export const signup=(formData)=>API.post(`/user/signup`,formData);
export const verify=(formData)=>API.post('/user/verify',formData);
export const getUser=(email)=>API.get(`/user/getUser/${email}`);
export const sendOtp=(email)=>API.post('/user/sendOtp',email);
export const verifyOtp=(formData)=>API.post('/user/verifyOtp',formData);
export const changePassword=(formData)=>API.post('/user/changePassword',formData);
export const addComplaint=(formData)=>API.post('/user/addComplaint',formData,{ headers: {'Content-Type': 'multipart/form-data'}});
export const getComplaints=(email)=>API.get(`/user/getComplaints/${email}`);
export const getComplaintsFilter=(formData)=>API.post('/user/getComplaintsFilter',formData);
export const deleteComplain=(complainId)=>API.delete(`/user/deleteComplain/${complainId}`);
export const upgradeStatus=(formData)=>API.put(`/user/upgradeStatus`,formData);
export const editComplaint=(formData)=>API.put(`/user/editComplaint`,formData,{ headers: {'Content-Type': 'multipart/form-data'}});