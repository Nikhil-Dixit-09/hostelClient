import React from 'react'
import { useState } from 'react'
import './Auth.css'

import { useDispatch } from 'react-redux'
import { signin } from '../../actions/auth'
import { signups } from '../../actions/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendOtp } from '../../actions/user'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Swal from 'sweetalert2'
import Otp from '../Otp/Otp'
import { useLocation } from 'react-router-dom'
const Auth = () => {
  const [signup,setSignup] = useState(true);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location=useLocation();
  const [formData,setForm]=useState({
    name:'',
    rollNumber:'',
    email:'',
    password:'',
    confirmPassword:'',
    isStudent:false
  });
  useEffect(()=>{
    const user=localStorage.getItem("profile");
    if(user===null){
      dispatch({type:'UNSET_OTP',payload:0});
      dispatch({type:'UNSET_RIGHT',payload:0});
    }
  },[])
  const [forgot,setForgot]=useState(0);
  const otp = useSelector((state) => state.otp);

  console.log(otp);
  const handle=(e)=>{
    if(formData.isStudent===false){
      setForm({...formData,isStudent:true});
    }else{
      setForm({...formData,isStudent:false});
    }
  }
 
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);
    
    if(signup){
      dispatch(signups(formData,navigate));
    }else{
      dispatch(signin(formData,navigate));
    }
  }
  const handleClick=()=>{
    if(signup){
      setSignup(false);
      setForgot(1);
    }else{
      setSignup(true);
      setForgot(0);
    }
  }
  
  const user=localStorage.getItem("profile");
  
  const handleForgot=()=>{
    let str=formData.email.slice(-12);
    if(formData.email===''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter the email'
      });
    }else if(str!=='@iiitm.ac.in'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please enter the institute email'
      });
    }else{
      let obj={};
      obj.email=formData.email;
      dispatch(sendOtp(obj));
      
    }
  }
  useEffect(()=>{
    if(user!==null){
      navigate('/');
    }
  },[user]);
  return (
    <div>
      { otp===0 &&
        <div className='forms'>
          <form onSubmit={handleSubmit} className='myForm'>
            {
              signup &&
              <div className='cnt'>
                <div className='inp'>
                  Enter your name:
                  <input className='input' type='text' required onChange={(e)=>setForm({...formData,name:e.target.value})}></input>
                </div>

                <div className='inp'>
                  Enter your Roll Number:
                  <input className='input' type='text' required onChange={(e)=>setForm({...formData,rollNumber:e.target.value})}></input>
                </div>
                <div className='inp checkbox'>
                  <div>Are you a student?:</div>
                  <div><input className='input' type='checkbox'onChange={handle} ></input></div>
                  
                </div>
              </div>
            }


            <div className='inp'>
              Enter email:
              <input type='email' className='input' required onChange={(e)=>setForm({...formData,email:e.target.value})}></input>
            </div>

            {
              otp!==1 &&
              <div className='inp'>
              Enter password:
              <input type='password'className='input' required onChange={(e)=>setForm({...formData,password:e.target.value})}></input>
            </div>
            }
            
            {
              forgot===1 &&
              <div className='forgot-password' onClick={handleForgot}>
                forgot password
              </div>
            }
            
            {
              signup &&
              <div className='inp'>
                Confirm Password:
                <input type='password' className='input' required onChange={(e)=>setForm({...formData,confirmPassword:e.target.value})}></input>
              </div>
            }
            {
              signup &&
              <div className='signup'>
                <button className='buttons' type='submit'>SignUp</button>
                <button className='buttons' onClick={handleClick}>Already have an account?</button>
              </div>
            }
            
            {
              !signup &&
              <div className='signin'>
                <button className='buttons' type='submit'>SignIn</button>
                <button className='buttons' onClick={handleClick}>Don't have an account?</button>
              </div>
            }
          </form>
        </div>
      }
      {
        otp===1 &&
        <Otp email={formData?.email}/>
      }
    </div>
  )
}

export default Auth
