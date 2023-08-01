import React, { useState } from 'react'
import './Complaint.css'
import { useDispatch } from 'react-redux';
import { addComplaint } from '../../actions/user';
import { useSelector } from 'react-redux';
import tick from '../../assets/icons8-tick-30.png'
const Complaint = () => {
    const dispatch=useDispatch();
    const [file,setFile]=useState();
    const [genre,setGenre]=useState('Carpentary');
    const [hostel,setHostel]=useState('BH-1');
    const [roomNumber,setRoom]=useState('');
    const [description,setDescription]=useState('');
    const [added,setAdded]=useState(false);
    const myUser = useSelector((state) => state.user);
    const formSubmit=(e)=>{
        e.preventDefault();
      
       
        const formData = new FormData();
        formData.append("image", file);
        formData.append("description", description);
        formData.append("genre", genre);
        formData.append("hostel",hostel);
        formData.append("roomNumber", roomNumber);
        console.log(formData);
        
        for(var pair of formData.entries()) {
            console.log(pair[0]+', '+pair[1]);
          }
        dispatch(addComplaint(formData));
        setAdded(true);
    }
    console.log(myUser);
  return (
    <div>
      <form className='complain_form' onSubmit={formSubmit}>
        <div className='complain_genre'>
            Work related to:
            <select className='complain_select' value={genre} onChange={(e)=>setGenre(e.target.value)}>
                <option value="Carpentary" className='complain_option'>Carpentary</option>
                <option value="Electricity"className='complain_option'>Electricity</option>
                <option value="Cleaning"className='complain_option'>Cleaning</option>
                <option value="Miscellaneous"className='complain_option'>Miscellaneous</option>
            </select>
        </div>

        <div className='complain_hostel'>
            Hostel:
            <select className='complain_select' value={hostel} onChange={(e)=>setHostel(e.target.value)}>
                <option value="BH-1" className='complain_option'>BH-1</option>
                <option value="BH-2" className='complain_option'>BH-2</option>
                <option value="BH-3" className='complain_option'>BH-3</option>
                <option value="GH-1" className='complain_option'>GH-1</option>
            </select>
        </div>

        <div className='complain_roomNumber'>
            Room Number:
            <input className='complain_input' type='text'  onChange={(e)=>setRoom(e.target.value)}></input>
        </div>

        <div className='complain_description'>
            Description:
            <textarea id="w3review" rows="4" cols="50" onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        <div className='complain_image'>
            Image:
            <input className='complain_photo' type='file' filename={file} accept="image/*" onChange={(e)=>setFile(e.target.files[0])}></input>
        </div>
        <button className='complain_submit' type='submit'>Add Complain</button>
        {
          added===true &&
          <div className='tick'>
            Added: 
            <img src={tick} alt="" />
          </div>
        }
      </form>
    </div>
  )
}

export default Complaint
