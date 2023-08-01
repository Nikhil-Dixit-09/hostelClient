import React from 'react'
import './Otp.css'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useState } from 'react'
import { verifyOtp } from '../../actions/user'
import { useDispatch } from 'react-redux'
import { changePassword } from '../../actions/user'
const Otp = (props) => {
    const dispatch=useDispatch();
    const [formData, setForm] = useState({
        otp: -1,
        password: '',
        confirmPassword: '',
        email:props?.email
    });
    console.log(props?.email);
    const right = useSelector((state) => state.rightOtp);
    const handleMe = (e) => {
        e.preventDefault();
        
        console.log(formData);
        if(right===0){
            dispatch(verifyOtp(formData));
        }else{
            dispatch(changePassword(formData));
        }
        console.log(formData);
    }
    const handle=(e)=>{
        console.log(formData);
        setForm({...formData,otp:e.target.value});
    }
    return (
        <div className='otp'>
            <form onSubmit={handleMe} className='otpForm'>
                {
                    right === 0 &&
                    <div className='inp'>
                        <div className='text'>Enter OTP: </div>
                        <input className='input' required onChange={handle} type='number'></input>
                    </div>
                }
                {
                    right === 1 &&
                    <div className='inp'>
                        <div className='text'>Enter new password: </div>
                        <input className='input' required onChange={(e) => setForm({ ...formData, password: e.target.value })} type='password'></input>

                        <div className='text'>Confirm password: </div>
                        <input className='input' required onChange={(e) => setForm({ ...formData, confirmPassword: e.target.value })} type='password'></input>
                    </div>
                }
                {
                    right===0 &&
                    <div className='verifyOtp'>
                        <button type='submit' >Verify OTP</button>
                    </div>
                }
                {
                    right===1 &&
                    <div className='changePassword'>
                        <button type='submit' >Change password</button>
                    </div>
                }
                


            </form>
        </div>
    )
}

export default Otp
